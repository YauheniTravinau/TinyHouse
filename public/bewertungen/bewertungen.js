document.addEventListener('DOMContentLoaded', () => {
    const leaveReviewButton = document.getElementById('leaveReviewButton');
    const reviewModal = document.getElementById('reviewModal');
    const closeModal = document.querySelector('.close');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const reviewStep1 = document.getElementById('reviewStep1');
    const reviewStep2Yes = document.getElementById('reviewStep2Yes');
    const reviewStep2No = document.getElementById('reviewStep2No');
    const reviewCards = document.querySelectorAll('.review-card');

    leaveReviewButton.onclick = () => {
        reviewModal.style.display = 'block';
    };

    closeModal.onclick = () => {
        reviewModal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === reviewModal) {
            reviewModal.style.display = 'none';
        }
    };

    yesButton.onclick = () => {
        reviewStep1.style.display = 'none';
        reviewStep2Yes.style.display = 'block';
    };

    noButton.onclick = () => {
        reviewStep1.style.display = 'none';
        reviewStep2No.style.display = 'block';
    };

    document.getElementById('submitYesReview').onclick = () => {
        // Обработка отправки отзыва с положительным ответом
        alert('Спасибо за ваш отзыв!');
        reviewModal.style.display = 'none';
    };

    document.getElementById('submitNoReview').onclick = () => {
        // Обработка отправки отзыва с отрицательным ответом
        alert('Спасибо за ваш отзыв! Наши менеджеры свяжутся с вами как можно скорее.');
        reviewModal.style.display = 'none';
    };

    // Добавляем обработчик события клика на каждую карточку
    reviewCards.forEach((card) => {
        card.addEventListener('click', () => {
            const fullReviewModal = document.getElementById('fullReviewModal');
            const closeFullReviewModal = fullReviewModal.querySelector('.close');
            const reviewText = card.querySelector('.review-text').textContent;
            const author = card.querySelector('.review-author').textContent;
            const rating = card.querySelector('.review-rating').innerHTML;
            const date = card.querySelector('.review-date').textContent;
            const photos = card.querySelectorAll('.review-photos img');

            // Показываем модальное окно с полным отзывом
            fullReviewModal.style.display = 'block';

            // Заполняем модальное окно данными из карточки отзыва
            fullReviewModal.querySelector('.review-text').textContent = reviewText;
            fullReviewModal.querySelector('.review-author').textContent = author;
            fullReviewModal.querySelector('.review-rating').innerHTML = rating;
            fullReviewModal.querySelector('.review-date').textContent = date;

            // Вставляем фотографии в модальное окно
            const photoContainer = fullReviewModal.querySelector('.review-photos');
            photoContainer.innerHTML = ''; // Очищаем контейнер фотографий перед добавлением новых
            photos.forEach((photo) => {
                const img = document.createElement('img');
                img.src = photo.src;
                img.alt = photo.alt;
                photoContainer.appendChild(img);
            });

            // Закрытие модального окна при клике на крестик
            closeFullReviewModal.onclick = () => {
                fullReviewModal.style.display = 'none';
            };
        });
    });
});

