import motivation1 from '../../assets/motivation1.jpg';
import motivation2 from '../../assets/motivation2.jpg';
import motivation3 from '../../assets/motivation3.jpg';
import motivationBlur from '../../assets/motivation-blur.png';
import s from './MotivatingModal.module.css';

const configs = {
  1: { bg: motivation1, text: 'Wow! You have added the first recipe to your favorites!' },
  2: { bg: motivation2, text: 'Wow! You have added 10 recipes to your favorites!' },
  3: { bg: motivation3, text: 'Wow! You have been using the application for 100 days!' },
  4: { bg: motivation2, text: 'Wow! You have visited DrinkMaster 100 times. You are a true cocktail lover!' },
};

const MotivatingModal = ({ onClose, type = 1 }) => {
  const { bg, text } = configs[type] ?? configs[1];

  return (
    <div className={s.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={s.card}>
        <img src={bg} alt='' className={s.bg} />
        <div className={s.blurWrap}>
          <img src={motivationBlur} alt='' className={s.blurImg} />
          <div className={s.blurContent}>
            <p className={s.text}>{text}</p>
            <button type='button' className={s.closeBtn} onClick={onClose} aria-label='Close'>
              <span className={s.closeIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MotivatingModal;
