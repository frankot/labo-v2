export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  defaultPos: {
    x: number;
    y: number;
  };
  videoSrc?: string;
  imageSrc?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Project One",
    description: "Description for project one",
    defaultPos: { x: 0, y: 0 },
    imageSrc: "/placeholder.jpg",
  },
  {
    id: "2",
    title: "Project Two",
    description: "Description for project two",
    defaultPos: { x: 4, y: 0 },
    imageSrc: "/placeholder.jpg",
  },
  {
    id: "3",
    title: "Project Three",
    description: "Description for project three",
    defaultPos: { x: 8, y: 0 },
    imageSrc: "/placeholder.jpg",
  },
  {
    id: "4",
    title: "Project Four",
    description: "Description for project four",
    defaultPos: { x: 0, y: 4 },
    imageSrc: "/placeholder.jpg",
  },
];
