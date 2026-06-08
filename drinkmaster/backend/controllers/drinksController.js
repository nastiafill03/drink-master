const Drink = require('../models/drinkModel');
const Ingredient = require('../models/ingredients');
const HttpError = require('../helpers/HttpError');

const isAdult = (birthDate) => {
  if (!birthDate) return true;
  const birth = new Date(birthDate);
  const ageMs = Date.now() - birth.getTime();
  return ageMs / (1000 * 60 * 60 * 24 * 365.25) >= 18;
};

const normalizeTitle = (title = '') => title.trim().toLowerCase();

const getIngredientsByTitle = async (ingredients = []) => {
  const titles = [...new Set(ingredients.map((item) => item.title).filter(Boolean))];
  if (!titles.length) return new Map();

  const docs = await Ingredient
    .find({ title: { $in: titles } }, 'title ingredientThumb')
    .collation({ locale: 'en', strength: 2 });
  return docs.reduce((acc, ingredient) => {
    acc.set(normalizeTitle(ingredient.title), ingredient);
    return acc;
  }, new Map());
};

const attachIngredientIds = async (ingredients = []) => {
  const ingredientsByTitle = await getIngredientsByTitle(ingredients);

  return ingredients.map((item) => {
    const ingredient = ingredientsByTitle.get(normalizeTitle(item.title));
    return {
      ...item,
      ingredientId: item.ingredientId ?? ingredient?._id ?? null,
    };
  });
};

const attachIngredientThumbs = async (ingredients = []) => {
  const ingredientsByTitle = await getIngredientsByTitle(ingredients);

  return ingredients.map((item) => {
    if (item.ingredientId?.ingredientThumb) return item;

    const ingredient = ingredientsByTitle.get(normalizeTitle(item.title));
    return {
      ...item,
      ingredientId: ingredient ?? item.ingredientId ?? null,
    };
  });
};

// GET /drinks/mainpage ─────────────────────────────────
const getMainPage = async (req, res, next) => {
  try {
    const adult = isAdult(req.user.birthDate);
    const alcoholFilter = adult ? {} : { alcoholic: 'Non alcoholic' };
    const categories = ['Ordinary Drink', 'Cocktail', 'Shake', 'Other/Unknown'];

    const result = await Promise.all(
      categories.map(async (category) => {
        const drinks = await Drink
          .find({ category, ...alcoholFilter })
          .sort({ createdAt: -1 })
          .limit(4);
        return { category, drinks };
      })
    );
    res.status(200).json(result);
  } catch (err) { next(err); }
};

// GET /drinks/popular ─────────────────────────────────
const getPopular = async (req, res, next) => {
  try {
    const adult = isAdult(req.user.birthDate);
    const matchFilter = adult ? {} : { alcoholic: 'Non alcoholic' };
    const drinks = await Drink.aggregate([
      { $match: matchFilter },
      { $addFields: { usersCount: { $size: '$users' } } },
      { $sort: { usersCount: -1 } },
      { $limit: 4 },
    ]);
    res.status(200).json(drinks);
  } catch (err) { next(err); }
};

// GET /drinks/search ──────────────────────────────────
const search = async (req, res, next) => {
  try {
    const { keyword, category, ingredient, page = 1, limit = 9 } = req.query;
    const adult = isAdult(req.user.birthDate);

    const filter = {};
    if (!adult) filter.alcoholic = 'Non alcoholic';
    if (category) filter.category = category;
    if (keyword) filter.drink = { $regex: keyword, $options: 'i' };
    if (ingredient) filter['ingredients.title'] = { $regex: ingredient, $options: 'i' };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Drink.countDocuments(filter);
    const drinks = await Drink.find(filter).skip(skip).limit(Number(limit));

    res.status(200).json({
      drinks,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) { next(err); }
};

// GET /drinks/:drinkId ─────────────────────────────────
const getById = async (req, res, next) => {
  try {
    const drink = await Drink.findById(req.params.drinkId)
      .populate('ingredients.ingredientId', 'title ingredientThumb')
      .lean();
    if (!drink) throw HttpError(404, 'Drink not found');
    if (!isAdult(req.user.birthDate) && drink.alcoholic !== 'Non alcoholic') {
      throw HttpError(403, 'Users under 18 can only view non-alcoholic drinks');
    }
    drink.ingredients = await attachIngredientThumbs(drink.ingredients);
    res.status(200).json(drink);
  } catch (err) { next(err); }
};

// GET /drinks/own ──────────────────────────────────────
const getOwn = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 9 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const total = await Drink.countDocuments({ owner: _id });
    const drinks = await Drink.find({ owner: _id }).skip(skip).limit(Number(limit));
    res.status(200).json({ drinks, total, totalPages: Math.ceil(total / Number(limit)) });
  } catch (err) { next(err); }
};

// POST /drinks/own/add ─────────────────────────────────
const addOwn = async (req, res, next) => {
  try {
    const { _id, birthDate } = req.user;
    const adult = isAdult(birthDate);

    if (!adult && req.body.alcoholic === 'Alcoholic') {
      throw HttpError(403, 'Users under 18 can only add non-alcoholic drinks');
    }

    const drinkThumb = req.file ? req.file.path : null;
    const ingredients = await attachIngredientIds(req.body.ingredients);
    const drink = await Drink.create({
      ...req.body,
      ingredients,
      drinkThumb,
      owner: _id,
    });
    res.status(201).json(drink);
  } catch (err) { next(err); }
};

// DELETE /drinks/own/remove ───────────────────────────
const removeOwn = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { drinkId } = req.body;
    const drink = await Drink.findOneAndDelete({ _id: drinkId, owner: _id });
    if (!drink) throw HttpError(404, 'Drink not found or not yours');
    res.status(200).json({ message: 'Drink deleted' });
  } catch (err) { next(err); }
};

// GET /drinks/favorite ────────────────────────────────
const getFavorite = async (req, res, next) => {
  try {
    const { _id, birthDate } = req.user;
    const adult = isAdult(birthDate);
    const { page = 1, limit = 9 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const filter = adult ? { users: _id } : { users: _id, alcoholic: 'Non alcoholic' };
    const total = await Drink.countDocuments(filter);
    const drinks = await Drink.find(filter).skip(skip).limit(Number(limit));
    res.status(200).json({ drinks, total, totalPages: Math.ceil(total / Number(limit)) });
  } catch (err) { next(err); }
};

// POST /drinks/favorite/add ───────────────────────────
const addFavorite = async (req, res, next) => {
  try {
    const { drinkId } = req.body;
    const { _id, birthDate } = req.user;
    const drinkToAdd = await Drink.findById(drinkId);
    if (!drinkToAdd) throw HttpError(404, 'Drink not found');
    if (!isAdult(birthDate) && drinkToAdd.alcoholic !== 'Non alcoholic') {
      throw HttpError(403, 'Users under 18 can only add non-alcoholic drinks to favorites');
    }

    const drink = await Drink.findByIdAndUpdate(
      drinkId,
      { $addToSet: { users: _id } },
      { new: true }
    );
    const favoritesCount = await Drink.countDocuments({ users: _id });
    res.status(200).json({ drink, favoritesCount });
  } catch (err) { next(err); }
};

// DELETE /drinks/favorite/remove ──────────────────────
const removeFavorite = async (req, res, next) => {
  try {
    const { drinkId } = req.body;
    const { _id } = req.user;
    const drink = await Drink.findByIdAndUpdate(
      drinkId,
      { $pull: { users: _id } },
      { new: true }
    );
    if (!drink) throw HttpError(404, 'Drink not found');
    res.status(200).json(drink);
  } catch (err) { next(err); }
};

module.exports = {
  getMainPage, getPopular, search, getById,
  getOwn, addOwn, removeOwn,
  getFavorite, addFavorite, removeFavorite,
};
