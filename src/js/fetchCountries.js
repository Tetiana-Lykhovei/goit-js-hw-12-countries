import template from "../templates/countryTemplate.hbs";
import listTemplate from "../templates/countriesList.hbs";

import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
// import "../node_modules/@pnotify/core/dist/PNotify.css";
const countries = document.querySelector(".countriesAll");
let baseUrl = `https://restcountries.eu/rest/v2/name/`;

function createElem(temp, data, place) {
  const elem = temp(data);
  place.insertAdjacentHTML("afterbegin", elem);
}

export default function fetchCountries(searchQuery) {
  let url = `${baseUrl}${searchQuery}`;
  return fetch(url)
    .then((res) => {
      console.log(res);
      if (res.status > 200) {
        error({
          title: "No match found",
          text: "No match found",
          delay: 2000,
        });
        throw new Error("Error fetching data");
      } else {
        return res.json();
      }
    })
    .then((countriesList) => {
      console.log(countriesList);
      if (countriesList.length > 10) {
        error({
          title: "Attention",
          text: "Too many matches found. Please be specific!",
          delay: 2000,
        });
      } else if (countriesList.length >= 2 && countriesList.length <= 10) {
        createElem(listTemplate, countriesList, countries);
      } else {
        createElem(template, countriesList, countries);
      }
    })
    .catch((error) => console.log(error));
}
