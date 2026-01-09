import { fetchRealizacjeForNavbar } from "../../../lib/hygraph-api";
import { buildNavLinks, realizacjeDropdownItems, createRealizacjeDropdownItems } from "./navigation-data";
import NavbarClient from "./NavbarClient";

async function Navbar() {
  let realizacjeItems = realizacjeDropdownItems; // Default to static data

  try {
    // Fetch 9 realizacje for navbar
    const fetchedRealizacje = await fetchRealizacjeForNavbar();
    if (fetchedRealizacje && fetchedRealizacje.length > 0) {
      realizacjeItems = createRealizacjeDropdownItems(fetchedRealizacje);
    }
  } catch (error) {
    console.error('Failed to fetch realizacje for navbar:', error);
    // Use default static data on error
  }

  const navLinks = buildNavLinks(realizacjeItems);

  return <NavbarClient navLinks={navLinks} />;
}

export default Navbar;
