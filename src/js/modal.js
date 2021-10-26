import * as basicLightbox from 'basiclightbox'
import 'basiclightbox/dist/basicLightbox.min.css'

import refs from "./refs"

refs.resultContainer.addEventListener("click", openModal);

function openModal(e) {
    e.preventDefault()

    if (e.target.nodeName !== 'IMG') {
        return
    };

    const modal = basicLightbox.create(`
        <img src='${e.target.dataset.large}'>
    `);

    modal.show();
};