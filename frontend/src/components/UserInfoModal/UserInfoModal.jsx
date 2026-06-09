import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/authSlice';
import * as api from '../../services/api';
import { refreshUserThunk } from '../../redux/auth/authOperations';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subYears } from 'date-fns';
import userIcon from '../../assets/user-icon.png';
import editIcon from '../../assets/edit-icon.svg';
import closeIcon from '../../assets/close-icon.svg';
import calendarIcon from '../../assets/calendar-icon.svg';
import blurEdit from '../../assets/blur-edit.png';
import blurEdit1 from '../../assets/blur-edit1.png';
import s from './UserInfoModal.module.css';

const UserInfoModal = ({ onClose }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const fileRef = useRef();
  const nameRef = useRef();
  const [name, setName] = useState(user.name ?? '');
  const [preview, setPreview] = useState(user.avatarURL ?? null);
  const [file, setFile] = useState(null);
  const [birthDate, setBirthDate] = useState(user.birthDate ? new Date(user.birthDate) : null);
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', name);
    if (file) fd.append('avatar', file);
    if (birthDate) fd.append('birthDate', birthDate.toISOString());
    try {
      await api.updateUser(fd);
      dispatch(refreshUserThunk());
      toast.success('Profile updated!');
      onClose();
    } catch {
      toast.error('Failed to update profile');
    }
  };

  return createPortal(
    <div className={s.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={s.modal}>
        <button className={s.close} onClick={onClose} aria-label='Close'>
          <img src={closeIcon} alt='close' width={24} height={24} />
        </button>

        <img src={blurEdit} alt='' className={s.blurTL} aria-hidden='true' />
        <img src={blurEdit1} alt='' className={s.blurBR} aria-hidden='true' />

        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.avatarWrap} onClick={() => fileRef.current.click()}>
            <img src={preview || userIcon} alt='avatar' className={s.avatar} />
            <div className={s.addBtn}>+</div>
          </div>
          <input ref={fileRef} type='file' accept='image/*' hidden onChange={handleFile} />

          <div className={s.nameField}>
            <input
              ref={nameRef}
              className={s.nameInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Your name'
            />
            <button
              type='button'
              className={s.editBtn}
              onClick={() => nameRef.current.focus()}
              aria-label='Edit name'
            >
            </button>
            <img src={editIcon} alt='' width={20} height={20} />
          </div>

          <div className={s.dateField}>
            <DatePicker
              ref={datePickerRef}
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              placeholderText='Date of birth'
              className={s.nameInput}
              dateFormat='dd/MM/yyyy'
              maxDate={new Date()}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={80}
              openToDate={subYears(new Date(), 18)}
            />
            <button
              type='button'
              className={s.editBtn}
              onClick={() => datePickerRef.current?.setOpen(true)}
              aria-label='Open calendar'
            >
              <img src={calendarIcon} alt='' width={20} height={20} />
            </button>
          </div>

          <button type='submit' className={s.saveBtn}>Save changes</button>
        </form>
      </div>
    </div>,
    document.body
  );
};
export default UserInfoModal;
