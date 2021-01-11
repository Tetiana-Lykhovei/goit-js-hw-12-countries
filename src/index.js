import css from "./css/styles.css";
import fetchCountries from "./js/fetchCountries.js";
import debounce from "lodash.debounce";

const input = document.getElementById("countryInput");

input.addEventListener(
  "input",
  debounce((e) => {
    fetchCountries(e.target.value);
    countries.innerHTML = "";
    if (!e.target.value) {
      return;
    }
  }, 1000),
);
