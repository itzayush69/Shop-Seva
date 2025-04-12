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
    welcomeTo: "Welcome to",
    seller: "Seller",
    sellerDesc: "Start selling your products to local customers with ease.",
    buyer: "Buyer",
    buyerDesc: "Find and buy from nearby shops and support local businesses.",
    aboutTitle: "About ShopSeva",
    aboutDescription: "ShopSeva is a local commerce platform empowering small businesses and connecting them with nearby buyers. We support regional languages and communities to help local economies thrive.",

    contactTitle: "Contact Us",
    contactEmail: "Email: support@shopseva.com",
    contactPhone: "Phone: +91 98765 43210",
    contactLocation: "Location: Bihar, India",

    quickLinksTitle: "Quick Links",
    exploreProducts: "Explore Products",

    allRightsReserved: "All rights reserved."
  },
  hi: {
    welcome: "ShopSeva में आपका स्वागत है",
    tagline: "अपना खुद का दुकान बनाएं और वैश्विक स्तर पर बिक्री शुरू करें",
    getStarted: "शुरू करें",
    login: "लॉगिन करें",
    signup: "साइन अप करें",
    createShop: "दुकान बनाएं",
    myShops: "मेरी दुकानें",
    products: "उत्पाद",
    dashboard: "डैशबोर्ड",
    settings: "सेटिंग्स",
    logout: "लॉगआउट करें",
    name: "नाम",
    email: "ईमेल",
    password: "पासवर्ड",
    description: "विवरण",
    price: "मूल्य",
    category: "श्रेणी",
    submit: "सबमिट करें",
    cancel: "रद्द करें",
    search: "खोजें",
    addProduct: "उत्पाद जोड़ें",
    featuredProducts: "विशिष्ट उत्पाद",
    viewAll: "सभी देखें",
    language: "भाषा",
    theme: "विषय",
    light: "हल्का",
    dark: "अंधेरा",
    system: "सिस्टम",
    addToCart: "कार्ट में जोड़ें",
    shopDescription: "कुछ ही मिनटों में अपनी ऑनलाइन दुकान बनाएं और वैश्विक ग्राहकों को बेचें।",
    whyChooseUs: "ShopSeva क्यों चुनें?",
    reason1: "क्षेत्रीय पहुंच",
    reason2: "आसान सेटअप",
    reason3: "बहुभाषी समर्थन",
    startSelling: "आज ही बिक्री शुरू करें",
    regionalReachDesc: "अपने शहर या पड़ोस में स्थानीय खरीदारों और विक्रेताओं से जुड़ें।",
    fastSetupDesc: "हमारे उपयोगकर्ता-मित्र इंटरफ़ेस से अपनी दुकान को कुछ ही मिनटों में सेटअप करें।",
    supportsRegionalLanguagesDesc: "हम आपकी जरूरतों को पूरा करने के लिए कई भाषाओं का समर्थन करते हैं。",
    welcomeTo: "स्वागत है",
    seller: "विक्रेता",
    sellerDesc: "अपने उत्पादों को स्थानीय ग्राहकों को आसानी से बेचें।",
    buyer: "खरीदार",
    buyerDesc: "पास के दुकानों से खरीदें और स्थानीय व्यवसायों का समर्थन करें।",
    aboutTitle: "शॉपसेवा के बारे में",
    aboutDescription: "शॉपसेवा एक स्थानीय वाणिज्य प्लेटफॉर्म है जो छोटे व्यवसायों को सशक्त बनाता है और उन्हें नजदीकी खरीदारों से जोड़ता है। हम स्थानीय भाषाओं और समुदायों का समर्थन करते हैं ताकि स्थानीय अर्थव्यवस्था समृद्ध हो सके।",

    contactTitle: "संपर्क करें",
    contactEmail: "ईमेल: support@shopseva.com",
    contactPhone: "फ़ोन: +91 98765 43210",
    contactLocation: "स्थान: बिहार, भारत",

    quickLinksTitle: "त्वरित लिंक",
    exploreProducts: "उत्पाद देखें",

    allRightsReserved: "सर्वाधिकार सुरक्षित।"
  },
  bho: {
    welcome: "ShopSeva में स्वागत बा",
    tagline: "अपना खुद के दुकान बनाईं आ वैश्विक स्तर पर बेचला शुरू करीं",
    getStarted: "शुरू करीं",
    login: "लॉगिन करीं",
    signup: "साइन अप करीं",
    createShop: "दुकान बनाई",
    myShops: "हमार दुकान",
    products: "सामान",
    dashboard: "डैशबोर्ड",
    settings: "सेटिंग",
    logout: "लॉगआउट करीं",
    name: "नाम",
    email: "ईमेल",
    password: "पासवर्ड",
    description: "विवरण",
    price: "मूल्य",
    category: "श्रेणी",
    submit: "सबमिट करीं",
    cancel: "रद्द करीं",
    search: "खोजी",
    addProduct: "सामान जोड़ल करीं",
    featuredProducts: "विशिष्ट सामान",
    viewAll: "सभी देखी",
    language: "भाषा",
    theme: "थीम",
    light: "हल्का",
    dark: "अंधेर",
    system: "सिस्टम",
    addToCart: "कार्ट में जोड़ल करीं",
    shopDescription: "कुछ मिनट में अपना ऑनलाइन दुकान बनाई आ वैश्विक ग्राहकों से बेचीं।",
    whyChooseUs: "ShopSeva काहे चुनल जाव?",
    reason1: "क्षेत्रीय पहुँच",
    reason2: "आसान सेटअप",
    reason3: "बहुभाषी समर्थन",
    startSelling: "आज से बिक्री शुरू करीं",
    regionalReachDesc: "अपने शहर या मोहल्ला में स्थानीय खरीदार आ विक्रेता से जुड़ीं।",
    fastSetupDesc: "हमरा यूज़र-फ्रेंडली इंटरफ़ेस से अपन दुकान कुछ मिनट में सेटअप करीं।",
    supportsRegionalLanguagesDesc: "हमरे पास कई भाषाओं के समर्थन बा ताकि आपक सुविधा हो सके।",
    welcomeTo: "स्वागत बा",
    seller: "विक्रेता",
    sellerDesc: "आपन सामान लोकल ग्राहक के आसानी से बेचिं।",
    buyer: "खरीदार",
    buyerDesc: "नजदीकी दुकान से खरीदें आ लोकल व्यवसाय के सहयोग करीं।",
    aboutTitle: "ShopSeva के बारे में",
    aboutDescription: "ShopSeva एगो लोकल व्यापार प्लेटफॉर्म बा, जे छोटे-छोटे दुकानदारन के ताकत देला आ खरीदारन से जोड़े ला। हम भोजपुरिया भाषा आ समुदाय के साथ देनी जा ताकि लोकल बाजार फूले-फले।",
  
    contactTitle: "संपर्क करीं",
    contactEmail: "ईमेल: support@shopseva.com",
    contactPhone: "फोन: +91 98765 43210",
    contactLocation: "जगह: बिहार, भारत",
  
    quickLinksTitle: "जल्दी पहुँच लिंक",
    exploreProducts: "सामान देखीं",
  
    allRightsReserved: "© सभ अधिकार सुरक्षित बा।"
  },
  ne: {
    welcome: "ShopSeva मा स्वागत छ",
    tagline: "आफ्नो पसल बनाएर विश्वव्यापी बिक्री सुरू गर्नुहोस्",
    getStarted: "सुरु गर्नुहोस्",
    login: "लगइन गर्नुहोस्",
    signup: "साइन अप गर्नुहोस्",
    createShop: "पसल सिर्जना गर्नुहोस्",
    myShops: "मेरो पसल",
    products: "उत्पादनहरू",
    dashboard: "ड्यासबोर्ड",
    settings: "सेटिङहरू",
    logout: "लगआउट गर्नुहोस्",
    name: "नाम",
    email: "इमेल",
    password: "पासवर्ड",
    description: "विवरण",
    price: "मूल्य",
    category: "श्रेणी",
    submit: "पठाउनुहोस्",
    cancel: "रद्द गर्नुहोस्",
    search: "खोज्नुहोस्",
    addProduct: "उत्पादन थप्नुहोस्",
    featuredProducts: "विशेष उत्पादनहरू",
    viewAll: "सबै हेर्नुहोस्",
    language: "भाषा",
    theme: "थीम",
    light: "प्रकाश",
    dark: "अन्धो",
    system: "सिस्टम",
    addToCart: "कार्टमा थप्नुहोस्",
    shopDescription: "केही मिनेटमा आफ्नो अनलाइन पसल सिर्जना गर्नुहोस् र ग्राहकहरूलाई विश्वभरि बेच्नुहोस्।",
    whyChooseUs: "हामीलाई किन छनौट गर्नुहोस्?",
    reason1: "क्षेत्रीय पहुँच",
    reason2: "सजिलो सेटअप",
    reason3: "बहुभाषी समर्थन",
    startSelling: "आजै बिक्री सुरु गर्नुहोस्",
    regionalReachDesc: "तपाईंको शहर वा छिमेकमा स्थानीय किन्ने र बेच्ने व्यक्तिहरूसँग सजिलै जडान गर्नुहोस्।",
    fastSetupDesc: "हाम्रो प्रयोगकर्ता मैत्री इन्टरफेससँग केही मिनेटमा आफ्नो पसल सेटअप गर्नुहोस्।",
    supportsRegionalLanguagesDesc: "हामी तपाईंको आवश्यकता अनुसार धेरै भाषाहरू समर्थन गर्दछौं।",
    welcomeTo: "स्वागत छ",
    seller: "विक्रेता",
    sellerDesc: "आफ्ना उत्पादनहरूलाई स्थानीय ग्राहकहरूलाई सजिलै बिक्री गर्नुहोस्।",
    buyer: "खरीदार",
    buyerDesc: "नजिकका पसलहरूबाट किन्नुहोस् र स्थानीय व्यवसायलाई समर्थन गर्नुहोस्।",
    aboutTitle: "ShopSeva बारेमा",
    aboutDescription: "ShopSeva एक स्थानीय व्यापार प्लेटफर्म हो जुन साना व्यवसायहरूलाई सशक्त बनाउँछ र नजिकैका खरीददारहरूसँग जोड्दछ। हामी स्थानीय भाषा र समुदायलाई समर्थन गर्छौं ताकि स्थानीय अर्थतन्त्र मजबुत बनोस्।",
  
    contactTitle: "सम्पर्क गर्नुहोस्",
    contactEmail: "इमेल: support@shopseva.com",
    contactPhone: "फोन: +91 98765 43210",
    contactLocation: "स्थान: बिहार, भारत",
  
    quickLinksTitle: "छिटो लिङ्कहरू",
    exploreProducts: "उत्पादनहरू हेर्नुहोस्",
  
    allRightsReserved: "© सबै अधिकार सुरक्षित छन्।"
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