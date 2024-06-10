function showCityInfo(cityId) {
    const cityDetails = document.querySelectorAll('.city-details');
    cityDetails.forEach(city => {
        city.style.display = 'none';
    });

    const selectedCity = document.getElementById(cityId);
    selectedCity.style.display = 'flex';
}

// Функция для подключения внешнего HTML-файла к элементу с определенным id
function includeHTML(id, url) {
    const element = document.getElementById(id);
    if (element) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                element.innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    } else {
        console.error("Element with id '" + id + "' not found.");
    }
}

// Подключаем содержимое HTML-файла к элементу с id "city-info"
window.onload = function() {
    includeHTML("city-info", "/stadte-in-deutschland/city_info/city_info.html");
};