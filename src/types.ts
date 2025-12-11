
export type Language = 'cn' | 'en';

export interface NavItem {
  key: string;
  path: string;
}

export interface ContentText {
  nav: {
    home: string;
    about: string;
    business: string;
    marketInsights: string;
    contact: string;
    login: string;
    register: string;
    logout: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about: {
    title: string;
    description: string;
    imageSubtitle: string;
    detailsTitle: string;
    estDate: string;
    capital: string;
    rep: string;
    location: string;
    philosophy: {
      title: string;
      items: {
        title: string;
        desc: string;
      }[];
    };
  };
  business: {
    title: string;
    subtitle: string;
    detailsButton: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  marketInsights: {
    title: string;
    subtitle: string;
    readMore: string;
    viewArchives: string;
    categories: {
      all: string;
      macro: string;
      industry: string;
      strategy: string;
    };
    articles: {
      id: number;
      title: string;
      date: string;
      category: 'macro' | 'industry' | 'strategy';
      image: string;
      summary: string;
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    addressTitle: string;
    address: string;
    phoneTitle: string;
    phone: string;
    emailTitle: string;
    email: string;
    email2: string;
    form: {
      title: string;
      name: string;
      email: string;
      type: string;
      typeOptions: {
        institutional: string;
        individual: string;
        media: string;
      };
      message: string;
      submit: string;
    };
  };
  auth: {
    loginTitle: string;
    registerTitle: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    confirmPasswordPlaceholder: string;
    submitLogin: string;
    submitRegister: string;
    hasAccount: string;
    noAccount: string;
    namePlaceholder: string;
    welcomeBack: string;
    welcomeNew: string;
    rememberMe: string;
    forgotPassword: string;
    sslSecure: string;
  };
  cookieConsent: {
    text: string;
    accept: string;
    decline: string;
  };
}