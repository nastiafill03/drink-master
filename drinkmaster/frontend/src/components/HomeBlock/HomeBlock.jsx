import { Link } from 'react-router-dom';
import BlueCocktail from '../../assets/blue-cocktail.png';
import s from './HomeBlock.module.css';

const HomeBlock = () => (
  <div className={s.content}>
    <div className={s.textBlock}>
      <h1 className={s.title}>Craft Your Perfect Drink with Drink Master</h1>
      <p className={s.text}>
        Unlock your inner mixologist with Drink Master, your one-stop destination for exploring, crafting, and mastering the world's finest beverages.
      </p>
      <Link to='/add' className={s.btn}>Add drink</Link>
    </div>
    <div className={s.images}>
      <img src={BlueCocktail} alt='' className={s.blueCocktail} />
    </div>
  </div>
);
export default HomeBlock;
