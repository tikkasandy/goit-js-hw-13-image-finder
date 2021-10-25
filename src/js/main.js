import debounce from "lodash.debounce"

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';

//import "../sass/main.scss";

import countryList from "../templates/countries-list.hbs"
import countryCard from "../templates/country-card.hbs"

import refs from "./refs"
import fetchCountries from "./fetchCountries";


refs.countrySearch.addEventListener("input", debounce(onSearch, 500));

function onSearch(e) {
    const countryName = e.target.value.trim();
    if (countryName.length > 0) {
        fetchCountries(countryName)
            .then(renderCountry)
            .catch(onFetchError);
    } else {
        clear()
    };
};

function renderCountry(country) {
    if (country.status === 404) {
        clear();
        onFetchError("Country not found. Please enter a correct query!");
    } else {
        if (country.length === 1) {
            refs.resultContainer.innerHTML = countryCard(country);
        } else {
            if (country.length < 11) {
                refs.resultContainer.innerHTML = countryList(country);
            } else {
                clear();
                onFetchError("Too many matches found. Please enter a more specific query!");
            }
        }
    }
}

function onFetchError(message) {
    error({
        text: `${message}`,
        delay: 2500,
    });
}

function clear() {
    refs.resultContainer.innerHTML = "";
}