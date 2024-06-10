function openPage(url) {
    window.location.href = url;
}

const images = document.querySelectorAll('.unique-gallery-container img');

images.forEach((img, index) => {
    img.addEventListener('click', () => {
        openImage(index);
    });
});

function openImage(index) {
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const modalImg = document.createElement('img');
    modalImg.classList.add('modal-img');
    modalImg.src = images[index].src;

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '&times;';

    const prevBtn = document.createElement('span');
    prevBtn.classList.add('prev-btn');
    prevBtn.innerHTML = '&#10094;';

    const nextBtn = document.createElement('span');
    nextBtn.classList.add('next-btn');
    nextBtn.innerHTML = '&#10095;';

    const navContainer = document.createElement('div');
    navContainer.classList.add('nav-container');
    navContainer.appendChild(prevBtn);
    navContainer.appendChild(nextBtn);

    modalContent.appendChild(modalImg);
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(navContainer);

    overlay.appendChild(modalContent);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });

    closeBtn.addEventListener('click', () => {
        overlay.remove();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        modalImg.src = images[index].src;
    });

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % images.length;
        modalImg.src = images[index].src;
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            index = (index - 1 + images.length) % images.length;
            modalImg.src = images[index].src;
        } else if (e.key === 'ArrowRight') {
            index = (index + 1) % images.length;
            modalImg.src = images[index].src;
        }
    });
}



