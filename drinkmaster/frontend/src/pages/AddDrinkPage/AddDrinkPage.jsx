import { useNavigate } from 'react-router-dom';
import PageTitle from '../../components/PageTitle/PageTitle';
import AddDrink from '../../components/AddDrink/AddDrink';
import FollowUs from '../../components/FollowUs/FollowUs';
import PopularDrinks from '../../components/PopularDrinks/PopularDrinks';
import s from './AddDrinkPage.module.css';

const AddDrinkPage = () => {
  const navigate = useNavigate();

  return (
    <div className={s.page}>
      <PageTitle>Add drink</PageTitle>
      <div className={s.layout}>
        <main className={s.main}>
          <AddDrink onSuccess={() => navigate('/my')} />
        </main>
        <aside className={s.sidebar}>
          <FollowUs />
          <PopularDrinks />
        </aside>
      </div>
    </div>
  );
};
export default AddDrinkPage;
