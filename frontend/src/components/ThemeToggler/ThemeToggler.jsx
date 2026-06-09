import { useEffect, useState } from 'react';
import s from './ThemeToggler.module.css';

const ThemeToggler = () => {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      type='button'
      className={`${s.track} ${dark ? s.dark : ''}`}
      onClick={() => setDark((v) => !v)}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className={s.knob} />
    </button>
  );
};
export default ThemeToggler;
