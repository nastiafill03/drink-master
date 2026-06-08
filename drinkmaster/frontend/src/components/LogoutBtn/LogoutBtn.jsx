import { useState } from 'react';
import LogoutModal from '../LogoutModal/LogoutModal';
import s from './LogoutBtn.module.css';

const LogoutBtn = ({ onClick, className }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type='button'
        className={className ?? s.btn}
        onClick={() => setShowModal(true)}
      >
        Log out
      </button>
      {showModal && (
        <LogoutModal onClose={() => { setShowModal(false); onClick?.(); }} />
      )}
    </>
  );
};
export default LogoutBtn;
