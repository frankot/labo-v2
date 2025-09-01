# Instrukcja obsługi panelu CMS Hygraph
*Przewodnik dla użytkowników nietechnicznych*

## Spis treści
1. [Wprowadzenie](#wprowadzenie)
2. [Logowanie do panelu](#logowanie-do-panelu)
3. [Nawigacja w panelu](#nawigacja-w-panelu)
4. [Zarządzanie zespołem](#zarządzanie-zespołem)
5. [Zarządzanie realizacjami](#zarządzanie-realizacjami)
6. [Zarządzanie zasobami (Assets)](#zarządzanie-zasobami-assets)
7. [Publikowanie zmian](#publikowanie-zmian)
8. [Najczęstsze problemy](#najczęstsze-problemy)

---

## Wprowadzenie

Panel CMS Hygraph służy do zarządzania treścią na stronie internetowej firmy. Pozwala na:
- Dodawanie i edycję informacji o zespole
- Zarządzanie projektami (realizacjami)
- Uploadowanie i organizowanie zdjęć i innych plików
- Aktualizowanie treści bez pomocy programisty

**Ważne:** Wszystkie zmiany wymagają publikacji, aby były widoczne na stronie.

---

## Logowanie do panelu

1. Przejdź na stronę: `https://app.hygraph.com`
2. Wprowadź swój email i hasło
3. Wybierz projekt `labo-v2` z listy projektów
4. Kliknij "Enter project"

---

## Nawigacja w panelu

### Główne sekcje w menu bocznym:
- **Content** - główna sekcja do edycji treści
- **Schema** - struktura danych (nie edytować!)
- **Assets** - pliki i zdjęcia
- **Settings** - ustawienia projektu

### W sekcji Content znajdziesz:
- **Sections** - działy firmy (np. Właściciele, Dział projektowy)
- **Workers** - pracownicy
- **Realizacjas** - projekty/realizacje firmy

---

## Zarządzanie zespołem

### Dodawanie nowego działu (Section)

1. **Przejdź do Content > Sections**
2. **Kliknij "Create entry"**
3. **Wypełnij pola:**
   - **Name**: Nazwa działu (np. "Dział kreatywny")
   - **Slug**: Automatycznie generowany z nazwy (np. "dzial-kreatywny")
   - **Description**: Opcjonalny opis działu
   - **Display Order**: Numer określający kolejność wyświetlania (0, 1, 2...)

4. **Kliknij "Save & Publish"**

### Dodawanie nowego pracownika (Worker)

1. **Przejdź do Content > Workers**
2. **Kliknij "Create entry"**
3. **Wypełnij pola:**
   - **Name**: Imię i nazwisko
   - **Role**: Stanowisko (np. "Project Manager")
   - **Phone**: Numer telefonu (np. "+48 123 456 789")
   - **Email**: Adres email
   - **Description**: Opis pracownika/jego roli
   - **Image**: Zdjęcie pracownika (kliknij "Browse assets")
   - **Section**: Wybierz dział z listy (WAŻNE: można wybrać wiele działów)

4. **Kliknij "Save & Publish"**

### Edycja istniejącego pracownika

1. **Przejdź do Content > Workers**
2. **Kliknij na pracownika z listy**
3. **Edytuj potrzebne pola**
4. **Kliknij "Save & Publish"**

---

## Zarządzanie realizacjami

### Dodawanie nowej realizacji

1. **Przejdź do Content > Realizacjas**
2. **Kliknij "Create entry"**
3. **Wypełnij pola podstawowe:**
   - **Title**: Tytuł projektu
   - **Description**: Krótki opis
   - **Client**: Nazwa klienta
   - **Year**: Rok realizacji
   - **Category**: Kategoria projektu
   - **Slug**: URL-friendly nazwa (automatycznie generowana)

4. **Wypełnij szczegóły:**
   - **Location**: Lokalizacja projektu
   - **Area**: Powierzchnia (jeśli dotyczy)
   - **Scope**: Zakres prac
   - **Services**: Usługi oddzielone przecinkami (np. "projektowanie, nadzór, kosztorysowanie")

5. **Dodaj media:**
   - **Image**: Główne zdjęcie projektu
   - **Gallery**: Galeria zdjęć (można dodać wiele)
   - **Video**: Film prezentujący projekt (opcjonalne)

6. **Full Description**: Szczegółowy opis z formatowaniem
7. **Kliknij "Save & Publish"**

---

## Zarządzanie zasobami (Assets)

### Uploadowanie nowych plików

1. **Przejdź do Assets w menu bocznym**
2. **Kliknij "Upload assets"**
3. **Przeciągnij pliki lub kliknij "Browse"**
4. **Wybierz pliki z komputera**
5. **Poczekaj na upload i automatyczną publikację**

## Publikowanie zmian

### Statusy treści:
- **Draft** - szkic, nie opublikowany
- **Published** - opublikowany, widoczny na stronie
- **Archived** - zarchiwizowany

### Jak publikować:
1. **Po każdej edycji kliknij "Save & Publish"**
2. **Lub użyj "Save as draft" i opublikuj później**
3. **Zmiany będą widoczne na stronie po kilku minutach**

### Publikowanie wielu elementów naraz:
1. Przejdź do listy treści (np. Workers)
2. Zaznacz checkboxy przy elementach
3. Kliknij "Bulk actions" > "Publish"

---

## Najczęstsze problemy

### ❌ Pracownik nie pojawia się na stronie
**Przyczyny:**
- Nie został opublikowany (sprawdź status)
- Nie ma przypisanego działu (Section)
- Dział nie istnieje lub nie jest opublikowany

**Rozwiązanie:**
1. Sprawdź czy pracownik ma status "Published"
2. Sprawdź czy ma przypisany dział w polu "Section"
3. Sprawdź czy dział też jest opublikowany

### ❌ Zdjęcie nie wyświetla się
**Przyczyny:**
- Plik nie został opublikowany
- Zły format pliku (używaj JPG, PNG, WebP)
- Plik za duży (max 10MB)

**Rozwiązanie:**
1. Sprawdź status pliku w Assets
2. Spróbuj przesłać plik ponownie w mniejszym rozmiarze

### ❌ Realizacja nie pojawia się w galerii
**Przyczyny:**
- Brak głównego zdjęcia (Image)
- Nie została opublikowana
- Błędny slug (powinien być unikalny)

**Rozwiązanie:**
1. Dodaj główne zdjęcie
2. Sprawdź status publikacji
3. Sprawdź czy slug nie jest duplikatem

### ❌ Nie mogę edytować treści
**Przyczyny:**
- Brak uprawnień
- Ktoś inny edytuje ten element
- Problemy z połączeniem

**Rozwiązanie:**
1. Sprawdź swoje uprawnienia z administratorem
2. Odśwież stronę
3. Sprawdź połączenie internetowe

---

## Wskazówki i dobre praktyki

### 📸 Zdjęcia:
- **Rozmiar**: Optymalne 1920x1080px dla realizacji, 800x600px dla zespołu
- **Format**: JPG lub PNG
- **Jakość**: Dobra jakość, ale nie za duże pliki
- **Nazwy**: Opisowe nazwy plików (np. "bartek-kowalski-ceo.jpg")

### 📝 Treść:
- **Opisy**: Konkretne i przydatne dla użytkowników
- **Telefony**: W formacie "+48 123 456 789"
- **Email**: Sprawdź poprawność adresów
- **Slug**: Nie zmieniaj po publikacji (wpływa na linki)

### 🔄 Workflow:
1. Zawsze rób backup przed większymi zmianami
2. Testuj zmiany na stronie po publikacji
3. Używaj folderów w Assets dla lepszej organizacji
4. Publikuj regularnie, nie zbieraj zmian

### 🚨 Bezpieczeństwo:
- Nie udostępniaj danych logowania
- Wyloguj się po skończeniu pracy
- Nie usuwaj elementów bez konsultacji
- Zachowaj ostrożność z przyciskiem "Delete"

---

## Kontakt w razie problemów

W przypadku problemów technicznych lub pytań:
1. Sprawdź ten manual
2. Spróbuj odświeżyć stronę i spróbować ponownie
3. Skontaktuj się z administratorem systemu
4. Podaj szczegóły: co robiłeś, jaki błąd, zrzut ekranu

---

*Ostatnia aktualizacja: Sierpień 2024*
*Wersja: 1.0*
