import { useState, useEffect } from 'react';
import s from './FollowUs.module.css';
import FacebookLight from '../../assets/facebook-icon.svg';
import InstagramLight from '../../assets/inst-icon.svg';
import YouTubeLight from '../../assets/youtube-icon.svg';
import FacebookDark from '../../assets/facebook-icon-dark.svg';
import InstagramDark from '../../assets/inst-icon-dark.svg';
import YouTubeDark from '../../assets/youtube-icon-dark.svg';

const lightSocials = [
  { label: 'Facebook', icon: FacebookLight, href: 'https://www.facebook.com/' },
  { label: 'Instagram', icon: InstagramLight, href: 'https://www.instagram.com/' },
  { label: 'YouTube', icon: YouTubeLight, href: 'https://www.youtube.com/' },
];

const darkSocials = [
  { label: 'Facebook', icon: FacebookDark, href: 'https://www.facebook.com/' },
  { label: 'Instagram', icon: InstagramDark, href: 'https://www.instagram.com/' },
  { label: 'YouTube', icon: YouTubeDark, href: 'https://www.youtube.com/' },
];

const FollowUs = ({ alwaysLight = false }) => {
  const [isDark, setIsDark] = useState(
    () => document.body.getAttribute('data-theme') === 'dark'
  );

  useEffect(() => {
    if (alwaysLight) return;
    const observer = new MutationObserver(() => {
      setIsDark(document.body.getAttribute('data-theme') === 'dark');
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [alwaysLight]);

  const socials = alwaysLight || isDark ? lightSocials : darkSocials;

  return (
    <div className={s.wrap}>
      <div className={s.links}>
        {socials.map(({ label, icon, href }) => (
          <a key={label} href={href} className={s.link} aria-label={label} target='_blank' rel='noreferrer'>
            <img src={icon} alt={label} className={s.icon} />
          </a>
        ))}
      </div>
    </div>
  );
};
export default FollowUs;
