// Функция для загрузки содержимого с заданного URL в указанный элемент
function loadContent(url, elementId) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.getElementById(elementId).innerHTML = xhr.responseText;
                loadCSS('/public/warning/warning.css'); // Подключаем стили после загрузки содержимого
            } else {
                console.error('Ошибка загрузки страницы:', xhr.status);
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

// Функция для загрузки стилей
function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

// Выполняем загрузку содержимого файла warning.html в элемент с id "warning"
window.addEventListener('DOMContentLoaded', function() {
    loadContent('/public/warning/warning.html', 'warning');
});