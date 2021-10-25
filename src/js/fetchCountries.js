const BASE_URL = 'https://restcountries.com/v2';
let end_point = 'name';

export default function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}/${end_point}/${searchQuery}`)
        .then(response =>
            response.json())
        .then(countries => { return countries });
}
