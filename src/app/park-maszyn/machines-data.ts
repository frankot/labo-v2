export interface Machine {
  id: number;
  name: string;
  workArea: string;
  manufacturer: string;
  description: string;
  applications: string[];
  materials: string[];
  image: string;
}

export const machinesData: Machine[] = [
  {
    id: 1,
    name: "Ploter frezujący 2030 SPECIAL",
    workArea: "2100 × 3100 mm",
    manufacturer: "Polska Grupa CNC",
    description:
      "Profesjonalna frezarka CNC do precyzyjnej obróbki różnorodnych materiałów — idealna do zastosowań przemysłowych, reklamowych i kreatywnych.",
    applications: [
      "Produkcja mebli i elementów wnętrz",
      "Tworzenie reklam, szyldów, liter 3D i dekoracji",
      "Projektowanie opakowań z tektury i tworzyw",
      "Cięcie, frezowanie, grawerowanie i bigowanie detali w małych i dużych seriach",
      "Obróbka materiałów o niestandardowych wymiarach",
    ],
    materials: [
      "Drewno i materiały drewnopochodne",
      "MDF, sklejka, płyty meblowe",
      "Tworzywa sztuczne i spienione",
      "PCV, plexi, pianki",
      "Metale miękkie",
      "Aluminium, miedź, mosiądz",
      "Materiały kompozytowe",
      "Dibond, laminaty",
      "Papier, karton, tektura",
      "Tkaniny, skóry, eko-skóry",
    ],
    image: "/2.png",
  },
  {
    id: 2,
    name: "Ploter frezujący 1825 PRECISION",
    workArea: "1800 × 2500 mm",
    manufacturer: "Polska Grupa CNC",
    description:
      "Kompaktowa frezarka CNC o wysokiej precyzji, przeznaczona do średnich projektów scenograficznych i elementów dekoracyjnych.",
    applications: [
      "Produkcja elementów scenograficznych",
      "Tworzenie detali architektonicznych",
      "Cięcie elementów wystawienniczych",
      "Frezowanie prototypów i makiet",
      "Obróbka elementów teatralnych i filmowych",
    ],
    materials: [
      "Drewno i sklejka",
      "Płyty OSB i HDF",
      "Tworzywa termoplastyczne",
      "Plexi i poliwęglan",
      "Pianki montażowe",
      "Aluminium kompozytowe",
      "Karton plast",
      "Materiały izolacyjne",
    ],
    image: "/2.png",
  },
  {
    id: 3,
    name: "Ploter frezujący 3050 INDUSTRIAL",
    workArea: "3000 × 5000 mm",
    manufacturer: "Polska Grupa CNC",
    description:
      "Przemysłowa frezarka CNC do obróbki wielkoformatowych elementów. Idealna do dużych projektów scenograficznych i konstrukcji wystawienniczych.",
    applications: [
      "Produkcja wielkoformatowych konstrukcji",
      "Cięcie paneli scenograficznych",
      "Tworzenie elementów targowych i eventowych",
      "Obróbka dużych elementów reklamowych",
      "Produkcja backdrop'ów i ścianek",
    ],
    materials: [
      "Płyty wiórowe i pilśniowe",
      "Sklejka wodoodporna",
      "Płyty laminowane",
      "Tworzywa lite i komorowe",
      "Blachy aluminiowe",
      "Kompozyty węglowe",
      "Materiały sandwich",
      "Płyty izolacyjne",
    ],
    image: "/2.png",
  },
  {
    id: 4,
    name: "Ploter frezujący 1530 COMPACT",
    workArea: "1500 × 3000 mm",
    manufacturer: "Polska Grupa CNC",
    description:
      "Uniwersalna frezarka CNC do małych i średnich projektów. Doskonała do precyzyjnej obróbki detali i elementów dekoracyjnych.",
    applications: [
      "Produkcja małych elementów scenograficznych",
      "Tworzenie detali i ozdób",
      "Cięcie szablonów i form",
      "Grawerowanie napisów i logo",
      "Obróbka biżuterii i akcesoriów",
    ],
    materials: [
      "Drewno egzotyczne",
      "Materiały syntetyczne",
      "Metale kolorowe",
      "Szkło akrylowe",
      "Laminaty HPL",
      "Materiały tekstylne",
      "Skóry naturalne",
      "Kork i bambus",
    ],
    image: "/2.png",
  },
  {
    id: 5,
    name: "Ploter frezujący 2545 VERSATILE",
    workArea: "2500 × 4500 mm",
    manufacturer: "Polska Grupa CNC",
    description:
      "Wszechstronna frezarka CNC o dużym polu roboczym. Idealna do różnorodnych zastosowań w branży eventowej i reklamowej.",
    applications: [
      "Produkcja stoisk targowych",
      "Tworzenie instalacji eventowych",
      "Cięcie elementów wystawienniczych",
      "Obróbka paneli reklamowych",
      "Produkcja mebli eventowych",
    ],
    materials: [
      "Płyty meblowe",
      "Forniry naturalne",
      "Tworzywa techniczne",
      "Metale lekkie",
      "Materiały piankowe",
      "Tekstylia techniczne",
      "Kompozyty szklane",
      "Materiały recyklingowe",
    ],
    image: "/2.png",
  },
  {
    id: 6,
    name: "Ploter frezujący 4060 MEGA",
    workArea: "4000 × 6000 mm",
    manufacturer: "Polska Grupa CNC",
    description:
      "Największa frezarka CNC w naszym parku maszynowym. Przeznaczona do obróbki wielkoformatowych projektów i konstrukcji przemysłowych.",
    applications: [
      "Produkcja wielkoformatowych konstrukcji scenograficznych",
      "Cięcie paneli architektonicznych",
      "Obróbka elementów prefabrykowanych",
      "Tworzenie dużych instalacji artystycznych",
      "Produkcja elementów przemysłowych",
    ],
    materials: [
      "Płyty konstrukcyjne",
      "Blachy aluminiowe grube",
      "Kompozyty przemysłowe",
      "Materiały izolacyjne grube",
      "Płyty cementowo-wiórowe",
      "Tworzywa przemysłowe",
      "Metale konstrukcyjne",
      "Materiały ogniotrwałe",
    ],
    image: "/2.png",
  },
];
