import s from './TermsOfServicePage.module.css';

const TermsOfServicePage = () => (
  <div className={s.page}>
    <h1 className={s.title}>Terms of Service</h1>
    <p className={s.desc}>This "User Agreement" (the "Agreement") sets forth the terms and conditions governing the use of the Drink Master application ("App") and its services.</p>

    <section className={s.section}>
      <h2 className={s.heading}>Acceptance of Terms:</h2>
      <p className={s.text}>
        By accessing or using the Drink Master app, you agree to comply with and be bound by the terms and conditions of this Agreement. If you do not agree with any part of this Agreement, you should immediately discontinue the use of the App.
      </p>
    </section>

    <section className={s.section}>
      <h2 className={s.heading}>App Features and Services:</h2>
      <p className={s.text}>
        The Drink Master app provides users with access to a collection of cocktail recipes, both curated and user-generated. Users can explore, search, and create their own cocktail recipes using the provided tools.
      </p>
    </section>

    <section className={s.section}>
      <h2 className={s.heading}>User Accounts and Content:</h2>
      <p className={s.text}>
        To fully utilize the App's features, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account credentials and any content you submit, including your own cocktail recipes. You retain ownership of your content, but by submitting, you grant the App a non-exclusive, royalty-free license to use, modify, and distribute your content within the App.
      </p>
    </section>

    <section className={s.section}>
      <h2 className={s.heading}>Intellectual Property:</h2>
      <p className={s.text}>
        All content provided by the Cocktail Creations app, including cocktail recipes, images, and text, are protected by copyright and other intellectual property laws. Users may not reproduce, distribute, or use these materials for commercial purposes without explicit permission from the App's operators.
      </p>
    </section>

    <section className={s.section}>
      <h2 className={s.heading}>User-Generated Content Guidelines:</h2>
      <p className={s.text}>
        When creating and sharing user-generated cocktail recipes, you agree not to submit content that is offensive, unlawful, infringing, or harmful. The App reserves the right to remove or moderate user-generated content that violates these guidelines.
      </p>
    </section>

    <section className={s.section}>
      <h2 className={s.heading}>App Updates and Changes:</h2>
      <p className={s.text}>
        The features and functionality of the Drink Master app may evolve over time. The App reserves the right to modify, update, or discontinue any aspect of the App without prior notice.
      </p>
    </section>

    <section className={s.section}>
      <h2 className={s.heading}>Disclaimer of Liability:</h2>
      <p className={s.text}>
       While we strive to provide accurate and reliable information, the Drink Master app does not warrant the accuracy, completeness, or reliability of the content provided. Users acknowledge that cocktail recipes involve the use of alcohol and potentially hazardous ingredients and should exercise caution when using the recipes. The App's liability is limited to the extent permitted by applicable law.
      </p>
    </section>
    <section className={s.section}>
      <h2 className={s.heading}>Governing Law and Dispute Resolution:</h2>
      <p className={s.text}>
      This Agreement shall be governed by the laws of [Country/State]. Any disputes arising from or related to this Agreement or the use of the App shall be subject to the exclusive jurisdiction of the courts in [City, Country/State].
      </p>
    </section>
    <section className={s.section}>
      <p className={s.text}>
        By accessing or using the Drink Master app, you acknowledge that you have read, understood, and agreed to be bound by this User Agreement. If you do not agree to these terms, you must cease using the App immediately.
      </p>
    </section>
  </div>
);
export default TermsOfServicePage;
