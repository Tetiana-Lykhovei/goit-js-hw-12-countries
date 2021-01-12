import css from "./css/styles.css";
import fetchCountries from "./js/fetchCountries.js";
import debounce from "lodash.debounce";

const input = document.getElementById("countryInput");
const countries = document.querySelector(".countriesAll");

input.addEventListener(
  "input",
  debounce((e) => {
    countries.innerHTML = "";
    if (!e.target.value) {
      return;
    }
    fetchCountries(e.target.value);
  }, 1000),
);
