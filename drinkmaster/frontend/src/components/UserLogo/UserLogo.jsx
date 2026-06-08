import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/authSlice';
import UserLogoPopup from '../UserLogoPopup/UserLogoPopup';
import UserInfoModal from '../UserInfoModal/UserInfoModal';
import userIcon from '../../assets/user-icon.png';
import s from './UserLogo.module.css';

const UserLogo = () => {
  const user = useSelector(selectUser);
  const [showPopup, setShowPopup] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className={s.wrap}>
      <button
        type='button'
        className={s.btn}
        onClick={() => setShowPopup((v) => !v)}
        aria-label='User menu'
      >
        <img
          src={user.avatarURL || userIcon}
          alt='avatar'
          className={s.avatar}
        />
        <span className={s.name}>{user.name ?? 'User'}</span>
      </button>

      {showPopup && (
        <UserLogoPopup
          onClose={() => setShowPopup(false)}
          onEditProfile={() => { setShowPopup(false); setShowEdit(true); }}
        />
      )}

      {showEdit && <UserInfoModal onClose={() => setShowEdit(false)} />}
    </div>
  );
};
export default UserLogo;
