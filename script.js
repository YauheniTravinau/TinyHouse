document.addEventListener("DOMContentLoaded", function() {
    const cityContainers = document.querySelectorAll(".city-container");
    const showMoreButton = document.getElementById("showMoreButton");

    const numToShow = 6;
    let numShowing = 0;

    // Скрыть все товары, кроме первых шести
    for (let i = numToShow; i < cityContainers.length; i++) {
        cityContainers[i].style.display = "none";
    }

    // Если есть еще товары, показывать кнопку "Показать еще"
    if (numShowing < cityContainers.length) {
        showMoreButton.style.display = "block";
    }

    // Обработчик клика на кнопку "Показать еще" и скрытия контента
    showMoreButton.addEventListener("click", function() {
        if (showMoreButton.textContent === "Mehr anzeigen") {
            // Показывать следующие шесть товаров
            for (let i = numShowing; i < numShowing + numToShow; i++) {
                if (cityContainers[i]) {
                    cityContainers[i].style.display = "block";
                    numShowing++;
                } else {
                    break;
                }
            }

            // Если показаны все товары, заменять текст кнопки
            if (numShowing === cityContainers.length) {
                showMoreButton.textContent = "Inhalt ausblenden";
            }
        } else {
            // Скрыть все товары, кроме первых шести
            for (let i = numToShow; i < cityContainers.length; i++) {
                cityContainers[i].style.display = "none";
            }
            showMoreButton.textContent = "Mehr anzeigen";
            numShowing = numToShow;
        }
    });
});

/*кнопка перехода на товар*/
function redirectToProductPage() {
    window.location.href = '/public/products/products.html';
}

/* Статистика посещаемости */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getViewCountByHour(hour, previousCount) {
    let min, max;
    if (hour >= 0 && hour < 1) {
        min = 0;
        max = 117;
    } else if (hour >= 1 && hour < 2) {
        min = 118;
        max = 245;
    } else if (hour >= 2 && hour < 3) {
        min = 246;
        max = 394;
    } else if (hour >= 3 && hour < 4) {
        min = 395;
        max = 731;
    } else if (hour >= 4 && hour < 5) {
        min = 732;
        max = 918;
    } else if (hour >= 5 && hour < 6) {
        min = 919;
        max = 1500;
    } else if (hour >= 6 && hour < 12) {
        min = 1501;
        max = 3786;
    } else if (hour >= 12 && hour < 17) {
        min = 3787;
        max = 7777;
    } else if (hour >= 17 && hour < 24) {
        min = 7777;
        max = 9874;
    } else {
        min = 0;
        max = 0;
    }
    const viewCount = getRandomNumber(min, max);
    return Math.max(viewCount, previousCount);
}

function getPercentageValue(total, percentage) {
    return Math.round(total * (percentage / 100));
}

function calculateStats(viewCount) {
    const callsPercentage = 12;
    const emailsPercentage = 4;
    const formsPercentage = 6;

    const calls = getPercentageValue(viewCount, callsPercentage);
    const emails = getPercentageValue(viewCount, emailsPercentage);
    const forms = getPercentageValue(viewCount, formsPercentage);

    return { calls, emails, forms };
}

function getStatistics() {
    const now = new Date();
    const hour = now.getHours();
    const previousCount = getPreviousViewCount();
    const viewCount = getViewCountByHour(hour, previousCount);
    const stats = calculateStats(viewCount);

    return { viewCount, ...stats, timestamp: now };
}

function getPreviousViewCount() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDate();
    let maxViewCount = 0;

    for (let i = 0; i <= currentHour; i++) {
        const cacheKey = `statistics_${i}`;
        const cachedStats = JSON.parse(localStorage.getItem(cacheKey));
        if (cachedStats && new Date(cachedStats.timestamp).getDate() === currentDay) {
            maxViewCount = Math.max(maxViewCount, cachedStats.viewCount);
        }
    }

    return maxViewCount;
}

function updateStatistics() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDate();
    const cacheKey = `statistics_${currentHour}`;
    const cachedStats = JSON.parse(localStorage.getItem(cacheKey));
    const lastVisit = new Date(cachedStats ? cachedStats.timestamp : 0);

    // Если прошло больше 24 часов с момента последнего посещения или начался новый день
    if (!cachedStats || lastVisit.getDate() !== currentDay) {
        const newStats = getStatistics();
        localStorage.setItem(cacheKey, JSON.stringify(newStats));
        return newStats;
    }

    return cachedStats;
}

function incrementVisitCount(stats) {
    stats.viewCount += 1;
    return stats;
}

document.addEventListener('DOMContentLoaded', () => {
    let stats = updateStatistics();
    stats = incrementVisitCount(stats);

    document.getElementById('views').textContent = stats.viewCount;
    document.getElementById('calls').textContent = stats.calls;
    document.getElementById('emails').textContent = stats.emails;
    document.getElementById('forms').textContent = stats.forms;

    const now = new Date();
    const currentHour = now.getHours();
    const cacheKey = `statistics_${currentHour}`;
    localStorage.setItem(cacheKey, JSON.stringify(stats));

    // Обработчики событий для учета нажатий на телефон, почту и форму
    document.querySelector('a[href^="tel"]').addEventListener('click', () => {
        stats.calls += 1;
        localStorage.setItem(cacheKey, JSON.stringify(stats));
        document.getElementById('calls').textContent = stats.calls;
    });

    document.querySelector('a[href^="mailto"]').addEventListener('click', () => {
        stats.emails += 1;
        localStorage.setItem(cacheKey, JSON.stringify(stats));
        document.getElementById('emails').textContent = stats.emails;
    });

    document.querySelector('button[type="submit"]').addEventListener('click', () => {
        stats.forms += 1;
        localStorage.setItem(cacheKey, JSON.stringify(stats));
        document.getElementById('forms').textContent = stats.forms;
    });

    // Добавляем обработчик для перехода на страницу товара
    document.getElementById('submitBtn').addEventListener('click', () => {
        redirectToProductPage();
    });
});

/*смена фото при наведении на кнопку*/
document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.custom-item');

    items.forEach(item => {
        const button = item.querySelector('.custom-button');
        const image = item.querySelector('.custom-image');
        const originalSrc = image.src;
        const hoverSrc = button.getAttribute('data-hover-img');

        button.addEventListener('mouseover', function() {
            image.src = hoverSrc;
        });

        button.addEventListener('mouseout', function() {
            image.src = originalSrc;
        });
    });
});

/*лайк + количество купленных*/
document.addEventListener('DOMContentLoaded', function() {
    const likeButtons = document.querySelectorAll('.like-button');
    const likeCounts = document.querySelectorAll('.like-count');
    const soldCounts = document.querySelectorAll('.sold-count');

    // Функция для генерации случайного числа лайков (от 0 до 621)
    function generateRandomLikes() {
        return Math.floor(Math.random() * 621);
    }

    // Функция для вычисления продаж (2% от количества лайков)
    function calculateSales(likes) {
        return Math.ceil(likes * 0.02);
    }

    let initialLikes = []; // Массив для хранения начальных значений лайков
    let initialSales = []; // Массив для хранения начальных значений продаж

    // Инициализация лайков и продаж при первой загрузке страницы
    likeCounts.forEach(function(likeCount, index) {
        // Проверка, были ли уже инициализированы лайки на эту карточку
        let storedLikes = localStorage.getItem(`city_${index}_likes`);
        if (storedLikes !== null) {
            initialLikes[index] = parseInt(storedLikes);
        } else {
            initialLikes[index] = generateRandomLikes();
            localStorage.setItem(`city_${index}_likes`, initialLikes[index]);
        }

        initialSales[index] = calculateSales(initialLikes[index]);

        likeCount.textContent = initialLikes[index]; // Установка начального значения лайков
        soldCounts[index].textContent = initialSales[index]; // Установка начального значения продаж

        // Проверка, был ли уже отмечен лайк на этой карточке
        let isLiked = localStorage.getItem(`city_${index}_liked`);
        if (isLiked !== null) {
            likeButtons[index].disabled = true; // Если отмечен, делаем кнопку неактивной
        }
    });

    // Добавление обработчика события клика на каждую кнопку лайка
    likeButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            let currentLikes = parseInt(likeCounts[index].textContent);
            let newLikes = currentLikes + 1;

            // Обновление отображения лайков
            likeCounts[index].textContent = newLikes;

            // Сохранение нового значения лайков в localStorage
            localStorage.setItem(`city_${index}_likes`, newLikes.toString());

            // Сохранение информации о том, что лайк на этой карточке уже был отмечен
            localStorage.setItem(`city_${index}_liked`, 'true');

            // Делаем кнопку неактивной после нажатия
            button.disabled = true;

            // Продажи не изменяются при увеличении лайков, используем изначальное значение
            soldCounts[index].textContent = initialSales[index];
        });
    });

    // Функция для проверки наступления нового дня (полночь) и сброса данных
    function checkNewDayAndReset() {
        let now = new Date();
        let currentHour = now.getHours();
        let currentMinute = now.getMinutes();

        // Если наступила полночь, сбрасываем данные
        if (currentHour === 0 && currentMinute === 0) {
            resetData();
        }
    }

    // Функция для сброса данных
    function resetData() {
        // Очищаем localStorage для лайков и продаж
        localStorage.clear();

        // Перезагружаем страницу для начала с новыми данными
        location.reload();
    }

    // Устанавливаем интервал для проверки наступления нового дня (каждую минуту)
    setInterval(checkNewDayAndReset, 60000);

    // Пример изменения лайков и продаж каждый час
    setInterval(function() {
        likeCounts.forEach(function(likeCount, index) {
            let currentLikes = parseInt(likeCount.textContent);
            let increase = Math.floor(Math.random() * 39); // случайное увеличение от 0 до 10

            let newLikes = currentLikes + increase;
            likeCount.textContent = newLikes;

            // Обновление сохраненного значения лайков в localStorage
            localStorage.setItem(`city_${index}_likes`, newLikes.toString());
        });
    }, 3600000); // Каждый час (в миллисекундах)

});


