export interface NavigationItem {
  title: string;
  href: string;
  description: string;
}

export interface DropdownItem {
  href: string;
  label: string;
  description: string;
}

export interface NavLink {
  href?: string;
  label: string;
  items?: DropdownItem[];
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

export const navLinks: NavLink[] = [
  { href: "/about", label: "O nas" },
  {
    label: "Oferta",
    items: ofertaComponents.map((item) => ({
      href: item.href,
      label: item.title,
      description: item.description,
    })),
  },
  {
    label: "Realizacje",
    href: "/realizacje",
    items: realizacjeComponents.map((item) => ({
      href: item.href,
      label: item.title,
      description: item.description,
    })),
  },
  { href: "/park-maszyn", label: "Park maszynowy" },
  { href: "/ekipa", label: "Ekipa" },
  {
    label: "Kontakt",
    items: contactComponents.map((item) => ({
      href: item.href,
      label: item.title,
      description: item.description,
    })),
  },
];
