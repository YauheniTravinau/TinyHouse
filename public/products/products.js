// Получаем индекс текущего изображения
let slideIndex = 0;

// Функция для отображения следующего изображения
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Функция для отображения конкретного изображения
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Функция для отображения изображений и управления стрелками
function showSlides(n) {
    const modalImages = document.querySelectorAll('.thumbnails img');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('caption');
    const prevArrow = document.querySelector('.prev');
    const nextArrow = document.querySelector('.next');

    // Переполнение индекса
    if (n >= modalImages.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = modalImages.length - 1;
    }

    // Установка оригинального изображения и подписи
    modalImg.src = modalImages[slideIndex].src;
    captionText.innerHTML = modalImages[slideIndex].alt;

    // Проверка, нужно ли скрывать стрелку влево или вправо
    if (slideIndex === 0) {
        prevArrow.classList.add('disabled');
    } else {
        prevArrow.classList.remove('disabled');
    }

    if (slideIndex === modalImages.length - 1) {
        nextArrow.classList.add('disabled');
    } else {
        nextArrow.classList.remove('disabled');
    }

    // Показываем модальное окно
    document.getElementById('modal').style.display = 'block';
}

// Добавляем обработчик для нажатия клавиш
document.addEventListener('keydown', function(event) {
    // Если нажата клавиша влево (keyCode 37) или вправо (keyCode 39)
    if (event.keyCode === 37) {
        // Показываем предыдущее изображение
        plusSlides(-1);
    } else if (event.keyCode === 39) {
        // Показываем следующее изображение
        plusSlides(1);
    }
});

// Улучшенный обработчик для закрытия модального окна
document.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal || event.target.classList.contains('close')) {
        modal.style.display = 'none';
    }
});

// Добавляем обработчики событий для кликов на изображения в галерее
const thumbnails = document.querySelectorAll('.thumbnails img');
thumbnails.forEach(function(thumbnail, index) {
    thumbnail.addEventListener('click', function() {
        currentSlide(index);
    });
});

// Добавляем обработчик события для открытия модального окна при клике на изображение 500x500
document.querySelector('.big-image').addEventListener('click', function() {
    currentSlide(0); // Передаем индекс 0 для открытия первого изображения в галерее
});



/*статистика отправки форм*/
document.getElementById('submitBtn').addEventListener('click', () => {
    // Увеличиваем счетчик отправленных форм в localStorage
    const formsCount = localStorage.getItem('formsCount') ? parseInt(localStorage.getItem('formsCount')) : 0;
    localStorage.setItem('formsCount', formsCount + 1);
});