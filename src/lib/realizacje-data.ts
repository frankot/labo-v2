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
