import PreviewDrinks from '../../components/PreviewDrinks/PreviewDrinks';
import HomeBlock from '../../components/HomeBlock/HomeBlock';
import s from './HomePage.module.css';

const HomePage = () => (
  <div className={s.page}>
    <HomeBlock />
    <PreviewDrinks />
  </div>
);
export default HomePage;
