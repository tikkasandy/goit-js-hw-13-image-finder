import imageCard from "../templates/image-card.hbs"
import loadButton from "../templates/button.hbs"

import refs from "./refs"
import ApiService from "./apiService";
import LoadMoreBtn from "./components/load-more-button.js"
import onAlert from "./components/notification.js"

refs.resultContainer.insertAdjacentHTML("afterend", loadButton());
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const apiService = new ApiService();

refs.formSearch.addEventListener("submit", onSearch);
loadMoreBtn.refs.button.addEventListener("click", fetchImages);

function onSearch(e) {
    e.preventDefault();

    apiService.query = e.currentTarget.elements.query.value.trim();

    if (apiService.query === '') {
        clearContainer();
        loadMoreBtn.hide();
        return onAlert("Query is empty. Please enter a correct query!");
    }

    loadMoreBtn.show();
    clearContainer();
    apiService.resetPage();
    fetchImages();
}

function fetchImages() {
    loadMoreBtn.disable();
    apiService.fetchImages()
        .then(images => {
            renderImages(images);
            loadMoreBtn.enable();
        }).catch(error => {
            onAlert(error.message)
            loadMoreBtn.hide();
        });

}

function renderImages(images) {

    if (images.length === 0 && apiService.page === 2) {
        loadMoreBtn.hide();
        return onAlert("Images not found. Please enter a correct query");
    }

    if (images.length === 0) {
        loadMoreBtn.hide();
        return onAlert("Show all images on you query");
    }

    refs.resultContainer.insertAdjacentHTML("beforeend", imageCard(images));
    loadMoreBtn.refs.button.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function clearContainer() {
    refs.resultContainer.innerHTML = "";
}