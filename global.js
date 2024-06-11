// Функция для загрузки содержимого с заданного URL в указанный элемент
function loadContent(url, elementId) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.getElementById(elementId).innerHTML = xhr.responseText;
            } else {
                console.error('Ошибка загрузки страницы:', xhr.status);
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

// Функция для загрузки содержимого с использованием fetch
function fetchContent(url, elementSelector) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.querySelector(elementSelector).innerHTML = html;
        })
        .catch(error => console.error('Ошибка загрузки страницы:', error));
}

// Функция для добавления слушателя на кнопку "Поделиться"
function addShareButtonListener() {
    const shareButton = document.getElementById('shareButton');
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            let url = window.location.href; // Получаем URL текущей страницы

            // Если API "Поделиться" доступно в браузере
            if (navigator.share) {
                navigator.share({
                    title: 'Заголовок вашего сайта',
                    text: 'Описание вашего сайта',
                    url: url
                })
                    .then(() => console.log('Ресурс успешно поделен!'))
                    .catch((error) => console.error('Ошибка при попытке поделиться:', error));
            } else {
                // Если API "Поделиться" недоступно в браузере, открываем обычное окно для шаринга
                let shareUrl = 'https://example.com/share?url=' + encodeURIComponent(url);
                window.open(shareUrl, '_blank');
            }
        });
    }
}

// Функция для перенаправления на страницу продуктов
function initBanners() {
    const slides = document.querySelectorAll('.slide');

    const mainImages = [
        "/public/images/GemütlichesTinyHouse.jpg",
        "/public/images/HolzhausHarmonie.jpg",
        "/public/images/MobilheimIdylle.jpg",
        "/public/images/WanderlustMobilhaus.jpg",
        "/public/images/FerienhausFlair.jpg"
    ];

    const secondaryImages = [
        "/public/images/FerienhausFlair.jpg",
        "/public/images/WanderlustMobilhaus.jpg",
        "/public/images/MobilheimIdylle.jpg",
        "/public/images/HolzhausHarmonie.jpg",
        "/public/images/GemütlichesTinyHouse.jpg"
    ];

    let currentSlide = 0;
    let isMain = true;

    function replaceImages() {
        slides.forEach((slide, index) => {
            if (!isMain) {
                slide.setAttribute('src', secondaryImages[index]);
            } else {
                slide.setAttribute('src', mainImages[index]);
            }
        });

        // После замены изображений, меняем флаг на противоположный
        isMain = !isMain;

        // Если достигнуто последнее вторичное изображение, снова переключаемся на основные изображения
        if (!isMain && currentSlide === secondaryImages.length - 1) {
            isMain = true;
            currentSlide = 0;
        } else {
            currentSlide++;
        }
    }

    setInterval(replaceImages, 7000);
}

// Вызываем функцию при загрузке страницы
window.onload = initBanners;


// Выполняем все скрипты после полной загрузки DOM
window.addEventListener('DOMContentLoaded', function() {
    loadContent('/public/popular-products/popular-products.html', 'popular-products');
    loadContent('/public/running-line/running-line.html', 'running-line');

    fetchContent('/public/header/header.html', '#header-placeholder');
    fetchContent('/public/footer/footer.html', '#footer-placeholder');
    fetchContent('/public/menu/menu.html', '#menu');

    addShareButtonListener();

    fetch('/public/banners/banners.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('banners').innerHTML = data;
            initBanners(); // Call initBanners after setting HTML
        })
        .catch(error => console.error('Ошибка загрузки баннеров:', error));
});

/*скрол вверх*/
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const scrollToTopContainer = document.getElementById("scrollToTopContainer");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopContainer.classList.remove("hidden");
    } else {
        scrollToTopContainer.classList.add("hidden");
    }
}

function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


/*контакты справа страницы*/
const divElement = document.createElement('div');

fetch('/public/icon-contact/icon-contact.html') // Замените путь_к_вашему_html_файлу.html на фактический путь к вашему HTML-файлу
    .then(response => response.text())
    .then(html => {
        // Устанавливаем содержимое загруженного HTML в divElement
        divElement.innerHTML = html;

        // Находим контейнер с id "contact-puls-icon"
        const container = document.getElementById('contact-puls-icon');

        // Проверяем, существует ли контейнер, прежде чем добавить содержимое
        if (container) {
            // Очищаем контейнер перед добавлением нового содержимого
            container.innerHTML = '';

            // Добавляем divElement в контейнер
            container.appendChild(divElement);
        } else {
            console.error('Контейнер с id "contact-puls-icon" не найден');
        }
    })
    .catch(error => console.error('Ошибка загрузки HTML файла:', error));
