import s from './PrivacyPolicyPage.module.css';

const PrivacyPolicyPage = () => (
  <div className={s.page}>
    <h1 className={s.title}>Privacy Policy</h1>
    <p className={s.desc}>Your privacy is important to us. This section outlines how we collect, use, process, and protect your personal data. This Privacy Policy applies to the use of our website, applications, and services, so please take a moment to read it.
</p>

    <section className={s.section}>
      <h2 className={s.heading}>What personal data do we collect:</h2>
      <p className={s.text}>
        We may collect various types of personal data that you voluntarily provide when interacting with our website, registering an account or filling out forms. This may include your name, email address, phone number and more.
      </p>
    </section>

    <section className={s.section}>
      <h2 className={s.heading}>How we use your personal data:</h2>
      <p className={s.text}>
        We use the collected personal data to provide services, manage your account, provide you with information about our products and services, and to communicate with you regarding inquiries and updates.
      </p>
    </section>

    <section className={s.section}>
      <h2 className={s.heading}>Protection of personal data:</h2>
      <p className={s.text}>
        We take every effort to protect your information and use modern technologies to prevent unauthorized access, loss, or disclosure of your personal information.
      </p>
    </section>

    <section className={s.section}>
      <h2 className={s.heading}>Disclosure to third parties:</h2>
      <p className={s.text}>
       We do not disclose your personal data to third parties without your consent, except when required by law or to provide the services you requested.
      </p>
    </section>

    <section className={s.section}>
      <h2 className={s.heading}>Changes to the Privacy Policy:</h2>
      <p className={s.text}>
        We may periodically update this Privacy Policy. Please refer to this page to stay informed about any changes.
      </p>
    </section>

    <section className={s.section}>
      <h2 className={s.heading}>Contact us:</h2>
      <p className={s.text}>
        If you have any questions or concerns regarding this Privacy Policy or your information, please contact us using the contact details provided on our website.
      </p>
    </section>
  </div>
);
export default PrivacyPolicyPage;
