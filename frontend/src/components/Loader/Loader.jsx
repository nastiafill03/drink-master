import s from './Loader.module.css';

const Loader = () => (
  <div className={s.overlay}>
    <div className={s.spinner} />
  </div>
);
export default Loader;
