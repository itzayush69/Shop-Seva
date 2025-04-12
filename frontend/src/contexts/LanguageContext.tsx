
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'es' | 'fr' | 'de';

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
    reason1: "Global Reach",
    reason2: "Easy Setup",
    reason3: "Multi-language Support",
    startSelling: "Start Selling Today",
  },
  es: {
    welcome: "Bienvenido a ShopSeva",
    tagline: "Crea tu propia tienda y comienza a vender globalmente",
    getStarted: "Comenzar",
    login: "Iniciar Sesión",
    signup: "Registrarse",
    createShop: "Crear Tienda",
    myShops: "Mis Tiendas",
    products: "Productos",
    dashboard: "Panel de Control",
    settings: "Ajustes",
    logout: "Cerrar Sesión",
    name: "Nombre",
    email: "Correo",
    password: "Contraseña",
    description: "Descripción",
    price: "Precio",
    category: "Categoría",
    submit: "Enviar",
    cancel: "Cancelar",
    search: "Buscar",
    addProduct: "Añadir Producto",
    featuredProducts: "Productos Destacados",
    viewAll: "Ver Todo",
    language: "Idioma",
    theme: "Tema",
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
    addToCart: "Añadir al Carrito",
    shopDescription: "Crea tu propia tienda en línea en minutos y comienza a vender a clientes en todo el mundo.",
    whyChooseUs: "¿Por qué elegir ShopSeva?",
    reason1: "Alcance Global",
    reason2: "Configuración Fácil",
    reason3: "Soporte Multi-idioma",
    startSelling: "Comienza a Vender Hoy",
  },
  fr: {
    welcome: "Bienvenue sur ShopSeva",
    tagline: "Créez votre propre boutique et commencez à vendre à l'échelle mondiale",
    getStarted: "Commencer",
    login: "Connexion",
    signup: "S'inscrire",
    createShop: "Créer une Boutique",
    myShops: "Mes Boutiques",
    products: "Produits",
    dashboard: "Tableau de Bord",
    settings: "Paramètres",
    logout: "Déconnexion",
    name: "Nom",
    email: "E-mail",
    password: "Mot de passe",
    description: "Description",
    price: "Prix",
    category: "Catégorie",
    submit: "Soumettre",
    cancel: "Annuler",
    search: "Rechercher",
    addProduct: "Ajouter un Produit",
    featuredProducts: "Produits en Vedette",
    viewAll: "Voir Tout",
    language: "Langue",
    theme: "Thème",
    light: "Clair",
    dark: "Sombre",
    system: "Système",
    addToCart: "Ajouter au Panier",
    shopDescription: "Créez votre propre boutique en ligne en quelques minutes et commencez à vendre à des clients du monde entier.",
    whyChooseUs: "Pourquoi choisir ShopSeva?",
    reason1: "Portée Mondiale",
    reason2: "Configuration Facile",
    reason3: "Support Multilingue",
    startSelling: "Commencez à Vendre Aujourd'hui",
  },
  de: {
    welcome: "Willkommen bei ShopSeva",
    tagline: "Erstellen Sie Ihren eigenen Shop und beginnen Sie weltweit zu verkaufen",
    getStarted: "Loslegen",
    login: "Anmelden",
    signup: "Registrieren",
    createShop: "Shop Erstellen",
    myShops: "Meine Shops",
    products: "Produkte",
    dashboard: "Dashboard",
    settings: "Einstellungen",
    logout: "Abmelden",
    name: "Name",
    email: "E-Mail",
    password: "Passwort",
    description: "Beschreibung",
    price: "Preis",
    category: "Kategorie",
    submit: "Absenden",
    cancel: "Abbrechen",
    search: "Suchen",
    addProduct: "Produkt Hinzufügen",
    featuredProducts: "Ausgewählte Produkte",
    viewAll: "Alle Anzeigen",
    language: "Sprache",
    theme: "Thema",
    light: "Hell",
    dark: "Dunkel",
    system: "System",
    addToCart: "In den Warenkorb",
    shopDescription: "Erstellen Sie Ihren eigenen Online-Shop in Minuten und beginnen Sie, an Kunden weltweit zu verkaufen.",
    whyChooseUs: "Warum ShopSeva wählen?",
    reason1: "Globale Reichweite",
    reason2: "Einfaches Setup",
    reason3: "Mehrsprachige Unterstützung",
    startSelling: "Starten Sie heute mit dem Verkaufen",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Try to get language from local storage, default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  // Save language preference to local storage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
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

// Hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
