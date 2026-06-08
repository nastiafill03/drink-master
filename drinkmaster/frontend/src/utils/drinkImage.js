import noPhoto from '../assets/no-photo.png';

export const getDrinkImage = (src) => src || noPhoto;

export const handleDrinkImageError = (event) => {
  event.currentTarget.src = noPhoto;
};
