import { useState } from 'react';
import * as api from '../../services/api';
import toast from 'react-hot-toast';
import s from './SubscribeForm.module.css';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await api.subscribe({ email });
      toast.success('Subscribed successfully!');
      setEmail('');
    } catch {
      toast.error('Subscription failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <p className={s.text}>Subscribe up to our newsletter. Be in touch with latest news and special offers, etc.</p>
        <input
          className={s.input}
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type='submit' className={s.btn} disabled={!email.trim()}>
          Subscribe
        </button>
    </form>
  );
};
export default SubscribeForm;
