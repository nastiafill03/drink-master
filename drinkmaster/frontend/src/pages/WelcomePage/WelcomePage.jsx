import welcomeBg from '../../assets/welcome-bcg.jpg';
import Ellips1 from '../../assets/Ellipse1.png';
import Ellips2 from '../../assets/Ellips2.png';
import AuthNav from '../../components/AuthNav/AuthNav';
import s from './WelcomePage.module.css';

const WelcomePage = () => (
  <div className={s.page}>
    <div className={s.content}>
      <div className={s.text}>
        <h1 className={s.title}>Welcome to the app!</h1>
        <p className={s.description}>
          This app offers more than just a collection of recipes - it is designed to be your very own digital cookbook. You can easily save and retrieve your own recipes at any time.
        </p>
      </div>
      <AuthNav variant='welcome' />
    </div>
    <div className={s.hero}>
      <img src={welcomeBg} alt='Welcome' className={s.image} />
      <img src={Ellips1} alt='' className={s.ellipse1} aria-hidden='true' />
    </div>
    <img src={Ellips2} alt='' className={s.ellipse2} aria-hidden='true' />
  </div>
);
export default WelcomePage;
