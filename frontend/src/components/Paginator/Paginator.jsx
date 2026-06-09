import s from './Paginator.module.css';

const WINDOW = 8;

const Paginator = ({ page, totalPages, onPage }) => {
  if (totalPages <= 1) return null;

  let start = Math.max(1, page - Math.floor(WINDOW / 2));
  let end = start + WINDOW - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - WINDOW + 1);
  }
  const visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <nav className={s.nav} aria-label='Pagination'>
      <button
        className={s.arrow}
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        aria-label='Previous page'
      >
        ‹
      </button>

      {visiblePages.map((p) => (
        <button
          key={p}
          className={`${s.btn} ${p === page ? s.active : ''}`}
          onClick={() => onPage(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      <button
        className={s.arrow}
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        aria-label='Next page'
      >
        ›
      </button>
    </nav>
  );
};
export default Paginator;
