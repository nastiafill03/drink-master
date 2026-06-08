import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/authSlice';
import * as api from '../../services/api';
import { refreshUserThunk } from '../../redux/auth/authOperations';
import toast from 'react-hot-toast';
import userIcon from '../../assets/user-icon.png';
import editIcon from '../../assets/edit-icon.svg';
import closeIcon from '../../assets/close-icon.svg';
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
    try {
      await api.updateUser(fd);
      await dispatch(refreshUserThunk());
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

          <button type='submit' className={s.saveBtn}>Save changes</button>
        </form>
      </div>
    </div>,
    document.body
  );
};
export default UserInfoModal;
