export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  company: string;
  date: string;
  video: string;
  defaultPos: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  mediaSize: number;
  borderThickness: number;
  borderSize: number;
  videoSrc?: string;
  imageSrc?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Company Thing",
    description: "Creative concept and technical production",
    company: "CORAB S.A.",
    date: "2024",
    video:
      "https://static.cdn-luma.com/files/981e483f71aa764b/Company%20Thing%20Exported.mp4",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
  },
  {
    id: "2",
    title: "WebGL Experience",
    description: "Interactive 3D showcase",
    company: "Tech Client",
    date: "2024",
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/WebGL%20Exported%20(1).mp4",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
  },
  {
    id: "3",
    title: "Jitter Animation",
    description: "Motion graphics and animation",
    company: "Creative Studio",
    date: "2024",
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/Jitter%20Exported%20Poster.mp4",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
  },
  {
    id: "4",
    title: "Web Video Production",
    description: "Video content for digital platforms",
    company: "Media Agency",
    date: "2024",
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/Exported%20Web%20Video.mp4",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
  },
  {
    id: "5",
    title: "Logo Animation",
    description: "Brand identity in motion",
    company: "Brand Studio",
    date: "2024",
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/Logo%20Exported.mp4",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
  },
  {
    id: "6",
    title: "Motion Graphics",
    description: "Animated visual storytelling",
    company: "Animation House",
    date: "2024",
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/Animation%20Exported%20(4).mp4",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
  },
  {
    id: "7",
    title: "Illustration Work",
    description: "Digital illustration and design",
    company: "Design Collective",
    date: "2024",
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/Illustration%20Exported%20(1).mp4",
    defaultPos: { x: 0, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
  },
  {
    id: "8",
    title: "Art Direction",
    description: "Creative direction and visual strategy",
    company: "Creative Agency",
    date: "2024",
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/Art%20Direction%20Exported.mp4",
    defaultPos: { x: 4, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
  },
  {
    id: "9",
    title: "Product Showcase",
    description: "Product video and visualization",
    company: "Product Co.",
    date: "2024",
    video:
      "https://static.cdn-luma.com/files/58ab7363888153e3/Product%20Video.mp4",
    defaultPos: { x: 8, y: 8, w: 4, h: 4 },
    mediaSize: 1,
    borderThickness: 0,
    borderSize: 80,
  },
];

// Realizacje interface for project pages
export interface Realizacja {
  id: string;
  title: string;
  description: string;
  client: string;
  year: number;
  category: string;
  image: string;
  location: string;
  area: string;
  scope: string;
  services: string[];
  fullDescription: string;
  gallery: string[];
}

// Sample realizacje data - replace with your actual data
export const realizacje: Realizacja[] = [
  {
    id: "mieszkanie-mokotow",
    title: "Mieszkanie na Mokotowie",
    description:
      "Nowoczesne mieszkanie w centrum Warszawy z minimalistycznym designem",
    client: "Prywatny inwestor",
    year: 2024,
    category: "Mieszkanie",
    image: "/scene.jpg",
    location: "Warszawa, Mokotów",
    area: "85 m²",
    scope: "Projekt wnętrz, nadzór",
    services: ["Projekt koncepcyjny", "Projekt wykonawczy", "Nadzór autorski"],
    fullDescription:
      "Kompleksowy projekt wnętrza mieszkania na Mokotowie. Zastosowaliśmy nowoczesne rozwiązania przestrzenne, łącząc funkcjonalność z estetyką. Projekt obejmuje otwarty plan salonu z kuchnią, sypialnię z garderobą oraz łazienkę z wanną i prysznicem.",
    gallery: ["/scene.jpg", "/scene.jpg", "/scene.jpg", "/scene.jpg"],
  },
  {
    id: "dom-konstancin",
    title: "Dom w Konstancinie",
    description: "Elegancki dom jednorodzinny o powierzchni 200m² z ogrodem",
    client: "Rodzina Kowalskich",
    year: 2023,
    category: "Dom",
    image: "/scene.jpg",
    location: "Konstancin-Jeziorna",
    area: "200 m²",
    scope: "Projekt wnętrz, aranżacja ogrodu",
    services: [
      "Projekt koncepcyjny",
      "Projekt wykonawczy",
      "Dobór materiałów",
      "Nadzór",
    ],
    fullDescription:
      "Projekt domu jednorodzinnego w Konstancinie-Jeziornie. Wnętrze charakteryzuje się elegancją i funkcjonalnością, z wykorzystaniem naturalnych materiałów i dużych przeszkleń łączących wnętrze z ogrodem.",
    gallery: [
      "/scene.jpg",
      "/scene.jpg",
      "/scene.jpg",
      "/scene.jpg",
      "/scene.jpg",
      "/scene.jpg",
    ],
  },
  {
    id: "biuro-srodmiescie",
    title: "Biuro w Śródmieściu",
    description: "Nowoczesne biuro korporacyjne z przestrzeniami open space",
    client: "TechCorp Sp. z o.o.",
    year: 2024,
    category: "Biuro",
    image: "/scene.jpg",
    location: "Warszawa, Śródmieście",
    area: "350 m²",
    scope: "Projekt wnętrz biurowych",
    services: [
      "Projekt koncepcyjny",
      "Projekt wykonawczy",
      "Nadzór autorski",
      "Dobór mebli",
    ],
    fullDescription:
      "Projekt nowoczesnego biura korporacyjnego w centrum Warszawy. Przestrzeń została zaprojektowana z myślą o komforcie pracy i współpracy zespołowej, z wydzielonymi strefami spotkań i relaksu.",
    gallery: ["/scene.jpg", "/scene.jpg", "/scene.jpg"],
  },
];

// Helper function to get realizacja by ID
export function getRealizacjaById(id: string): Realizacja | undefined {
  return realizacje.find((realizacja) => realizacja.id === id);
}
