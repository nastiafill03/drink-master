import LogoutBtn from '../LogoutBtn/LogoutBtn';
import editIcon from '../../assets/edit-icon.svg';
import s from './UserLogoPopup.module.css';

const UserLogoPopup = ({ onClose, onEditProfile }) => (
  <div className={s.popup}>
    <button type='button' className={s.editRow} onClick={onEditProfile}>
      <span className={s.editLabel}>Edit profile</span>
      <img src={editIcon} alt='' width={14} height={14} />
    </button>
    <LogoutBtn className={s.logoutBtn} onClick={onClose} />
  </div>
);
export default UserLogoPopup;
