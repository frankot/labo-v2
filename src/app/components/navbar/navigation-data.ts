export interface NavigationItem {
  title: string;
  href: string;
  description: string;
}

export interface DropdownItem {
  href: string;
  label: string;
  description: string;
  image?: string;
  category?: string;
  key?: string;
}

export interface NavLink {
  href?: string;
  label: string;
  items?: DropdownItem[];
  hasClickableHeader?: boolean;
}

export const ofertaComponents: NavigationItem[] = [
  {
    title: "Projektowanie",
    href: "/oferta/projektowanie",
    description: "Kompleksowe projektowanie scenografii.",
  },
  {
    title: "Produkcja",
    href: "/oferta/produkcja",
    description: "Produkcja elementów scenografii na zamówienie.",
  },
  {
    title: "Montaż",
    href: "/oferta/montaz",
    description: "Profesjonalny montaż na planie.",
  },
  {
    title: "Wynajem",
    href: "/oferta/wynajem",
    description: "Wynajem gotowych elementów i rekwizytów.",
  },
];

export const realizacjeComponents: NavigationItem[] = [
  {
    title: "Scenografia filmowa",
    href: "/realizacje/film",
    description: "Projekty do filmów fabularnych i krótkometrażowych.",
  },
  {
    title: "Scenografia teatralna",
    href: "/realizacje/teatr",
    description: "Oprawa wizualna spektakli teatralnych.",
  },
  {
    title: "Eventy",
    href: "/realizacje/eventy",
    description: "Scenografie dla wydarzeń firmowych i kulturalnych.",
  },
  {
    title: "Wystawy",
    href: "/realizacje/wystawy",
    description: "Projektowanie i realizacja przestrzeni wystawienniczych.",
  },
];

// Import realizacje data for dropdown
import { type Realizacja } from "../../../lib/realizacje-data";

// Static fallback for navigation dropdown (to avoid async loading in navbar)
const staticRealizacjeForNav: Realizacja[] = [
  {
    id: "corab-intersolar-2024",
    title: "CORAB – Stoisko targowe | Intersolar Europe, Monachium 2024",
    description: "Nowoczesne stoisko targowe dla lidera branży fotowoltaicznej na targach Intersolar Europe 2024.",
    client: "CORAB S.A.",
    year: "2024",
    category: "Stoisko targowe",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    location: "Intersolar Europe 2024, Messe München, Monachium",
    area: "ok. 80 m²",
    scope: "Koncepcja kreatywna, projekt 3D, opracowanie techniczne, produkcja, transport, montaż, wsparcie techniczne na miejscu",
    services: ["Koncepcja kreatywna", "Projekt 3D", "Opracowanie techniczne"],
    fullDescription: "Zaprojektowane i wykonane stoisko targowe dla lidera branży fotowoltaicznej.",
    slug: "corab-intersolar-2024",
    video: "",
    gallery: [],
  },
  {
    id: "dom-konstancin",
    title: "Dom jednorodzinny w Konstancinie-Jeziornie",
    description: "Projekt wnętrz i aranżacja ogrodu domu jednorodzinnego.",
    client: "Klient prywatny",
    year: "2023",
    category: "Dom",
    image: "/scene.jpg",
    location: "Konstancin-Jeziorna",
    area: "200 m²",
    scope: "Projekt wnętrz, aranżacja ogrodu",
    services: ["Projekt koncepcyjny", "Projekt wykonawczy"],
    fullDescription: "Projekt domu jednorodzinnego w Konstancinie-Jeziornie.",
    slug: "dom-konstancin",
    video: "",
    gallery: [],
  },
  {
    id: "biuro-srodmiescie",
    title: "Biuro w Śródmieściu",
    description: "Nowoczesne biuro korporacyjne z przestrzeniami open space",
    client: "TechCorp Sp. z o.o.",
    year: "2024",
    category: "Biuro",
    image: "/scene.jpg",
    location: "Warszawa, Śródmieście",
    area: "350 m²",
    scope: "Projekt wnętrz biurowych",
    services: ["Projekt koncepcyjny", "Projekt wykonawczy"],
    fullDescription: "Projekt nowoczesnego biura korporacyjnego w centrum Warszawy.",
    slug: "biuro-srodmiescie",
    video: "",
    gallery: [],
  },
  {
    id: "restauracja-krakow",
    title: "Restauracja w Krakowie",
    description: "Nowoczesny design restauracji z elementami industrialnymi i drewnianymi akcentami.",
    client: "Bistro Verde",
    year: "2024",
    category: "Gastronomia",
    image: "/scene.jpg",
    location: "Kraków, Stare Miasto",
    area: "180 m²",
    scope: "Projekt wnętrz restauracji",
    services: ["Projekt koncepcyjny", "Wizualizacje 3D"],
    fullDescription: "Projekt restauracji w zabytkowej kamienicy w Krakowie.",
    slug: "restauracja-krakow",
    video: "",
    gallery: [],
  },
  {
    id: "hotel-zakopane",
    title: "Hotel boutique w Zakopanem",
    description: "Luksusowy hotel górski z tradycyjnymi elementami góralskimi w nowoczesnym ujęciu.",
    client: "Mountain Resort",
    year: "2023",
    category: "Hotel",
    image: "/scene.jpg",
    location: "Zakopane",
    area: "1200 m²",
    scope: "Projekt wnętrz hotelowych",
    services: ["Projekt koncepcyjny", "Projekt wykonawczy", "Nadzór autorski"],
    fullDescription: "Projekt luksusowego hotelu w stylu góralskim.",
    slug: "hotel-zakopane",
    video: "",
    gallery: [],
  },
  {
    id: "sklep-warszawa",
    title: "Flagship store w Warszawie",
    description: "Nowoczesny showroom marki fashion z minimalistycznym designem i smart technologiami.",
    client: "Fashion Brand",
    year: "2024",
    category: "Retail",
    image: "/scene.jpg",
    location: "Warszawa, Nowy Świat",
    area: "250 m²",
    scope: "Projekt sklepu flagship",
    services: ["Projekt koncepcyjny", "Projekt wykonawczy"],
    fullDescription: "Projekt flagship store dla marki modowej.",
    slug: "sklep-warszawa",
    video: "",
    gallery: [],
  },
  {
    id: "klinika-gdansk",
    title: "Prywatna klinika w Gdańsku",
    description: "Nowoczesna klinika medyczna z przyjaznym i relaksującym wnętrzem dla pacjentów.",
    client: "MedCenter Pro",
    year: "2023",
    category: "Medycyna",
    image: "/scene.jpg",
    location: "Gdańsk, Śródmieście",
    area: "400 m²",
    scope: "Projekt wnętrz klinicznych",
    services: ["Projekt koncepcyjny", "Projekt wykonawczy"],
    fullDescription: "Projekt nowoczesnej kliniki prywatnej w Gdańsku.",
    slug: "klinika-gdansk",
    video: "",
    gallery: [],
  },
  {
    id: "galeria-poznan",
    title: "Galeria sztuki w Poznaniu",
    description: "Przestrzeń wystawiennicza z elastycznym układem i profesjonalnym oświetleniem.",
    client: "Art Gallery Modern",
    year: "2024",
    category: "Kultura",
    image: "/scene.jpg",
    location: "Poznań, Stary Rynek",
    area: "300 m²",
    scope: "Projekt galerii sztuki",
    services: ["Projekt koncepcyjny", "Wizualizacje 3D"],
    fullDescription: "Projekt nowoczesnej galerii sztuki w zabytkowej kamienicy.",
    slug: "galeria-poznan",
    video: "",
    gallery: [],
  },
  {
    id: "coworking-wroclaw",
    title: "Przestrzeń coworkingowa we Wrocławiu",
    description: "Elastyczna przestrzeń do pracy z strefami open space, salami spotkań i relaksu.",
    client: "WorkSpace Pro",
    year: "2024",
    category: "Biuro",
    image: "/scene.jpg",
    location: "Wrocław, Centrum",
    area: "600 m²",
    scope: "Projekt przestrzeni coworkingowej",
    services: ["Projekt koncepcyjny", "Projekt wykonawczy"],
    fullDescription: "Projekt nowoczesnej przestrzeni coworkingowej we Wrocławiu.",
    slug: "coworking-wroclaw",
    video: "",
    gallery: [],
  }
];

// Create dropdown items from realizacje data (all 9 for 3x3 grid)
export const realizacjeDropdownItems: DropdownItem[] = staticRealizacjeForNav
  .map((realizacja: Realizacja) => ({
    href: `/realizacje/${realizacja.id}`,
    label: realizacja.title,
    description: realizacja.description,
    category: realizacja.category,
    // Remove image property to display without photos
  }));

export const contactComponents: NavigationItem[] = [
  {
    title: "Email",
    href: "mailto:biuro@labopracownia.com",
    description: "biuro@labopracownia.com",
  },
  {
    title: "Godziny pracy",
    href: "/#contact",
    description: "Pn-Pt: 9:00-17:00",
  },
  {
    title: "Adres",
    href: "/#contact",
    description: "ul. Kaczorowa 26B, 03-046 Warszawa",
  },
];

// Services dropdown items (short version of 3 main categories)
export const servicesDropdownItems: DropdownItem[] = [
  {
    href: "/#services",
    label: "Koncepcja i projekty",
    description:
      "Kompleksowe koncepcje wizualne 3D, layouty, projektowanie elementów na podstawie briefu",
    key: "services-concept",
  },
  {
    href: "/#services",
    label: "Produkcja i wykonanie",
    description:
      "Własny park maszynowy: CNC, stolarnia, druk 3D, lakiernia, ślusarnia",
    key: "services-production",
  },
  {
    href: "/#services",
    label: "Obsługa i wsparcie",
    description:
      "Doradztwo techniczne, koordynacja projektów, montaż i logistyka",
    key: "services-support",
  },
];

export const navLinks: NavLink[] = [
  { href: "/#about", label: "O nas" },
  {
    label: "Usługi",
    href: "/#services",
    hasClickableHeader: true,
    items: servicesDropdownItems,
  },
  {
    label: "Realizacje",
    href: "/realizacje",
    hasClickableHeader: true,
    items: realizacjeDropdownItems,
  },
  { href: "/park-maszyn", label: "Park maszynowy" },
  { href: "/#team", label: "Ekipa" },
  { href: "/#contact", label: "Kontakt" },
];
