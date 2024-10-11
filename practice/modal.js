// Modal

const modal = document.querySelector('.modal');
const main = document.querySelector('.main');
const modalOpenBtn = document.querySelector('.modal-open-btn');
const modalCloseBtn = document.querySelector('.modal-close-btn');

modalOpenBtn.addEventListener('click', () => {  // Открытие модального окна
    modal.classList.remove('none');
    main.classList.add('none');
});

modalCloseBtn.addEventListener('click', () => {  // Закрытие модального окна
    modal.classList.add('none');
    main.classList.remove('none');
});

const fileInput = document.querySelector('input[type="file"]');
const fileInputWrapper = document.querySelector('.modal__file-img');


fileInputWrapper.addEventListener('click', () => fileInput.click()); // Вызов файлового инпута через обертку


// Обрабатываем изменения файлового инпута
function inputFileHandler(){
    if (fileInput.files.length > 0){
        let file = fileInput.files[0];
        let fileURL = URL.createObjectURL(file); 
        fileInputWrapper.style.backgroundImage = `url(${fileURL})`;  // Устанавливаем загруженное изображение фоном обертки
        fileInputWrapper.style.backgroundSize = 'cover';
        fileInputWrapper.innerHTML = '';
    } else{  // Возвращаем все к исходному виду в случае отмены добавления изображения 
        fileInputWrapper.innerHTML = '<img src="imgs/file-icon.svg" alt="Choose file">Выберите файл'
        fileInputWrapper.style.background = 'linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(/imgs/logo.png)';
        fileInputWrapper.style.backgroundSize = 'cover';
    }
}




