import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Instagram, Facebook, Clock } from 'lucide-react';
import './index.css';

type Language = 'en' | 'es';

const translations = {
  en: {
    nav_food: "Our food",
    nav_gallery: "Gallery",
    nav_contact: "Contact",
    hero_yes: "Awaken",
    hero_we_are: "your",
    hero_open: "senses.",
    hero_desc: "Experience the art of fine dining. Our kitchen is now serving the most exclusive flavors of the season.",
    btn_start: "Start now",
    delivery: "#FREEHOMEDELIVERY",
    menu_title: "Our Menu",
    menu_starters: "Starters",
    menu_mains: "Main Courses",
    menu_desserts: "Desserts",
    menu_drinks: "Signature Drinks",
    menu_wines: "Fine Wines",
    gallery_title: "A Visual Journey",
    gallery_subtitle: "Our Gallery",
    reserve_title: "Secure Your Table",
    reserve_desc: "We pride ourselves on offering an intimate atmosphere... Please fill out your details.",
    form_name: "Full Name",
    form_date: "Date",
    form_guests: "Guests",
    form_ppl: "People",
    form_submit: "Confirm Reservation",
    form_processing: "Processing...",
    form_success: "Reservation confirmed! We wait for you.",
    footer_brand_desc: "A haute couture dining experience. Redefining modern cuisine with world-class ingredients and avant-garde techniques.",
    footer_explore: "Explore",
    footer_home: "Home",
    footer_contact: "Contact",
    footer_hours: "Hours",
    footer_mon_thu: "Monday - Thursday",
    footer_fri_sun: "Friday - Sunday",
    footer_terms: "Terms of Service",
    footer_privacy: "Privacy",
    btn_reserve_now: "Reserve a Table",
    testimonial_title: "The Guest's Voice",
    wine_pairing: "Sommelier Selection",
    footer_dress_code: "Dress Code",
    footer_dress_code_val: "Smart Casual / Formal",
    footer_valet: "Valet Parking Available",
    tasting_menu_title: "The Luxe Experience",
    tasting_menu_subtitle: "Tasting Menu",
    tasting_menu_desc: "A 9-course journey through our kitchen's philosophy. Each dish is a story of tradition and innovation.",
    tasting_menu_price: "245 per person",
    tasting_menu_pairing: "Wine Pairing +120"
  },
  es: {
    nav_food: "Menú",
    nav_gallery: "Galería",
    nav_contact: "Contacto",
    hero_yes: "Despierta",
    hero_we_are: "tus",
    hero_open: "sentidos.",
    hero_desc: "Experimenta el arte de la alta cocina. Nuestra cocina está sirviendo los sabores más exclusivos de la temporada.",
    btn_start: "Empezar",
    delivery: "#ENVÍOGRATIS",
    menu_title: "Nuestro Menú",
    menu_starters: "Entradas",
    menu_mains: "Platos Principales",
    menu_desserts: "Postres",
    menu_drinks: "Bebidas de Autor",
    menu_wines: "Vinos Finos",
    gallery_title: "Un Viaje Visual",
    gallery_subtitle: "Nuestra Galería",
    reserve_title: "Asegure Su Mesa",
    reserve_desc: "Nos enorgullecemos de ofrecer un ambiente íntimo... Por favor, complete sus datos.",
    form_name: "Nombre Completo",
    form_date: "Fecha",
    form_guests: "Personas",
    form_ppl: "Personas",
    form_submit: "Confirmar Reserva",
    form_processing: "Procesando...",
    form_success: "¡Reserva confirmada! Le esperamos.",
    footer_brand_desc: "Una experiencia gastronómica de alta costura. Redefiniendo la cocina moderna con ingredientes de clase mundial.",
    footer_explore: "Explorar",
    footer_home: "Inicio",
    footer_contact: "Contacto",
    footer_hours: "Horarios",
    footer_mon_thu: "Lunes - Jueves",
    footer_fri_sun: "Viernes - Domingo",
    footer_terms: "Términos de Servicio",
    footer_privacy: "Privacidad",
    btn_reserve_now: "Reservar Mesa",
    testimonial_title: "La Voz de Nuestros Huéspedes",
    wine_pairing: "Selección del Sommelier",
    footer_dress_code: "Código de Vestimenta",
    footer_dress_code_val: "Elegante / Casual Formas",
    footer_valet: "Servicio de Valet Parking",
    tasting_menu_title: "La Experiencia Luxe",
    tasting_menu_subtitle: "Menú Degustación",
    tasting_menu_desc: "Un viaje de 9 pasos a través de la filosofía de nuestra cocina. Cada plato es una historia de tradición e innovación.",
    tasting_menu_price: "245 por persona",
    tasting_menu_pairing: "Maridaje de Vinos +120"
  }
};

const LangContext = createContext<{lang: Language, toggleLang: () => void, t: typeof translations['en']}>({
  lang: 'en', toggleLang: () => {}, t: translations.en
});
const useLang = () => useContext(LangContext);

const MENU_DATA = {
  es: {
    starters: [
      { id: 1, name: 'Carpaccio de Res Wagyu A5', price: 38, desc: 'Láminas de mármol grado A5, perlas de trufa negra, emulsión de piñones tostados y escamas de sal Maldon.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80' },
      { id: 2, name: 'Tartar de Atún Bluefin Imperial', price: 36, desc: 'Corte artesanal a punta de cuchillo, aire de jengibre y soja envejecida 15 años, sobre una cama de aguacate al carbón.', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 15, name: 'Ostras Guillardeau No. 2 "Gold"', price: 48, desc: 'Media docena de ostras premium, granizado de champán rosado y perlas de caviar cítrico.', image: 'https://images.unsplash.com/photo-1599081533966-2358fb88baaf?auto=format&fit=crop&w=800&q=80' },
      { id: 16, name: 'Vieiras en Costra de Oro 24k', price: 42, desc: 'Vieiras de profundidad selladas, crema de coliflor trufada y láminas de oro puro comestible.', image: 'https://images.unsplash.com/photo-1532639193859-bff50adb61ED?auto=format&fit=crop&w=800&q=80' },
      { id: 19, name: 'Foie Gras al Armagnac', price: 45, desc: 'Escalope de foie gras sellado, brioche de mantequilla noisette y chutney de higos macerados en licor.', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80' },
    ],
    mains: [
      { id: 3, name: 'Tomahawk Black Angus Ultra-Aged', price: 165, desc: 'Selección de 60 días de maduración en seco, terminado en leña de encina. Maridado con sal de carbón volcánico.', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=800&q=80', pairing: 'Opus One Napa Valley' },
      { id: 4, name: 'Bacalao Black Cod al Miso Real', price: 58, desc: 'Codiciado bacalao negro marinado en miso por 72 horas, glaseado cítrico y brotes de rábano picante.', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80', pairing: 'Domaine Leflaive Puligny-Montrachet' },
      { id: 17, name: 'Risotto de Setas e Infusión de Trufa', price: 52, desc: 'Arroz Acquerello reserva, sinfonía de setas silvestres, crema de parmesano reggiano de 36 meses.', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80', pairing: 'Gaja Barbaresco' },
      { id: 18, name: 'Bogavante Blue en Mantequilla de Coral', price: 95, desc: 'Bogavante azul entero pochado a baja temperatura, reducción de sus propios jugos y perlas de hinojo.', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80', pairing: 'Krug Grande Cuvée' },
      { id: 20, name: 'Pato de Pekín "Luxe Style"', price: 75, desc: 'Pechuga de pato laqueada con miel de trufa, puré de calabaza especiado y reducción de Oporto.', image: 'https://images.unsplash.com/photo-1518492104633-c3ed9e783c79?auto=format&fit=crop&w=800&q=80', pairing: 'Château Margaux 2012' },
    ],
    desserts: [
      { id: 5, name: 'Órbita de Cacao y Oro 24k', price: 32, desc: 'Esfera de chocolate ecuatoriano al 90%, mousse de avellana del Piamonte y núcleo de caramelo salado fluído.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80' },
      { id: 6, name: 'Nube de Pistacho de Bronte', price: 28, desc: 'Bizcocho sifón de pistacho siciliano, higos macerados en Oporto y helado de leche de cabra artesanal.', image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=800&q=80' },
      { id: 11, name: 'Sinfonía de Frutos del Bosque', price: 26, desc: 'Texturas de frambuesa, fresas silvestres, merengue de hibisco y sorbete nitrogenado de ruibarbo.', image: 'https://images.unsplash.com/photo-1571115177098-24c424b32bb6?auto=format&fit=crop&w=800&q=80' },
      { id: 12, name: 'Degustación de Quesos Vintage', price: 35, desc: 'Selección de quesos europeos con D.O., miel de mil flores y frutos secos caramelizados al romero.', image: 'https://images.unsplash.com/photo-1481919934151-37384444BA92?auto=format&fit=crop&w=800&q=80' },
      { id: 21, name: 'Soufflé de Grand Marnier', price: 30, desc: 'Soufflé clásico horneado al momento, salsa de naranja amarga y helado de vainilla de Tahití.', image: 'https://images.unsplash.com/photo-1579954115563-e72bf1381629?auto=format&fit=crop&w=800&q=80' },
    ],
    drinks: [
      { id: 7, name: 'Enigma de LuxeBite', price: 24, desc: 'Cóctel de autor con ginebra botánica, esencia de bergamota y humo de cerezo.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80' },
      { id: 8, name: 'Elixir de Oro Sin Alcohol', price: 18, desc: 'Destilado botánico 0%, néctar de fruta de la pasión y chispas de oro líquido comestible.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80' },
      { id: 22, name: 'Negroni Ahumado de 12 Meses', price: 26, desc: 'Mezcla clásica reposada en barrica de roble, notas de madera y naranja quemada.', image: 'https://images.unsplash.com/photo-1541301681456-19d76e687b1c?auto=format&fit=crop&w=800&q=80' },
    ],
    wines: [
      { id: 9, name: 'Dom Pérignon P2 Plénitude 2003', price: 950, desc: 'La máxima expresión del champagne. Complejidad, precisión y longevidad absoluta.', image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80' },
      { id: 10, name: 'Vega Sicilia Único Reserva', price: 680, desc: 'Vino legendario español, notas de cedro, tabaco y una estructura aterciopelada inigualable.', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80' },
      { id: 23, name: 'Château Pétrus Pomerol 2015', price: 4200, desc: 'La joya de Burdeos. Un merlot inalcanzable con una profundidad y elegancia mística.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80' },
      { id: 24, name: 'Sassicaia Tenuta San Guido', price: 450, desc: 'El Super Toscano por excelencia, equilibrio perfecto entre cabernet y terroir italiano.', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80' },
      { id: 25, name: 'Krug Clos du Mesnil 2008', price: 1800, desc: 'Champagne Blanc de Blancs de parcela única, pureza extrema y frescura vibrante.', image: 'https://images.unsplash.com/photo-1516535585096-74fc243b7495?auto=format&fit=crop&w=800&q=80' },
    ]
  },
  en: {
    starters: [
      { id: 1, name: 'Wagyu Beef Carpaccio A5', price: 38, desc: 'A5 marble grade slices, black truffle pearls, toasted pine nut emulsion and Maldon salt flakes.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80' },
      { id: 2, name: 'Imperial Bluefin Tuna Tartare', price: 36, desc: 'Hand-cut by knife, ginger air and 15-year aged soy sauce over a charcoal-smoked avocado bed.', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 15, name: 'Guillardeau Oysters No. 2 "Gold"', price: 48, desc: 'Half a dozen premium oysters, pink champagne granita and citrus caviar pearls.', image: 'https://images.unsplash.com/photo-1599081533966-2358fb88baaf?auto=format&fit=crop&w=800&q=80' },
      { id: 16, name: '24k Gold Crusted Scallops', price: 42, desc: 'Pan-seared deep sea scallops, truffled cauliflower cream and pure edible gold leaf.', image: 'https://images.unsplash.com/photo-1532639193859-bff50adb61ED?auto=format&fit=crop&w=800&q=80' },
      { id: 19, name: 'Armagnac Foie Gras', price: 45, desc: 'Seared foie gras escalope, noisette butter brioche and liquor-macerated fig chutney.', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80' },
    ],
    mains: [
      { id: 3, name: 'Ultra-Aged Black Angus Tomahawk', price: 165, desc: '60-day dry-aged selection, finished on holm oak firewood. Paired with volcanic charcoal salt.', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=800&q=80', pairing: 'Opus One Napa Valley' },
      { id: 4, name: 'Royal Miso Black Cod', price: 58, desc: 'Coveted black cod marinated in miso for 72 hours, citrus glaze and horseradish sprouts.', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80', pairing: 'Domaine Leflaive Puligny-Montrachet' },
      { id: 17, name: 'Mushroom & Truffle Infusion Risotto', price: 52, desc: 'Reserve Acquerello rice, seasonal wild mushroom symphony, 36-month Parmesan Reggiano cream.', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80', pairing: 'Gaja Barbaresco' },
      { id: 18, name: 'Blue Lobster in Coral Butter', price: 95, desc: 'Whole blue lobster poached at low temperature, reduction of its own juices and fennel pearls.', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80', pairing: 'Krug Grande Cuvée' },
      { id: 20, name: 'Peking Duck "Luxe Style"', price: 75, desc: 'Honey-truffle lacquered duck breast, spiced pumpkin puree and Port wine reduction.', image: 'https://images.unsplash.com/photo-1518492104633-c3ed9e783c79?auto=format&fit=crop&w=800&q=80', pairing: 'Château Margaux 2012' },
    ],
    desserts: [
      { id: 5, name: '24k Gold & Cocoa Orbit', price: 32, desc: '90% Ecuadorian chocolate sphere, Piedmont hazelnut mousse and fluid salted caramel core.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80' },
      { id: 6, name: 'Bronte Pistachio Cloud', price: 28, desc: 'Sicilian pistachio siphon cake, Port-infused figs and artisanal goat milk ice cream.', image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=800&q=80' },
      { id: 11, name: 'Wild Berry Symphony', price: 26, desc: 'Raspberry textures, wild strawberries, hibiscus meringue and nitrogen-frozen rhubarb sorbet.', image: 'https://images.unsplash.com/photo-1571115177098-24c424b32bb6?auto=format&fit=crop&w=800&q=80' },
      { id: 12, name: 'Vintage Cheese Tasting', price: 35, desc: 'Premium D.O. European cheese selection, wildflower honey and rosemary caramelized nuts.', image: 'https://images.unsplash.com/photo-1481919934151-37384444BA92?auto=format&fit=crop&w=800&q=80' },
      { id: 21, name: 'Grand Marnier Soufflé', price: 30, desc: 'Classic made-to-order soufflé, bitter orange sauce and Tahitian vanilla ice cream.', image: 'https://images.unsplash.com/photo-1579954115563-e72bf1381629?auto=format&fit=crop&w=800&q=80' },
    ],
    drinks: [
      { id: 7, name: 'LuxeBite Enigma', price: 24, desc: 'Signature cocktail with botanical gin, bergamot essence and cherry wood smoke.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80' },
      { id: 8, name: 'Non-Alcoholic Gold Elixir', price: 18, desc: '0% botanical distillate, passion fruit nectar and edible liquid gold sparks.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80' },
      { id: 22, name: '12-Month Smoked Negroni', price: 26, desc: 'Classic mix aged in oak barrels, wood notes and burnt orange flavor.', image: 'https://images.unsplash.com/photo-1541301681456-19d76e687b1c?auto=format&fit=crop&w=800&q=80' },
    ],
    wines: [
      { id: 9, name: 'Dom Pérignon P2 Plénitude 2003', price: 950, desc: 'The ultimate expression of champagne. Complexity, precision and absolute longevity.', image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80' },
      { id: 10, name: 'Vega Sicilia Único Reserva', price: 680, desc: 'Legendary Spanish wine, notes of cedar, tobacco and an unmatched velvety structure.', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80' },
      { id: 23, name: 'Château Pétrus Pomerol 2015', price: 4200, desc: 'The jewel of Bordeaux. An unattainable merlot with mystical depth and elegance.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80' },
      { id: 24, name: 'Sassicaia Tenuta San Guido', price: 450, desc: 'The definitive Super Tuscan, perfect balance between Cabernet and Italian terroir.', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80' },
      { id: 25, name: 'Krug Clos du Mesnil 2008', price: 1800, desc: 'Single-plot Blanc de Blancs champagne, extreme purity and vibrant freshness.', image: 'https://images.unsplash.com/photo-1516535585096-74fc243b7495?auto=format&fit=crop&w=800&q=80' },
    ]
  }
};

interface MenuItem { id: number; name: string; price: number; desc: string; image: string; pairing?: string; }
interface MenuData { starters: MenuItem[]; mains: MenuItem[]; desserts: MenuItem[]; drinks: MenuItem[]; wines: MenuItem[]; }

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
};
const textReveal = {
  hidden: { y: "150%", rotate: 5, opacity: 0 },
  visible: { y: 0, rotate: 0, opacity: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const Navigation = () => {
  const { lang, toggleLang, t } = useLang();
  return (
    <header style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem', fontWeight: '800', fontFamily: 'var(--font-bold)', letterSpacing: '4px', textTransform: 'uppercase', lineHeight: '1' }}>
        VIV<br/>AIA<br/><span style={{fontSize: '0.5rem', letterSpacing: '1px', fontWeight: '400'}}>RESTAURANT</span>
      </Link>
      <nav style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
        <Link to="/menu" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.8rem', fontWeight: '600' }}>{t.nav_food}</Link>
        <Link to="/gallery" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.8rem', fontWeight: '600' }}>{t.nav_gallery}</Link>
        <Link to="/reservations" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.8rem', fontWeight: '600' }}>{t.nav_contact}</Link>
        
        <div style={{ marginLeft: '1rem', width: '50px', height: '50px', background: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <svg fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24" width="20" height="20"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        
        <button onClick={toggleLang} style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}>
          {lang === 'en' ? 'ES' : 'EN'}
        </button>
      </nav>
    </header>
  );
};

const Home = () => {
  const { t } = useLang();
  return (
    <>
      <Navigation />
      <section className="hero">
        <div className="hero-triptych">
          <div className="hero-lines-overlay"></div>
          <motion.div className="triptych-item tall" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1.5 }}>
            <img src="/food-hero.png" alt="Signature Dish" />
          </motion.div>
          <motion.div className="triptych-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1.5 }}>
            <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80" alt="Carpaccio de Res Wagyu" />
          </motion.div>
          <motion.div className="triptych-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1.5 }}>
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" alt="Risotto de Langosta" />
          </motion.div>
        </div>

        <div className="hero-text-pane">
          <div className="vertical-text">{t.delivery}</div>
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <h1>
              <motion.span variants={textReveal} className="smaller-text">{t.hero_yes}</motion.span>
              <motion.span variants={textReveal}>{t.hero_we_are}</motion.span>
              <motion.span variants={textReveal}>{t.hero_open}</motion.span>
            </h1>
            <motion.p variants={fadeUp} style={{ marginTop: '2rem' }}>
              {t.hero_desc}
            </motion.p>
            <motion.div variants={fadeUp} style={{ marginTop: '2.5rem' }}>
              <Link to="/reservations" className="btn-outline">
                {t.btn_start}
              </Link>
            </motion.div>
          </motion.div>
          <div className="social-horizontal" style={{ position: 'absolute', bottom: '2.5rem', right: '8%', display: 'flex', gap: '1.5rem', zIndex: 10 }}>
            <a href="#" style={{ color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s' }}><Instagram size={15} /></a>
            <a href="#" style={{ color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.3s' }}><Facebook size={15} /></a>
          </div>
        </div>
      </section>

      <section className="testimonials-section" style={{ background: '#0a0a0a', padding: '100px 0' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span className="gold-text" style={{ letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Trust</span>
            <h2 style={{ fontSize: '3.5rem', color: '#fff', marginTop: '1rem' }}>{t.testimonial_title}</h2>
          </motion.div>
          
          <div className="testimonials-grid">
            {[
              { name: "Julian Casablancas", role: "Food Critic", text: "LuxeBite isn't just a restaurant, it's a statement. The Lobster Risotto is a masterclass in balance and texture." },
              { name: "Elena Rodriguez", role: "Gourmet Traveler", text: "La atmósfera es sencillamente imbatible. Cada detalle, desde la cubertería hasta el maridaje, grita excelencia." },
              { name: "Marcus Thorne", role: "Sommelier", text: "A wine list that respects tradition while embracing the avant-garde. The curation is absolutely world-class." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="testimonial-card glass" 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="quote-icon">“</div>
                <p className="testimonial-text">{item.text}</p>
                <div className="testimonial-author">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const Menu = () => {
  const { t, lang } = useLang();
  const [showWines, setShowWines] = useState(false);
  const menu = MENU_DATA[lang] as MenuData;

  return (
    <>
      <Navigation />
      <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '10rem' }}>
        <section className="container">
          <motion.h2 
            style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '1.5rem', color: '#fff' }}
            initial="hidden" animate="visible" variants={fadeUp}
          >
            <span className="gold-text">{t.menu_title}</span>
          </motion.h2>

          <motion.div 
            className="tasting-menu-card glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ margin: '0 auto 6rem', padding: '3.5rem', maxWidth: '900px', textAlign: 'center', border: '1px solid var(--primary)', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '10px', textTransform: 'uppercase' }}>Exclusive</div>
            <span style={{ color: 'var(--primary)', letterSpacing: '6px', textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 600 }}>{t.tasting_menu_subtitle}</span>
            <h3 style={{ fontSize: '3rem', color: '#fff', margin: '1rem 0', fontFamily: 'serif', fontStyle: 'italic' }}>{t.tasting_menu_title}</h3>
            <p style={{ color: '#aaa', maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.1rem', lineHeight: '1.8' }}>{t.tasting_menu_desc}</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', fontWeight: 'bold', borderTop: '1px solid rgba(201, 160, 80, 0.2)', paddingTop: '2rem' }}>
              <div className="gold-text" style={{ fontSize: '1.2rem' }}>${t.tasting_menu_price}</div>
              <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }}></div>
              <div style={{ color: '#fff', fontSize: '1rem', letterSpacing: '1px' }}>{t.tasting_menu_pairing}</div>
            </div>
          </motion.div>

          <div className="trifold-menu">
            <div className="menu-col">
              <div style={{ paddingBottom: '2rem' }}>
                <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: '#c9a050', borderBottom: '2px solid #c9a050', display: 'inline-block', marginBottom: '5px' }}>
                  - Menu -
                </h3>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase' }}>RESTAURANT</h2>
              </div>
              <div className="column-header">
                <div className="menu-circle-img">
                  <img src={menu.starters[0]?.image} alt="Starters" />
                </div>
                <div className="category-title">{t.menu_starters}</div>
              </div>
              <div className="menu-items">
                {menu.starters.map((item) => (
                  <div className="menu-list-item" key={item.id} style={{ alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '55px', height: '55px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)', marginRight: '15px', flexShrink: 0 }} />
                    <div className="menu-item-info">
                      <div className="menu-item-name">{item.name}</div>
                      <div className="menu-item-desc">{item.desc}</div>
                    </div>
                    <div className="menu-price-bubble">${item.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="menu-col dark-col">
              <div className="column-header">
                <div className="menu-circle-img">
                  <img src={menu.mains[0]?.image} alt="Mains" />
                </div>
                <div className="category-title">{t.menu_mains}</div>
              </div>
              <div className="menu-items">
                {menu.mains.map((item) => (
                  <div className="menu-list-item" key={item.id} style={{ alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '55px', height: '55px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)', marginRight: '15px', flexShrink: 0 }} />
                    <div className="menu-item-info">
                      <div className="menu-item-name">{item.name}</div>
                      <div className="menu-item-desc">{item.desc}</div>
                      {item.pairing && (
                        <div className="pairing-badge">
                          🍷 {t.wine_pairing}: {item.pairing}
                        </div>
                      )}
                    </div>
                    <div className="menu-price-bubble">${item.price}</div>
                  </div>
                ))}
              </div>
              <h4 style={{ textAlign: 'center', color: 'var(--primary)', fontStyle: 'italic', fontSize: '1.2rem', margin: '2rem 0 1rem 0', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(201, 160, 160, 0.3)' }}>--- {t.menu_drinks} ---</h4>
              <div className="menu-items">
                {menu.drinks.map((item) => (
                  <div className="menu-list-item" style={{ marginBottom: '0.5rem', paddingBottom: '0.5rem', alignItems: 'center' }} key={item.id}>
                    <img src={item.image} alt={item.name} style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(201, 160, 160, 0.5)', marginRight: '10px', flexShrink: 0 }} />
                    <div className="menu-item-info">
                      <div className="menu-item-desc" style={{ color: '#fff', fontSize: '0.85rem' }}>{item.name}</div>
                    </div>
                    <div className="menu-price-bubble" style={{ width: '30px', height: '30px', fontSize: '0.8rem' }}>${item.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="menu-col">
              <div className="column-header">
                <div className="menu-circle-img">
                  <img src={menu.desserts[0]?.image} alt="Desserts" />
                </div>
                <div className="category-title">{t.menu_desserts}</div>
              </div>
              <div className="menu-items">
                {menu.desserts.map((item) => (
                  <div className="menu-list-item" key={item.id} style={{ alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '55px', height: '55px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)', marginRight: '15px', flexShrink: 0 }} />
                    <div className="menu-item-info">
                      <div className="menu-item-name">{item.name}</div>
                      <div className="menu-item-desc">{item.desc}</div>
                    </div>
                    <div className="menu-price-bubble">${item.price}</div>
                  </div>
                ))}
              </div>

              <div className="column-header" style={{ marginTop: '2rem', cursor: 'pointer' }} onClick={() => setShowWines(!showWines)}>
                <div className="category-title" style={{ fontSize: '1.2rem', padding: '5px 20px', background: showWines ? 'var(--primary)' : '#fff', color: showWines ? '#fff' : '#1a1a1a', border: '2px solid var(--primary)', transition: 'all 0.3s ease' }}>
                  {t.menu_wines} {showWines ? '▲' : '▼'}
                </div>
              </div>

              <AnimatePresence>
                {showWines && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                    {menu.wines.map((item) => (
                      <div className="menu-list-item" key={item.id} style={{ marginTop: '1rem', alignItems: 'center' }}>
                        <img src={item.image} alt={item.name} style={{ width: '55px', height: '55px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)', marginRight: '15px', flexShrink: 0 }} />
                        <div className="menu-item-info">
                          <div className="menu-item-name">{item.name}</div>
                          <div className="menu-item-desc">{item.desc}</div>
                        </div>
                        <div className="menu-price-bubble" style={{ fontSize: '0.8rem' }}>${item.price}</div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const Gallery = () => {
  const { t } = useLang();
  return (
    <>
      <Navigation />
      <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '10rem' }}>
        <section className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <span style={{ color: 'var(--primary)', letterSpacing: '8px', textTransform: 'uppercase', fontSize: '0.8rem' }}>{t.gallery_title}</span>
            <h2 style={{ fontSize: '4rem', marginTop: '1rem', color: '#fff' }}><span className="gold-text">{t.gallery_subtitle}</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(2, 300px)', gap: '1.5rem' }}>
            <motion.div className="gallery-item glass" style={{ gridColumn: 'span 8', gridRow: 'span 2', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
              <video src="/promocional.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
            <motion.div className="gallery-item glass" style={{ gridColumn: 'span 4', borderRadius: '20px', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
            <motion.div className="gallery-item glass" style={{ gridColumn: 'span 4', borderRadius: '20px', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
            <motion.div className="gallery-item glass" style={{ gridColumn: 'span 4', borderRadius: '20px', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
            <motion.div className="gallery-item glass" style={{ gridColumn: 'span 8', borderRadius: '20px', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

const Reservations = () => {
  const { t } = useLang();
  const [formData, setFormData] = useState({ name: '', email: '', date: '', time: '20:00', guests: '2' });
  const [status, setStatus] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(t.form_processing);
    try {
      const response = await fetch('/api/reserve', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', date: '', time: '20:00', guests: '2' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <>
      <Navigation />
      <div style={{ background: '#000', minHeight: '100vh', paddingTop: '10rem' }}>
        <section className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: '#fff' }}>{t.reserve_title}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{t.reserve_desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff' }}><MapPin className="gold-text" /> <span>123 Avenida del Restaurante</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff' }}><Phone className="gold-text" /> <span>+12 345 678 90</span></div>
              </div>
            </motion.div>
            <motion.form className="reservation-form glass" onSubmit={handleSubmit} initial="hidden" animate="visible" variants={fadeUp}>
              <div className="form-group"><label>{t.form_name}</label><input type="text" name="name" required value={formData.name} onChange={handleInputChange} /></div>
              <div className="form-group"><label>Email</label><input type="email" name="email" required value={formData.email} onChange={handleInputChange} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group"><label>{t.form_date}</label><input type="date" name="date" required value={formData.date} onChange={handleInputChange} /></div>
                <div className="form-group"><label>{t.form_guests}</label><select name="guests" value={formData.guests} onChange={handleInputChange}>{[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {t.form_ppl}</option>)}</select></div>
              </div>
              <button type="submit" style={{ width: '100%', marginTop: '1rem' }} className="btn-outline">
                {status === t.form_processing ? t.form_processing : t.form_submit}
              </button>
              {status === 'success' && <div style={{ color: '#4caf50', marginTop: '1rem', textAlign: 'center' }}>{t.form_success}</div>}
            </motion.form>
          </div>
        </section>
      </div>
    </>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useLang();
  return (
    <>
      {children}
      <footer className="expert-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">LUXE<span>BITE</span></Link>
              <p className="footer-desc">{t.footer_brand_desc}</p>
            </div>
            <div className="footer-links">
              <h4>{t.footer_explore}</h4>
              <ul><li><Link to="/">{t.footer_home}</Link></li><li><Link to="/menu">{t.nav_food}</Link></li><li><Link to="/gallery">{t.nav_gallery}</Link></li><li><Link to="/reservations">{t.nav_contact}</Link></li></ul>
            </div>
            <div className="footer-map-zone">
              <div className="footer-map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.846430372132!2d-64.1952226!3d-31.416805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDI1JzAwLjUiUyA2NMKwMTEnNDIuOCJX!5e0!3m2!1sen!2sar!4v1700000000000!5m2!1sen!2sar" width="100%" height="150" style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} loading="lazy"></iframe>
              </div>
            </div>
            <div className="footer-concierge"><h4>CONCIERGE</h4><ul><li><Clock size={16} className="gold-text" /><div><strong>{t.footer_mon_thu}</strong><span>18:00 - 23:30</span></div></li><li><Clock size={16} className="gold-text" /><div><strong>{t.footer_fri_sun}</strong><span>19:00 - 01:00</span></div></li></ul></div>
          </div>
        </div>
      </footer>
      <Link to="/reservations" className="floating-reserve-btn">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="fab-content">
          <span className="fab-text">{t.btn_reserve_now}</span>
          <div className="fab-icon-container"><Clock size={20} /></div>
        </motion.div>
      </Link>
    </>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const toggleLang = () => setLang(l => (l === 'en' ? 'es' : 'en'));
  return (
    <Router>
      <LangContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
        <div className="luxe-app">
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/menu" element={<Layout><Menu /></Layout>} />
            <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
            <Route path="/reservations" element={<Layout><Reservations /></Layout>} />
          </Routes>
        </div>
      </LangContext.Provider>
    </Router>
  );
};

export default App;
