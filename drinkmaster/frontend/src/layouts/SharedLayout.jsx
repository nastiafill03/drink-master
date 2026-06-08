import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { differenceInDays } from 'date-fns';
import { selectUser, selectIsLoggedIn } from '../redux/auth/authSlice';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import MotivatingModal from '../components/MotivatingModal/MotivatingModal';
import Blur1 from '../assets/blur-blue1.png';
import Blur2 from '../assets/blur-blue2.png';
import Blur3 from '../assets/green-blur.png';
import s from './SharedLayout.module.css';

const VISIT_MILESTONE = 100;

const SharedLayout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  const [is100DaysShown, setIs100DaysShown] = useState(() =>
    localStorage.getItem('drinkmaster_100days_shown') === '1'
  );

  const [isVisitShown, setIsVisitShown] = useState(() => {
    if (!isLoggedIn) return true;
    const visits = Number(localStorage.getItem('drinkmaster_visits') ?? 0) + 1;
    localStorage.setItem('drinkmaster_visits', String(visits));
    const alreadyShown = localStorage.getItem('drinkmaster_visit_modal_shown') === '1';
    if (visits >= VISIT_MILESTONE && !alreadyShown) {
      localStorage.setItem('drinkmaster_visit_modal_shown', '1');
      return false;
    }
    return true;
  });

  const createdAt = user?.createdAt ?? localStorage.getItem('drinkmaster_signup_date');
  const show100Days = Boolean(
    isLoggedIn && createdAt && !is100DaysShown &&
    differenceInDays(new Date(), new Date(createdAt)) >= 100
  );

  const activeModal = !isVisitShown ? 4 : show100Days ? 3 : null;

  const closeModal = () => {
    if (!isVisitShown) { setIsVisitShown(true); return; }
    localStorage.setItem('drinkmaster_100days_shown', '1');
    setIs100DaysShown(true);
  };

  return (
    <div className={s.layout}>
      <img src={Blur1} alt='' className={s.blur1} aria-hidden='true' />
      <img src={Blur2} alt='' className={s.blur2} aria-hidden='true' />
      <img src={Blur3} alt='' className={s.blur3} aria-hidden='true' />
      <Header />
      <main className={s.main}>
        <Outlet />
      </main>
      <Footer />
      {activeModal && <MotivatingModal type={activeModal} onClose={closeModal} />}
    </div>
  );
};
export default SharedLayout;
