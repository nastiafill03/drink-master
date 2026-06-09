import s from './PageTitle.module.css';

const PageTitle = ({ children }) => (
  <h1 className={s.title}>{children}</h1>
);
export default PageTitle;
