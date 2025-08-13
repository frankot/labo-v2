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
  }
];

// Create dropdown items from realizacje data (take first 9 for 3x3 grid)
export const realizacjeDropdownItems: DropdownItem[] = staticRealizacjeForNav
  .slice(0, 9)
  .map((realizacja: Realizacja) => ({
    href: `/realizacje/${realizacja.id}`,
    label: realizacja.title,
    description: realizacja.description,
    image: realizacja.image,
    category: realizacja.category,
  }));

export const contactComponents: NavigationItem[] = [
  {
    title: "Email",
    href: "mailto:labo@labo.com",
    description: "labo@labo.com",
  },
  {
    title: "Telefon",
    href: "tel:+48123456789",
    description: "+48 123 456 789",
  },
  {
    title: "Adres",
    href: "/contact",
    description: "ul. Przykładowa 123, 00-000 Warszawa",
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
