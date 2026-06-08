import { useState, useRef, useEffect } from 'react';
import s from './CustomSelect.module.css';

const CustomSelect = ({ value, onChange, options, placeholder, variant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  const isUnderline = variant === 'underline';
  const isField = variant === 'field';

  return (
    <div className={s.wrap} ref={ref}>
      <button
        type='button'
        className={`${s.trigger} ${isUnderline ? s.triggerUnderline : ''} ${isField ? s.triggerField : ''} ${isOpen ? s.triggerOpen : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={isUnderline ? (selected ? s.underlineLabel : s.underlinePlaceholder) : (selected ? s.label : s.placeholder)}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={`${s.arrow} ${isUnderline ? s.arrowUnderline : ''} ${isOpen ? s.arrowOpen : ''}`} />
      </button>

      {isOpen && (
        <ul className={s.dropdown}>
          <li
            className={`${s.option} ${!value ? s.active : ''}`}
            onClick={() => handleSelect('')}
          >
            {placeholder}
          </li>
          {options.map((o) => (
            <li
              key={o.value}
              className={`${s.option} ${o.value === value ? s.active : ''}`}
              onClick={() => handleSelect(o.value)}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CustomSelect;
