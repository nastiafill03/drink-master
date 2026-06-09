import blueCocktail from '../../assets/blue-cocktail.png';
import s from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <div className={s.page}>
    <div className={s.hero}>
      <span className={s.digit}>4</span>
      <img src={blueCocktail} alt='' className={s.img} />
      <span className={s.digit}>4</span>
    </div>
  </div>
);
export default NotFoundPage;
