const API_KEY = '24024087-799f8861d2a5ccb36886decf6';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGES = 12;

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${PER_PAGES}&key=${API_KEY}`;

        return fetch(url)
            .then(response => response.json())
            .then((data) => {
                this.incrementPage();
                return data.hits;
            })
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}