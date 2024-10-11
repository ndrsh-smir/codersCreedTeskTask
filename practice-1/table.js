let data;

function getData() {
    const url = 'https://jsonplaceholder.typicode.com/posts'; // Сохраняем ссылку
    
    fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()) // Обрабатываем промис
    .then(json => {
        data = json; // Сохраняем спаршенные данные и создаем таблицу
        showTable(data);
        })
    .catch(error => console.log(error)); 
}

function showTable(data){ // Функция первичного отображения таблицы данных
    const main = document.querySelector('.main');
    const tableWrapper = document.querySelector('.table-wrapper');
    tableWrapper.innerHTML = '';

    const searchWrapper = document.createElement('div');
    searchWrapper.classList.add('table__search-wrapper');

    const tableSearch = document.createElement('input');
    tableSearch.classList.add('table__search');
    tableSearch.addEventListener('input', tableSearchHandler);

    searchWrapper.append(tableSearch);

    tableWrapper.append(searchWrapper);

    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    Object.keys(data[0]).forEach(key => { // Добавление ряда заголовков таблицы
        const th = document.createElement('th');
        th.classList.add('table__header-el');
        th.setAttribute('data-column', `${key}`);
        th.setAttribute('data-sort', 'inc');
        th.textContent = key;
        headerRow.append(th);
    });

    thead.append(headerRow);
    table.append(thead);

    const tbody = document.createElement('tbody');

    data.forEach(item => {  // Добавление элементов в таблицу
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.append(td);
        });
        tbody.append(row);
    });

    table.append(tbody);
    tableWrapper.append(table);
    main.append(tableWrapper);

    addTableSort();
}

function tableSearchHandler(e){ // функция поиска по таблице 
    let inputValue = e.target.value.toLowerCase()
    const table = document.querySelector('table');
    const rows = table.querySelectorAll('tbody > tr'); 

    rows.forEach(row => {
        const elements = row.querySelectorAll('td'); // получаем данные из ряда
        let flag = false;
 
        elements.forEach(element => {  // проверяем есть ли искомое в данных
            if (element.innerText.toLowerCase().includes(`${inputValue}`)){
                flag = true; 
            } 
        });

        (flag) ? row.style.display = '' : row.style.display = 'none'; // скрываем если нет
    });
}


function sortTable(key, order){  // сортировка данных
    if (key === 'id' || key === 'userId'){ // проверяем сравниваем ли мы строки или цифры
        data.sort((data1, data2) => { // сортируем
            if (order === 'inc'){ // проверяем по убыванию или возрастанию
                return data1[key] > data2[key] ? 1 : -1;
            } else {
                return data1[key] < data2[key] ? 1 : -1;
            }
        });
    } else{
        data.sort((data1, data2) => {
            if (order == 'inc'){
                return data1[key].localeCompare(data2[key]);
            } else {
                return data2[key].localeCompare(data1[key]);
            }
        });
    }

    showSortedTable(data);  // рендерим отсортированные данные
}


function addTableSort(){  // вешаем на ряд заголовков обработчик клика с сортировкой  
    const headerRow = document.querySelectorAll('th');
    
    headerRow.forEach(el => {
        el.addEventListener('click', () => {
            const key = el.getAttribute('data-column');  // считываем мета атрибуты
            let order = el.getAttribute('data-sort');
            
            const newOrder = (order === 'inc') ? 'dec' : 'inc';  // меняем мета атрибуты

            el.setAttribute('data-sort', newOrder);  // меняем мета атрибуты

            sortTable(key, order);  // вызываем функцию сортировки
        })
    });
}

function showSortedTable(){   // Рендерим отсортированные данные
    const table = document.querySelector('table');
    const tableWrapper = document.querySelector('.table-wrapper');

    const tbody = document.querySelector('tbody');

    tbody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.append(td);
        });
        tbody.append(row);
    });

    table.append(tbody);
    tableWrapper.append(table);
}
