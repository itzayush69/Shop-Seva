import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'hi' | 'bho' | 'ne';

// Define translations interface
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Create translations for our app
const translations: Translations = {
  en: {
    welcome: "Welcome to ShopSeva",
    tagline: "Create your own shop and start selling globally",
    getStarted: "Get Started",
    login: "Login",
    signup: "Sign Up",
    createShop: "Create Shop",
    myShops: "My Shops",
    products: "Products",
    dashboard: "Dashboard",
    settings: "Settings",
    logout: "Logout",
    name: "Name",
    email: "Email",
    password: "Password",
    description: "Description",
    price: "Price",
    category: "Category",
    submit: "Submit",
    cancel: "Cancel",
    search: "Search",
    addProduct: "Add Product",
    featuredProducts: "Featured Products",
    viewAll: "View All",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    addToCart: "Add to Cart",
    shopDescription: "Create your own online shop in minutes and start selling to customers worldwide.",
    whyChooseUs: "Why Choose ShopSeva?",
    reason1: "Regional Reach",
    reason2: "Easy Setup",
    reason3: "Multi-language Support",
    startSelling: "Start Selling Today",
    regionalReachDesc: "Easily connect with local buyers and sellers in your city or neighborhood.",
    fastSetupDesc: "Set up your shop in minutes with our user-friendly interface.",
    supportsRegionalLanguagesDesc: "We support multiple languages to cater to your needs.",
  },
  hi: {
    welcome: "ShopSeva में आपका स्वागत है",
    tagline: "अपनी दुकान बनाएं और वैश्विक रूप से बेचना शुरू करें",
    getStarted: "शुरू करें",
    login: "लॉग इन करें",
    signup: "साइन अप करें",
    createShop: "दुकान बनाएं",
    myShops: "मेरी दुकानें",
    products: "उत्पाद",
    dashboard: "डैशबोर्ड",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",
    name: "नाम",
    email: "ईमेल",
    password: "पासवर्ड",
    description: "विवरण",
    price: "मूल्य",
    category: "श्रेणी",
    submit: "जमा करें",
    cancel: "रद्द करें",
    search: "खोजें",
    addProduct: "उत्पाद जोड़ें",
    featuredProducts: "प्रमुख उत्पाद",
    viewAll: "सभी देखें",
    language: "भाषा",
    theme: "थीम",
    light: "हल्का",
    dark: "अंधेरा",
    system: "सिस्टम",
    addToCart: "कार्ट में जोड़ें",
    shopDescription: "कुछ मिनटों में अपनी ऑनलाइन दुकान बनाएं और दुनिया भर के ग्राहकों को बेचना शुरू करें।",
    whyChooseUs: "हमें क्यों चुनें?",
    reason1: "क्षेत्रीय पहुंच",
    reason2: "आसान सेटअप",
    reason3: "बहुभाषी समर्थन",
    startSelling: "आज ही बेचना शुरू करें",
    regionalReachDesc: "अपने शहर या पड़ोस में स्थानीय खरीदारों और विक्रेताओं के साथ आसानी से जुड़ें।",
    fastSetupDesc: "हमारे उपयोगकर्ता-अनुकूल इंटरफेस के साथ मिनटों में अपनी दुकान सेट करें।",
    supportsRegionalLanguagesDesc: "हम आपकी आवश्यकताओं को पूरा करने के लिए कई भाषाओं का समर्थन करते हैं।",
  },
  bho: {
    welcome: "ShopSeva में स्वागत बा",
    tagline: "अपना दुकान बनाईं आ दुनिया भर में बेचना शुरू करीं",
    getStarted: "शुरू करीं",
    login: "लॉग इन करीं",
    signup: "साइन अप करीं",
    createShop: "दुकान बनाईं",
    myShops: "हमार दुकान",
    products: "सामान",
    dashboard: "डैशबोर्ड",
    settings: "सेटिंग्स",
    logout: "लॉग आउट करीं",
    name: "नाम",
    email: "ईमेल",
    password: "पासवर्ड",
    description: "विवरण",
    price: "कीमत",
    category: "श्रेणी",
    submit: "जमा करीं",
    cancel: "रद्द करीं",
    search: "खोजीं",
    addProduct: "सामान जोड़ें",
    featuredProducts: "प्रमुख सामान",
    viewAll: "सभी देखें",
    language: "भाषा",
    theme: "थीम",
    light: "हलका",
    dark: "अंधेरा",
    system: "सिस्टम",
    addToCart: "कार्ट में जोड़ें",
    shopDescription: "कुछ मिनट में अपना ऑनलाइन दुकान बनाईं और दुनिया भर के ग्राहकों को बेचें।",
    whyChooseUs: "हमरा के काहे चुनें?",
    reason1: "इलाका में पहुंच",
    reason2: "आसान सेटअप",
    reason3: "बहु-भाषा समर्थन",
    startSelling: "आज ही बेचना शुरू करीं",
    regionalReachDesc: "अपने शहर या मोहल्ला में स्थानीय खरीदार आ विक्रेता से आसानी से जुड़ जाईं।",
    fastSetupDesc: "हमार उपयोगकर्ता-अनुकूल इंटरफेस के साथ मिनट में अपना दुकान सेट करीं।",
    supportsRegionalLanguagesDesc: "हम रउआ जरूरत के पूरा करे खातिर कई भाषा के समर्थन करीं।",
  },
  ne: {
    welcome: "ShopSeva मा स्वागत छ",
    tagline: "आफ्नो पसल खोल्नुहोस् र विश्वव्यापी रूपमा बेच्न सुरु गर्नुहोस्",
    getStarted: "सुरु गर्नुहोस्",
    login: "लगइन गर्नुहोस्",
    signup: "साइन अप गर्नुहोस्",
    createShop: "पसल खोल्नुहोस्",
    myShops: "मेरो पसल",
    products: "उत्पादन",
    dashboard: "ड्यासबोर्ड",
    settings: "सेटिंगहरू",
    logout: "लगआउट गर्नुहोस्",
    name: "नाम",
    email: "ईमेल",
    password: "पासवर्ड",
    description: "विवरण",
    price: "मूल्य",
    category: "कोटि",
    submit: "पेश गर्नुहोस्",
    cancel: "रद्द गर्नुहोस्",
    search: "खोजी गर्नुहोस्",
    addProduct: "उत्पादन थप्नुहोस्",
    featuredProducts: "विशेष उत्पादनहरू",
    viewAll: "सबै हेर्नुहोस्",
    language: "भाषा",
    theme: "थिम",
    light: "हल्का",
    dark: "अन्धो",
    system: "सिस्टम",
    addToCart: "कार्टमा थप्नुहोस्",
    shopDescription: "केही मिनेटमा आफ्नो अनलाइन पसल खोल्नुहोस् र संसारभरका ग्राहकहरूलाई बेच्न सुरु गर्नुहोस्।",
    whyChooseUs: "हामीलाई किन चयन गर्नुहोस्?",
    reason1: "क्षेत्रीय पहुँच",
    reason2: "सस्तो सेटअप",
    reason3: "बहुभाषिक समर्थन",
    startSelling: "आजै बेचना सुरु गर्नुहोस्",
    regionalReachDesc: "आफ्नो शहर वा छिमेकमा स्थानीय किन्ने र बेच्ने व्यक्तिहरूसँग सजिलै जडान गर्नुहोस्।",
    fastSetupDesc: "हाम्रो प्रयोगकर्ता-मैत्री इन्टरफेसको साथमा मिनेटहरूमा आफ्नो पसल सेट गर्नुहोस्।",
    supportsRegionalLanguagesDesc: "हामी तपाईंको आवश्यकताहरू पूरा गर्नका लागि धेरै भाषाहरूको समर्थन गर्छौं।",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    if (!translations[language]) return translations['en'][key] || key;
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};