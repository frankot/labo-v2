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
import { realizacje, type Realizacja } from "../../../lib/realizacje-data";

// Create dropdown items from realizacje data (take first 9 for 3x3 grid)
export const realizacjeDropdownItems: DropdownItem[] = realizacje
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
