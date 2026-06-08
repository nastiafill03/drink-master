import PageTitle from '../../components/PageTitle/PageTitle';
import Drinks from '../../components/Drinks/Drinks';
import s from './DrinksPage.module.css';

const DrinksPage = () => (
  <div className={s.page}>
    <PageTitle>Drinks</PageTitle>
    <Drinks />
  </div>
);
export default DrinksPage;
