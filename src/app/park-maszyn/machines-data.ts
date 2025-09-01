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
    name: "PLOTER FREZUJĄCY 2040 SPECIAL",
    shortName: "CNC Plotter",
    workArea: "210 × 410 cm",
    manufacturer: "Polska Grupa CNC",
    description:
      "Profesjonalna frezarka CNC przeznaczona do precyzyjnej obróbki różnorodnych materiałów — idealna do zastosowań przemysłowych, reklamowych i kreatywnych. W naszej pracowni posiadamy łącznie trzy plotery frezujące: dwa modele 2040 SPECIAL – jeden z automatycznym magazynem narzędzi i stołem podciśnieniowym, drugi ze stołem podciśnieniowym, jeden model 2030 SPECIAL– wykorzystywany głównie do testów i realizacji mniejszych formatów.",
    applications: [
      "Frezowanie drewna, płyt drewnopochodnych i kompozytowych",
      "Tworzenie reklam wielkoformatowych, liter 3D, logotypów i szyldów",
      "Obróbka frontów meblowych, blatów i innych elementów wyposażenia wnętrz",
      "Cięcie i grawerowanie tworzyw sztucznych (PVC, plexi, poliwęglan)",
      "Bigowanie i cięcie materiałów scenograficznych, takich jak dibond",
      "Wykonywanie detali o złożonych kształtach w technologii 2D i 2,5D i 3D, w produkcji jednostkowej i seryjnej",
    ],
    materials: [
      "Drewno i materiały drewnopochodne",
      "MDF, sklejka, płyty meblowe",
      "Tworzywa sztuczne i spienione",
      "PCV, plexi, pianki",
      "Materiały kompozytowe i kamienie sztuczne",
      "Dibond, Laminaty",
      "Papier, styropian",
    ],
    image: "/park-maszyn/drukarka-3d.png",
  },
  {
    id: 2,
    name: "DRUKARKA 3D WIELKOFORMATOWA",
    shortName: "Large Format 3D",
    workArea: "250 × 125 × 100 cm",
    manufacturer: "PROTOTYP POLSKIEJ GRUPY CNC",
    description:
      "Innowacyjna drukarka 3D przeznaczona do wytwarzania prototypów, elementów konstrukcyjnych i części o niestandardowych wymiarach. Jako pierwsi w Polsce posiadamy ten zaawansowany sprzęt, co pozwala nam realizować projekty, które wcześniej były niemożliwe do wykonania w technologii FGF. Maszyna umożliwia wydajny druk z różnych tworzyw termoplastycznych, w tym materiałów wzmacnianych włóknem szklanym, o wysokiej wytrzymałości i niskiej masie. Wydajność: do 12 kg materiału na godzinę.",
    applications: [
      "Produkcja dużych prototypów i elementów koncepcyjnych w przemyśle i scenografii",
      "Tworzenie funkcjonalnych części konstrukcyjnych o wysokiej wytrzymałości mechanicznej",
      "Realizacja niestandardowych komponentów do maszyn i urządzeń technicznych",
      "Wytwarzanie elementów dekoracyjnych i scenograficznych w pełnej skali",
      "Testowanie i wdrażanie projektów wymagających lekkich, sztywnych i odpornych materiałów",
      "Produkcja obudów, pojemników i części eksploatacyjnych dla przemysłu i designu",
    ],
    materials: [
      "Granulat na bazie polipropylenu wzmacnianego 30% włókien szklanych – lekki, sztywny i wytrzymały",
      "PA (poliamid) – wysoka wytrzymałość mechaniczna, odporność na ścieranie, elementy techniczne",
      "PP (polipropylen) – lekki, odporny na chemikalia, elastyczny, do prototypów i obudów",
      "PC (poliwęglan) – bardzo wytrzymały, odporny na temperaturę, do części konstrukcyjnych i obudów elektroniki",
      "EVA (kopolimer etylenu i octanu winylu) – elastyczny, ekologiczny, elementy miękkie, produkty konsumenckie",
      "Kompozyty celulozowe – ekologiczne materiały wzmacniane celulozą, lekkie i wytrzymałe, przystosowane do druku w technologii FGF",
    ],
    image: "/park-maszyn/drukarka-3d.png",
  },
  {
    id: 3,
    name: "LASER CO₂ 100 W",
    shortName: "CO2 Laser",
    workArea: "100 × 140 cm",
    manufacturer: "Moc tuby: 100 W",
    description:
      "Precyzyjne urządzenie do cięcia i grawerowania szerokiej gamy materiałów niemetalowych o grubości do 12mm. Duże pole robocze oraz wysoka moc tuby umożliwiają szybkie i dokładne wykonywanie zarówno detali dekoracyjnych, jak i większych elementów scenograficznych.",
    applications: [
      "Cięcie i grawerowanie plexi oraz innych tworzyw sztucznych niewydzielających chloru",
      "Obróbka materiałów scenograficznych, takich jak ekoskóra, wykładzina, filc, gąbka",
      "Precyzyjne cięcie sklejki odpowiedniej klasy o grubości do 10mm",
      "Grawerowanie w drewnie, materiałach drewnopodobnych i tworzywach sztucznych",
      "Znakowanie oraz grawerowanie w cienkich blachach powlekanych",
    ],
    materials: [
      "Plexi i inne tworzywa sztuczne bez chloru",
      "Ekoskóra, wykładzina, filc, gąbka",
      "Sklejka",
      "Drewno i materiały drewnopochodne",
      "Cienkie blachy powlekane",
    ],
    image: "/park-maszyn/laser-co2.png",
  },
  {
    id: 4,
    name: "WYCINARKA PLAZMOWA",
    shortName: "Plasma Cutter",
    workArea: "200 × 100 cm",
    manufacturer: "",
    description:
      "Uniwersalne urządzenie do cięcia stali czarnej o grubości do 12 mm. Wysoka moc źródła plazmy oraz stabilna konstrukcja stołu roboczego zapewniają czyste, równe krawędzie i minimalną ilość obróbki wykańczającej. Idealna do produkcji elementów konstrukcyjnych, dekoracyjnych oraz detali technicznych wymagających dużej dokładności.",
    applications: [
      "Wycinanie elementów konstrukcyjnych do scenografii i zabudów stalowych",
      "Produkcja ram, wsporników, uchwytów i detali montażowych",
      "Tworzenie stalowych dekoracji, liter i logotypów",
      "Wykonywanie paneli, kratownic i elementów nośnych",
      "precyzyjne cięcie blach o skomplikowanych kształtach",
    ],
    materials: [
      "Stal czarna (blachy, płyty) o grubości do 12 mm",
    ],
    image: "/park-maszyn/wycinarka-plazmowa.png",
  },
  {
    id: 5,
    name: "PIŁY FORMATOWE I PIŁA PIONOWA",
    shortName: "Format Saws",
    workArea: "",
    manufacturer: "",
    description:
      "Zestaw profesjonalnych pił do cięcia drewna, płyt drewnopochodnych i materiałów kompozytowych pod wymiar. Duża dokładność cięcia i stabilna konstrukcja pozwalają na precyzyjne przygotowanie elementów do dalszej obróbki. Piła pionowa uzupełnia park maszynowy, umożliwiając cięcie wzdłużne i cięcia pod kątem.",
    applications: [
      "Cięcie płyt MDF, sklejki, płyt meblowych i kompozytowych",
      "Przygotowanie elementów scenograficznych i dekoracyjnych",
      "Wstępne formatowanie materiałów pod konstrukcje stoisk targowych, podestów i paneli",
    ],
    materials: [
      "Drewno i materiały drewnopochodne",
      "Płyty meblowe",
      "Materiały kompozytowe",
    ],
    image: "/park-maszyn/piły-formatowe.png",
  },
  {
    id: 6,
    name: "Okleiniarka prostoliniowa G380",
    shortName: "Edge Bander G380",
    workArea: "",
    manufacturer: "Felder",
    description:
      "Nowoczesna okleiniarka prostoliniowa przeznaczona do precyzyjnego oklejania obrzeży płyt meblowych. Wyposażona w zaawansowane agregaty, zapewnia wysoką jakość wykończenia i efektywność pracy. Dzięki innowacyjnym rozwiązaniom technicznym, takim jak wymienny zbiornik klejowy i system Quick-Set, maszyna umożliwia szybkie dostosowanie do różnych materiałów i kolorów obrzeży. Idealna do zastosowań w produkcji mebli, elementów wyposażenia wnętrz oraz innych detali wymagających precyzyjnego oklejania.",
    applications: [
      "Oklejanie obrzeży płyt MDF, sklejki, płyt meblowych i kompozytowych",
      "Produkcja frontów meblowych, blatów, paneli i innych elementów wyposażenia wnętrz",
      "Przygotowanie detali do dalszej obróbki, takich jak frezowanie czy lakierowanie",
    ],
    materials: [
      "Obrzeża z tworzyw sztucznych, drewna naturalnego, okleiny naturalnej",
      "Płyty MDF, sklejka, płyty meblowe i kompozytowe",
    ],
    image: "/park-maszyn/okleiniarka.png",
  },
  {
    id: 7,
    name: "Termoformiarka",
    shortName: "Thermoforming",
    workArea: "100 × 200 cm",
    manufacturer: "",
    description:
      "urządzenie do precyzyjnego formowania kształtów z tworzyw sztucznych przy użyciu kontrolowanej temperatury i czasu nagrzewania",
    applications: [
      "Formowanie detali i kształtów z tworzyw termoplastycznych w procesie podgrzewania",
      "Produkcja liter 3D, logotypów i innych elementów scenografii",
    ],
    materials: [
      "HIPS, ABS, PP",
      "Polistyren modyfikowany, polistyren",
    ],
    image: "/park-maszyn/termoformiarka.png",
  },
  {
    id: 8,
    name: "LAKIERNIA FRONTÓW MEBLOWYCH",
    shortName: "Paint Shop",
    workArea: "",
    manufacturer: "",
    description:
      "Nowoczesna lakiernia zaprojektowana i zbudowana wewnętrznie przez nasz zespół, umożliwia dokładne i równomierne nanoszenie powłok lakierniczych na różnorodne elementy scenograficzne. Zaawansowany system natrysku i cyrkulacji powietrza umożliwia precyzyjną kontrolę nad procesem, co pozwala uzyskać jednolitą powłokę oraz wysoką jakość wykończenia.",
    applications: [
      "Nakładanie powłok lakierniczych na elementy drewniane i drewnopochodne, a także na materiały kompozytowe i wybrane tworzywa sztuczne",
      "Uzyskiwanie efektów matowych, półmatowych i połyskujących",
      "Ochrona powierzchni przed uszkodzeniami mechanicznymi i wilgocią",
      "Pokrywanie powierzchni różnorodnych elementów w jednym cyklu produkcyjnym",
      "Przygotowanie detali do dalszego montażu i ekspozycji",
    ],
    materials: [
      "Płyty MDF, płyty meblowe, fronty drewnopochodne i kompozytowe",
      "Farby i lakiery wodne, akrylowe i poliuretanowe",
    ],
    image: "/park-maszyn/lakiernia.png",
  },
  {
    id: 9,
    name: "SPAWALNIA",
    shortName: "Welding Station",
    workArea: "",
    manufacturer: "",
    description:
      "nowoczesne stanowiska spawalnicze, przystosowane do wszechstronnej obróbki metali.",
    applications: [
      "Wykonywanie konstrukcji stalowych i aluminiowych",
      "Produkcja elementów scenograficznych i dekoracyjnych",
      "Łączenie detali wymagających wysokiej precyzji i estetyki spawu",
      "Obróbka materiałów do zastosowań przemysłowych, eventowych i ekspozycyjnych",
    ],
    materials: [
      "5 stanowisk spawalniczych do różnych materiałów",
      "Obsługa stali czarnej, stali nierdzewnej i aluminium",
      "Możliwość spawania metodami MMA, TIG, MIG, MAG",
    ],
    image: "/park-maszyn/spawalnia.png",
  },
];
