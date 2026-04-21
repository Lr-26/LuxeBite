import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Instagram, Facebook, Clock, Award, Star, Menu as MenuIcon, X } from 'lucide-react';
import './index.css';

type Language = 'en' | 'es';

const translations = {
  en: {
    nav_food: "The Menu",
    nav_gallery: "Gallery",
    nav_contact: "Contact",
    hero_yes: "Awaken",
    hero_we_are: "your",
    hero_open: "senses.",
    hero_desc: "A haute couture dining experience. Redefining modern cuisine with world-class ingredients and avant-garde techniques.",
    btn_start: "Experience",
    delivery: "#LUXURYGASTRONOMY",
    menu_title: "Curated Culinary Selection",
    menu_starters: "Starters & Crudités",
    menu_mains: "Principal Courses",
    menu_desserts: "Exquisite Finishes",
    menu_drinks: "Signature Mixology",
    menu_wines: "Sommelier's Vault",
    gallery_title: "A Visual Journey",
    gallery_subtitle: "The Gallery",
    reserve_title: "Secure Your Table",
    reserve_desc: "Join us for an unforgettable evening. Reservations are highly recommended for the full experience.",
    form_name: "Full Name",
    form_date: "Date",
    form_guests: "Guests",
    form_ppl: "People",
    form_submit: "Confirm Reservation",
    form_processing: "Processing...",
    form_success: "Reservation confirmed! We wait for you.",
    footer_brand_desc: "Elite gastronomic platform. Redefining modern cuisine with world-class ingredients.",
    footer_explore: "Explore",
    footer_home: "Home",
    footer_contact: "Contact",
    footer_hours: "Hours",
    footer_mon_thu: "Monday - Thursday",
    footer_fri_sun: "Friday - Sunday",
    footer_dress_code: "Dress Code",
    footer_dress_code_val: "Black Tie / Formal",
    btn_reserve_now: "Reserve",
    testimonial_title: "The Critics' Voice",
    wine_pairing: "Sommelier Selection",
    tasting_menu_title: "The Grand Opus",
    tasting_menu_subtitle: "The Ultimate Experience",
    tasting_menu_desc: "A 9-course journey through the deepest roots of tradition and the sharpest edges of innovation. Total immersion required.",
    tasting_menu_price: "310 per guest",
    tasting_menu_pairing: "Prestige Pairing +155"
  },
  es: {
    nav_food: "La Carta",
    nav_gallery: "Galería",
    nav_contact: "Contacto",
    hero_yes: "Despierta",
    hero_we_are: "tus",
    hero_open: "sentidos.",
    hero_desc: "Una experiencia gastronómica de alta costura. Redefiniendo la cocina moderna con ingredientes de clase mundial y técnicas de vanguardia.",
    btn_start: "Experimentar",
    delivery: "#GASTRONOMÍADEELECCIÓN",
    menu_title: "Selección Culinaria Curada",
    menu_starters: "Entradas y Crudités",
    menu_mains: "Platos Principales",
    menu_desserts: "Finales Exquisitos",
    menu_drinks: "Mixología de Autor",
    menu_wines: "Cava del Sommelier",
    gallery_title: "Un Viaje Visual",
    gallery_subtitle: "La Galería",
    reserve_title: "Asegure Su Mesa",
    reserve_desc: "Únase a nosotros para una velada inolvidable. Se recomienda reservar para disfrutar la experiencia completa.",
    form_name: "Nombre Completo",
    form_date: "Fecha",
    form_guests: "Personas",
    form_ppl: "Personas",
    form_submit: "Confirmar Reserva",
    form_processing: "Procesando...",
    form_success: "¡Reserva confirmada! Le esperamos.",
    footer_brand_desc: "Plataforma gastronómica de élite. Redefiniendo la cocina moderna con ingredientes de clase mundial.",
    footer_explore: "Explorar",
    footer_home: "Inicio",
    footer_contact: "Contacto",
    footer_hours: "Horarios",
    footer_mon_thu: "Lunes - Jueves",
    footer_fri_sun: "Viernes - Domingo",
    footer_dress_code: "Código de Vestimenta",
    footer_dress_code_val: "Etiqueta / Formal",
    btn_reserve_now: "Reservar",
    testimonial_title: "La Voz de la Crítica",
    wine_pairing: "Selección del Sommelier",
    tasting_menu_title: "El Gran Opus",
    tasting_menu_subtitle: "La Experiencia Definitiva",
    tasting_menu_desc: "Un viaje de 9 pasos a través de las raíces más profundas de la tradición y los bordes más afilados de la innovación. Inmersión total requerida.",
    tasting_menu_price: "310 por cubierto",
    tasting_menu_pairing: "Maridaje Prestige +155"
  }
};

const LangContext = createContext<{lang: Language, toggleLang: () => void, t: typeof translations['en']}>({
  lang: 'en', toggleLang: () => {}, t: translations.en
});
const useLang = () => useContext(LangContext);

const MENU_DATA = {
  es: {
    starters: [
      { id: 1, name: 'Carpaccio de Res Wagyu A5', price: 42, desc: 'Láminas de mármol grado A5, perlas de trufa negra, emulsión de piñones tostados y escamas de sal Maldon.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80' },
      { id: 2, name: 'Tartar de Atún Bluefin Imperial', price: 38, desc: 'Corte artesanal a punta de cuchillo, aire de jengibre y soja envejecida 15 años, sobre aguacate al carbón.', image: 'https://images.unsplash.com/photo-1544124499-58ec50672e81?auto=format&fit=crop&w=800&q=80' },
      { id: 15, name: 'Ostras Guillardeau "Gold"', price: 55, desc: 'Media docena de ostras premium, granizado de champán rosado y perlas de caviar cítrico finger-lime.', image: 'https://images.unsplash.com/photo-1599081533966-2358fb88baaf?auto=format&fit=crop&w=800&q=80' },
      { id: 16, name: 'Vieiras en Costra de Oro 24k', price: 48, desc: 'Vieiras de profundidad selladas, crema de coliflor trufada y láminas de oro puro comestible.', image: 'https://images.unsplash.com/photo-1532639193859-bff50adb61ED?auto=format&fit=crop&w=800&q=80' },
      { id: 19, name: 'Foie Gras al Armagnac', price: 50, desc: 'Escalope de foie gras sellado, brioche de mantequilla noisette y chutney de higos macerados en licor.', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80' },
    ],
    mains: [
      { id: 3, name: 'Tomahawk Black Angus 60 Días', price: 185, desc: 'Maduración en seco propia, terminado en leña de encina. Maridado con sal de carbón volcánico.', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=800&q=80', pairing: 'Opus One 2018' },
      { id: 4, name: 'Bacalao Black Cod Miso-Real', price: 65, desc: 'Marinado 72 horas en miso blanco y sake, glaseado cítrico y brotes de rábano picante.', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80', pairing: 'Montrachet Grand Cru' },
      { id: 17, name: 'Risotto de Setas y Trufa Blanca', price: 58, desc: 'Arroz Acquerello reserva 7 años, sinfonía de setas silvestres y ralladura de trufa de Alba en mesa.', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80', pairing: 'Gaja Barbaresco' },
      { id: 18, name: 'Bogavante Blue en Mantequilla', price: 110, desc: 'Bogavante azul de Bretaña pochado a baja temperatura, reducción de sus propios jugos y perlas de hinojo.', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80', pairing: 'Krug Grande Cuvée' },
      { id: 20, name: 'Pato de Pekín "Luxe Master"', price: 85, desc: 'Pechuga de pato laqueada con miel de trufa, puré de calabaza especiado y reducción de Oporto vintage.', image: 'https://images.unsplash.com/photo-1518492104633-c3ed9e783c79?auto=format&fit=crop&w=800&q=80', pairing: 'Château Margaux' },
    ],
    desserts: [
      { id: 5, name: 'Órbita de Cacao y Oro', price: 35, desc: 'Esfera de chocolate al 90%, mousse de avellana del Piamonte y núcleo de caramelo salado fluído.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80' },
      { id: 21, name: 'Soufflé de Grand Marnier', price: 32, desc: 'Soufflé horneado al momento con licor Grand Marnier, salsa de naranja amarga y helado de vainilla.', image: 'https://images.unsplash.com/photo-1579954115563-e72bf1381629?auto=format&fit=crop&w=800&q=80' },
      { id: 11, name: 'Nube de Pistacho Siciliano', price: 30, desc: 'Bizcocho sifón de pistacho de Bronte, higos macerados en Oporto y helado de leche de cabra.', image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=800&q=80' },
    ],
    drinks: [
      { id: 7, name: 'Enigma Botanique', price: 28, desc: 'Cóctel de autor con ginebra de parcela, esencia de bergamota y humo de madera de cerezo.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80' },
      { id: 22, name: 'Negroni Smoked 12th', price: 26, desc: 'Mezcla clásica reposada 12 meses en barrica de roble francés, notas de naranja quemada.', image: 'https://images.unsplash.com/photo-1541301681456-19d76e687b1c?auto=format&fit=crop&w=800&q=80' },
    ],
    wines: [
      { id: 9, name: 'Dom Pérignon Plénitude 2', price: 1200, desc: 'La máxima expresión del champagne. Complejidad, precisión y longevidad absoluta.', image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80' },
      { id: 10, name: 'Château Pétrus Pomerol', price: 4500, desc: 'La joya de Burdeos. Un merlot inalcanzable con una profundidad y elegancia mística.', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80' },
      { id: 23, name: 'Vega Sicilia Único', price: 720, desc: 'Vino legendario español, notas de cedro, tabaco y una estructura aterciopelada perfecta.', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80' },
    ]
  },
  en: {
    starters: [
      { id: 1, name: 'Wagyu Beef Carpaccio A5', price: 42, desc: 'A5 grade marble slices, black truffle pearls, toasted pine nut emulsion and Maldon salt.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80' },
      { id: 2, name: 'Imperial Bluefin Tuna Tartare', price: 38, desc: 'Hand-cut by knife, ginger air and 15-year aged soy over charcoal-smoked avocado.', image: 'https://images.unsplash.com/photo-1544124499-58ec50672e81?auto=format&fit=crop&w=800&q=80' },
      { id: 15, name: 'Guillardeau Oysters "Gold"', price: 55, desc: 'Half a dozen premium oysters, pink champagne granita and citrus finger-lime pearls.', image: 'https://images.unsplash.com/photo-1599081533966-2358fb88baaf?auto=format&fit=crop&w=800&q=80' },
      { id: 16, name: '24k Gold Crusted Scallops', price: 48, desc: 'Seared deep sea scallops, truffled cauliflower cream and pure edible gold leaf.', image: 'https://images.unsplash.com/photo-1532639193859-bff50adb61ED?auto=format&fit=crop&w=800&q=80' },
    ],
    mains: [
      { id: 3, name: '60-Day Aged Black Angus Tomahawk', price: 185, desc: 'In-house dry aging, finished over holm oak firewood. Volcanic charcoal salt.', image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=800&q=80', pairing: 'Opus One 2018' },
      { id: 4, name: 'Royal Miso Black Cod', price: 65, desc: '72-hour marination in white miso and sake, citrus glaze and horseradish sprouts.', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80', pairing: 'Montrachet Grand Cru' },
      { id: 17, name: 'White Truffle & Mushroom Risotto', price: 58, desc: '7-year reserve Acquerello rice, wild mushroom symphony and Alba truffle shaved at table.', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80', pairing: 'Gaja Barbaresco' },
      { id: 18, name: 'Breton Blue Lobster', price: 110, desc: 'Low-temperature poached blue lobster, reduction of its own juices and fennel pearls.', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80', pairing: 'Krug Grande Cuvée' },
    ],
    desserts: [
      { id: 5, name: 'Gold & Cocoa Orbit', price: 35, desc: '90% dark chocolate sphere, Piedmont hazelnut mousse and fluid salted caramel core.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80' },
      { id: 21, name: 'Grand Marnier Soufflé', price: 32, desc: 'Made-to-order soufflé with Grand Marnier, bitter orange sauce and vanilla ice cream.', image: 'https://images.unsplash.com/photo-1579954115563-e72bf1381629?auto=format&fit=crop&w=800&q=80' },
    ],
    drinks: [
      { id: 7, name: 'Enigma Botanique', price: 28, desc: 'Signature cocktail with vintage gin, bergamot essence and cherry wood smoke.', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80' },
    ],
    wines: [
      { id: 9, name: 'Dom Pérignon Plénitude 2', price: 1200, desc: 'The ultimate champagne expression. Complexity, precision and absolute longevity.', image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80' },
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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  // Handle link click - closes the menu
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="luxe-header">
        <div className="logo-container">
          <Link to="/" onClick={closeMenu} style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem', fontWeight: '800', fontFamily: 'var(--font-bold)', letterSpacing: '4px', textTransform: 'uppercase', lineHeight: '1', zIndex: 101, display: 'block' }}>
            VIV<br/>AIA<br/><span style={{fontSize: '0.5rem', letterSpacing: '1px', fontWeight: '400'}}>RESTAURANT</span>
          </Link>
        </div>
        <nav className="nav-desktop" style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
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

        {/* Mobile Toggle Button */}
        <div className="nav-mobile-toggle" style={{ display: 'none', zIndex: 101, gap: '1rem', alignItems: 'center' }}>
          <button onClick={toggleLang} style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'transparent', color: '#fff', border: 'none', padding: 0 }}>
            {isOpen ? <X size={30} /> : <MenuIcon size={30} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
          >
            <Link to="/" onClick={closeMenu}>Inicio</Link>
            <Link to="/menu" onClick={closeMenu}>{t.nav_food}</Link>
            <Link to="/gallery" onClick={closeMenu}>{t.nav_gallery}</Link>
            <Link to="/reservations" onClick={closeMenu}>{t.nav_contact}</Link>
            
            <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
              <a href="#"><Instagram size={24} /></a>
              <a href="#"><Facebook size={24} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', justifyContent: 'flex-end' }}>
               <motion.div variants={fadeUp}>
                  <Link to="/menu" className="btn-outline" style={{ background: '#fff', color: '#000' }}>
                    {t.nav_food}
                  </Link>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <Link to="/reservations" className="btn-outline">
                    {t.btn_reserve_now}
                  </Link>
                </motion.div>
            </div>
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
            <Award className="gold-text" size={40} style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '3.5rem', color: '#fff' }}>{t.testimonial_title}</h2>
          </motion.div>
          <div className="testimonials-grid">
            {[
              { name: "Michelin Guide", role: "Special Commendation", text: "A breathtaking fusion of modern precision and soul-stirring flavor. LuxeBite is redefining the destination dining experience." },
              { name: "The World's 50 Best", role: "New Entry #12", text: "From the first bite of the Wagyu Carpaccio to the complex finale, it's clear we are in the presence of a new culinary titan." },
              { name: "Forbes Travel Guide", role: "5 Stars", text: "Unmatched service and an atmosphere that feels like a private sanctuary in the heart of the city. A true masterclass in luxury." }
            ].map((item, idx) => (
              <motion.div key={idx} className="testimonial-card glass" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.2 }}>
                <div className="quote-icon">“</div>
                <p className="testimonial-text">{item.text}</p>
                <div className="testimonial-author"><strong>{item.name}</strong><span>{item.role}</span></div>
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
  const [menu, setMenu] = useState<MenuData | null>(null);

  useEffect(() => {
    setMenu(MENU_DATA[lang] as MenuData);
  }, [lang]);


  if (!menu) return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000', color: '#fff' }}>
      <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        Cargando Experiencia Culinaria...
      </motion.div>
    </div>
  );

  return (
    <>
      <Navigation />
      <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '10rem', paddingBottom: '10rem' }}>
        <section className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{ textAlign: 'center', marginBottom: '6rem' }}>
             <Star className="gold-text" size={30} style={{ marginBottom: '1rem' }} />
             <h1 style={{ fontSize: '4.5rem', color: '#fff', letterSpacing: '-2px' }}>{t.menu_title}</h1>
             <div style={{ width: '80px', height: '2px', background: 'var(--primary)', margin: '2rem auto' }}></div>
          </motion.div>

          <motion.div 
            className="tasting-menu-card" 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            style={{ 
              margin: '0 auto 8rem', 
              padding: '4rem', 
              maxWidth: '1000px', 
              textAlign: 'center', 
              border: '1px solid rgba(201, 160, 80, 0.4)', 
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              borderRadius: '30px',
              position: 'relative', 
              overflow: 'hidden' 
            }}
          >
            <div style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '0.6rem', color: 'rgba(201, 160, 80, 0.5)', letterSpacing: '8px', textTransform: 'uppercase' }}>Signature Series</div>
            <motion.span 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }}
              style={{ color: 'var(--primary)', letterSpacing: '8px', textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 600 }}
            >
              {t.tasting_menu_subtitle}
            </motion.span>
            <h2 style={{ fontSize: '4rem', color: '#fff', margin: '1.5rem 0', fontFamily: 'serif', fontStyle: 'italic', letterSpacing: '-1px' }}>{t.tasting_menu_title}</h2>
            <p style={{ color: '#aaa', maxWidth: '700px', margin: '0 auto 3.5rem', fontSize: '1.1rem', lineHeight: '1.8' }}>{t.tasting_menu_desc}</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', borderTop: '1px solid rgba(201, 160, 80, 0.15)', paddingTop: '3rem' }}>
              <div className="gold-text" style={{ fontSize: '2rem', fontWeight: '800' }}>{t.tasting_menu_price}</div>
              <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }}></div>
              <div style={{ color: '#fff', fontSize: '1rem', letterSpacing: '1px' }}>{t.tasting_menu_pairing}</div>
            </div>
          </motion.div>

          <div className="trifold-menu">
            {/* Column 1: Starters */}
            <div className="menu-col glass" style={{ padding: '3rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 className="gold-text" style={{ fontSize: '1rem', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '3rem', textAlign: 'center' }}>{t.menu_starters}</h3>
              <div className="menu-items">
                {menu.starters.map((item) => (
                  <div className="menu-list-item" key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2.5rem' }}>
                    <div className="menu-item-info">
                      <div className="menu-item-name" style={{ fontSize: '1.3rem', color: '#fff' }}>{item.name}</div>
                      <div className="menu-item-desc" style={{ fontSize: '0.9rem', marginTop: '5px' }}>{item.desc}</div>
                    </div>
                    <div className="gold-text" style={{ fontWeight: '800', fontSize: '1.1rem' }}>{item.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Mains & Mixology (The Highlight) */}
            <div className="menu-col glass dark-col" style={{ padding: '3rem', background: '#0a0a0a', border: '1px solid var(--primary)', transform: 'scale(1.05)', zIndex: 10 }}>
               <h3 className="gold-text" style={{ fontSize: '1rem', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '3rem', textAlign: 'center' }}>{t.menu_mains}</h3>
               <div className="menu-items">
                {menu.mains.map((item) => (
                  <div className="menu-list-item" key={item.id} style={{ borderBottom: '1px solid rgba(201, 160, 80, 0.1)', paddingBottom: '2.5rem' }}>
                    <div className="menu-item-info">
                      <div className="menu-item-name" style={{ fontSize: '1.4rem', color: '#fff' }}>{item.name}</div>
                      <div className="menu-item-desc" style={{ fontSize: '0.9rem', color: '#999', marginTop: '8px' }}>{item.desc}</div>
                      {item.pairing && (
                        <div style={{ color: 'var(--primary)', fontSize: '0.75rem', marginTop: '12px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: '600' }}>
                          ◈ {t.wine_pairing}: {item.pairing}
                        </div>
                      )}
                    </div>
                    <div className="gold-text" style={{ fontWeight: '900', fontSize: '1.2rem' }}>{item.price}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '4rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3rem' }}>
                 <h4 className="gold-text" style={{ fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '2rem' }}>{t.menu_drinks}</h4>
                 {menu.drinks.map(drink => (
                   <div key={drink.id} style={{ marginBottom: '1.5rem' }}>
                      <div style={{ color: '#fff', fontSize: '1rem' }}>{drink.name} <span style={{ color: 'var(--primary)' }}>—</span> {drink.price}</div>
                      <div style={{ color: '#666', fontSize: '0.75rem', fontStyle: 'italic' }}>{drink.desc}</div>
                   </div>
                 ))}
              </div>
            </div>

            {/* Column 3: Desserts & Cava */}
            <div className="menu-col glass" style={{ padding: '3rem', border: '1px solid rgba(255,255,255,0.05)' }}>
               <h3 className="gold-text" style={{ fontSize: '1rem', letterSpacing: '5px', textTransform: 'uppercase', marginBottom: '3rem', textAlign: 'center' }}>{t.menu_desserts}</h3>
               <div className="menu-items">
                {menu.desserts.map((item) => (
                  <div className="menu-list-item" key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2.5rem' }}>
                    <div className="menu-item-info">
                      <div className="menu-item-name" style={{ fontSize: '1.2rem', color: '#fff' }}>{item.name}</div>
                      <div className="menu-item-desc" style={{ fontSize: '0.85rem' }}>{item.desc}</div>
                    </div>
                    <div className="gold-text" style={{ fontWeight: '800' }}>{item.price}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                 <button onClick={() => setShowWines(!showWines)} style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '15px 40px', borderRadius: '0', letterSpacing: '4px', fontSize: '0.7rem' }}>
                    {t.menu_wines} {showWines ? '[-]' : '[+]'}
                 </button>
                 <AnimatePresence>
                    {showWines && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginTop: '3rem' }}>
                         {menu.wines.map(wine => (
                           <div key={wine.id} style={{ marginBottom: '2rem', textAlign: 'left', borderLeft: '2px solid var(--primary)', paddingLeft: '1.5rem' }}>
                              <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold' }}>{wine.name}</div>
                              <div style={{ color: '#666', fontSize: '0.8rem', margin: '5px 0' }}>{wine.desc}</div>
                              <div className="gold-text" style={{ fontWeight: '900' }}>$ {wine.price}</div>
                           </div>
                         ))}
                      </motion.div>
                    )}
                 </AnimatePresence>
              </div>
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
              <Award className="gold-text" size={50} style={{ marginBottom: '2rem' }} />
              <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: '#fff' }}>{t.reserve_title}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.8' }}>{t.reserve_desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff' }}><MapPin className="gold-text" /> <span>Avenida de las Luces 777, Luxury District</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff' }}><Phone className="gold-text" /> <span>+1 800 LUXE BITE</span></div>
              </div>
            </motion.div>
            <motion.form className="reservation-form glass" onSubmit={handleSubmit} initial="hidden" animate="visible" variants={fadeUp} style={{ padding: '4rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="form-group"><label>{t.form_name}</label><input type="text" name="name" required value={formData.name} onChange={handleInputChange} style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }} /></div>
              <div className="form-group"><label>Email</label><input type="email" name="email" required value={formData.email} onChange={handleInputChange} style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="form-group"><label>{t.form_date}</label><input type="date" name="date" required value={formData.date} onChange={handleInputChange} /></div>
                <div className="form-group"><label>{t.form_guests}</label><select name="guests" value={formData.guests} onChange={handleInputChange}>{[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {t.form_ppl}</option>)}</select></div>
              </div>
              <button type="submit" style={{ width: '100%', marginTop: '2rem', background: 'var(--primary)', color: '#000', borderRadius: '0' }} className="btn-outline">
                {status === t.form_processing ? t.form_processing : t.form_submit}
              </button>
              {status === 'success' && <div style={{ color: '#4caf50', marginTop: '2rem', textAlign: 'center', fontWeight: 'bold' }}>{t.form_success}</div>}
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
      <footer className="expert-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '120px 0 60px' }}>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="footer-logo" style={{ letterSpacing: '10px' }}>LUXE<span>BITE</span></Link>
              <p className="footer-desc" style={{ maxWidth: '300px' }}>{t.footer_brand_desc}</p>
            </div>
            <div className="footer-links">
              <h4 style={{ letterSpacing: '4px' }}>{t.footer_explore}</h4>
              <ul style={{ marginTop: '2rem' }}><li><Link to="/">{t.footer_home}</Link></li><li><Link to="/menu">{t.nav_food}</Link></li><li><Link to="/gallery">{t.nav_gallery}</Link></li><li><Link to="/reservations">{t.nav_contact}</Link></li></ul>
            </div>
            <div className="footer-concierge" style={{ gridColumn: 'span 2' }}>
               <h4 style={{ letterSpacing: '4px' }}>CONCIERGE</h4>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2rem' }}>
                  <ul><li><Clock size={16} className="gold-text" /><div><strong>{t.footer_mon_thu}</strong><span>18:00 - 23:30</span></div></li><li><Clock size={16} className="gold-text" /><div><strong>{t.footer_fri_sun}</strong><span>19:00 - 01:00</span></div></li></ul>
                  <ul><li><Award size={16} className="gold-text" /><div><strong>{t.footer_dress_code}</strong><span>{t.footer_dress_code_val}</span></div></li></ul>
               </div>
            </div>
          </div>
          <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', color: '#444', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            <div>© 2026 LUXEBITE GLOBAL. ALL RIGHTS RESERVED.</div>
            <div style={{ display: 'flex', gap: '2rem' }}><span>Privacy</span><span>Terms</span></div>
          </div>
        </div>
      </footer>
      <Link to="/reservations" className="floating-reserve-btn" style={{ right: '40px', bottom: '40px' }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="fab-content" style={{ padding: '15px 35px' }}>
          <span className="fab-text" style={{ fontSize: '0.8rem' }}>{t.btn_reserve_now}</span>
          <div className="fab-icon-container" style={{ background: '#000', color: 'var(--primary)' }}><Clock size={18} /></div>
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
