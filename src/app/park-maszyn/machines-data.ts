export interface Machine {
  id: number;
  name: string;
  shortName: string;
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
    name: "Drukarka 3D przemysłowa",
    shortName: "3D Industrial",
    workArea: "400 × 400 × 400 mm",
    manufacturer: "Zortrax",
    description:
      "Profesjonalna drukarka 3D do tworzenia precyzyjnych prototypów, modeli funkcjonalnych i elementów końcowych z wysokiej jakości materiałów.",
    applications: [
      "Prototypowanie szybkie",
      "Produkcja narzędzi i przyrządów",
      "Tworzenie modeli architektonicznych",
      "Elementy funkcjonalne i mechaniczne",
      "Formy do odlewania i formowania",
    ],
    materials: [
      "PLA",
      "ABS",
      "PETG",
      "TPU (elastomery)",
      "PC (poliwęglan)",
      "Nylon",
      "Materiały wypełnione włóknem",
      "Materiały rozpuszczalne",
    ],
    image: "/park-maszyn/drukarka-3d.png",
  },
  {
    id: 2,
    name: "Laser CO2 przemysłowy",
    shortName: "CO2 Laser",
    workArea: "1600 × 1000 mm",
    manufacturer: "Bodor",
    description:
      "Wysokowydajny laser CO2 do precyzyjnego cięcia i grawerowania różnorodnych materiałów. Idealne rozwiązanie dla produkcji reklamowej i przemysłowej.",
    applications: [
      "Cięcie materiałów nielmetalowych",
      "Grawerowanie tekstów i grafik",
      "Produkcja szyldów i reklam",
      "Cięcie opakowań i szablonów",
      "Personalizacja produktów",
    ],
    materials: [
      "Drewno i sklejka",
      "Akryl i plexi",
      "Tkaniny naturalne i syntetyczne",
      "Karton i papier",
      "Skóra naturalna i eko-skóra",
      "Filc i pianki",
      "Guma i cork",
      "Laminaty i folie",
    ],
    image: "/park-maszyn/laser-co2.png",
  },
  {
    id: 3,
    name: "Wycinarka plazmowa CNC",
    shortName: "Plasma CNC",
    workArea: "2000 × 6000 mm",
    manufacturer: "Messer",
    description:
      "Precyzyjna wycinarka plazmowa do cięcia metali o różnych grubościach. Doskonała do produkcji elementów stalowych i konstrukcji.",
    applications: [
      "Cięcie blach stalowych",
      "Produkcja elementów konstrukcyjnych",
      "Wycinanie form i szablonów metalowych",
      "Przygotowanie elementów do spawania",
      "Cięcie znaków i liter metalowych",
    ],
    materials: [
      "Stal węglowa",
      "Stal nierdzewna",
      "Aluminium",
      "Mosiądz",
      "Miedź",
      "Blachy ocynkowane",
      "Stal stopowa",
      "Metale kolorowe",
    ],
    image: "/park-maszyn/wycinarka-plazmowa.png",
  },
  {
    id: 4,
    name: "Piła formatowa precyzyjna",
    shortName: "Format Saw",
    workArea: "3200 × 2100 mm",
    manufacturer: "Altendorf",
    description:
      "Profesjonalna piła formatowa do precyzyjnego cięcia płyt drewnopochodnych i materiałów kompozytowych. Gwarantuje idealne kąty i gładkie krawędzie.",
    applications: [
      "Cięcie płyt meblowych",
      "Przygotowanie elementów scenograficznych",
      "Cięcie materiałów budowlanych",
      "Produkcja elementów wystawienniczych",
      "Obróbka płyt laminowanych",
    ],
    materials: [
      "Płyty wiórowe i pilśniowe",
      "MDF i HDF",
      "Sklejka",
      "Płyty laminowane",
      "OSB",
      "Płyty meblowe",
      "Materiały kompozytowe",
      "Dibond i kompozyty aluminiowe",
    ],
    image: "/park-maszyn/piły-formatowe.png",
  },
  {
    id: 5,
    name: "Stanowisko spawalnicze MIG/MAG",
    shortName: "Welding Station",
    workArea: "Unlimited",
    manufacturer: "Kemppi",
    description:
      "Profesjonalne stanowisko spawalnicze z urządzeniami MIG/MAG do łączenia konstrukcji stalowych i aluminiowych. Wyposażone w systemy wentylacji i bezpieczeństwa.",
    applications: [
      "Spawanie konstrukcji stalowych",
      "Łączenie elementów aluminiowych",
      "Naprawa i regeneracja elementów",
      "Produkcja ram i stelaży",
      "Spawanie elementów scenograficznych",
    ],
    materials: [
      "Stal konstrukcyjna",
      "Stal nierdzewna",
      "Aluminium i stopy",
      "Blachy cienkie i grube",
      "Profile stalowe",
      "Rury i rurki",
      "Stal ocynkowana",
      "Metale kolorowe",
    ],
    image: "/park-maszyn/spawalnia.png",
  },
  {
    id: 6,
    name: "Okleiniarka krawędziowa",
    shortName: "Edge Bander",
    workArea: "Min 8mm, max 60mm grubość",
    manufacturer: "Homag",
    description:
      "Automatyczna okleiniarka do naklejania oklein na krawędzie płyt. Zapewnia profesjonalne wykończenie elementów meblowych i wystawienniczych.",
    applications: [
      "Oklejanie krawędzi mebli",
      "Wykańczanie płyt wystawienniczych",
      "Produkcja elementów wnętrz",
      "Oklejanie półek i blatów",
      "Wykończenie elementów scenograficznych",
    ],
    materials: [
      "Okleiny PVC",
      "Okleiny ABS",
      "Okleiny melaminowe",
      "Okleiny papierowe",
      "Forniry naturalne",
      "Okleiny 3D",
      "Taśmy dekoracyjne",
      "Okleiny termoplastyczne",
    ],
    image: "/park-maszyn/okleiniarka.png",
  },
  {
    id: 7,
    name: "Termoformiarka próżniowa",
    shortName: "Thermoforming",
    workArea: "1500 × 1000 mm",
    manufacturer: "Formech",
    description:
      "Maszyna do formowania próżniowego tworzyw termoplastycznych. Idealna do produkcji opakowań, form i elementów o złożonych kształtach.",
    applications: [
      "Formowanie opakowań",
      "Produkcja form i szablonów",
      "Tworzenie elementów dekoracyjnych",
      "Formowanie prototypów",
      "Produkcja elementów technicznych",
    ],
    materials: [
      "PMMA (plexi)",
      "PC (poliwęglan)",
      "ABS",
      "PS (polistyren)",
      "PET/PETG",
      "PP (polipropylen)",
      "PVC",
      "Tworzywa biodegradowalne",
    ],
    image: "/park-maszyn/termoformiarka.png",
  },
  {
    id: 8,
    name: "Lakiernia profesjonalna",
    shortName: "Paint Shop",
    workArea: "Kabina 4 × 3 × 2.5 m",
    manufacturer: "Spray Systems",
    description:
      "Profesjonalna kabina lakiernicza z systemem filtracji i kontrolą klimatu. Umożliwia nakładanie powłok farb, lakierów i innych materiałów wykończeniowych.",
    applications: [
      "Lakierowanie elementów drewnianych",
      "Malowanie konstrukcji metalowych",
      "Nakładanie powłok ochronnych",
      "Wykańczanie elementów scenograficznych",
      "Renowacja i odnawianie powierzchni",
    ],
    materials: [
      "Farby wodne i rozpuszczalnikowe",
      "Lakiery poliuretanowe",
      "Emalie akrylowe",
      "Farby proszkowe",
      "Powłoki ochronne",
      "Impregnaty",
      "Farby dekoracyjne",
      "Systemy antykorozyjne",
    ],
    image: "/park-maszyn/lakiernia.png",
  },
];
