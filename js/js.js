// Получаем все кнопки навигации
const navButtons = document.querySelectorAll('.btn-nav')

// Получаем все блоки контента
const contentBlocks = document.querySelectorAll('.block')

// Функция, которая добавляет класс "active" к активной кнопке
function setActiveNavButton(index) {
	navButtons.forEach((button, i) => {
		if (i === index) {
			button.classList.add('active')
		} else {
			button.classList.remove('active')
		}
	})
}

// Функция, которая определяет, какой блок в данный момент виден на экране
function determineActiveBlock() {
	const windowHeight = window.innerHeight
	const scrollY = window.scrollY

	contentBlocks.forEach((block, index) => {
		const blockTop = block.getBoundingClientRect().top
		const blockBottom = blockTop + block.clientHeight

		if (blockTop <= windowHeight / 2 && blockBottom >= windowHeight / 2) {
			setActiveNavButton(index)
		}
	})
}

// Слушатель события прокрутки страницы для определения активного блока
window.addEventListener('scroll', determineActiveBlock)

// Вызываем функцию при загрузке страницы для начальной установки активной кнопки
determineActiveBlock()

// Обработчик события клика на кнопки навигации
navButtons.forEach((button, index) => {
	button.addEventListener('click', () => {
		// Используем scrollIntoView для перемещения к соответствующему блоку
		contentBlocks[index].scrollIntoView({ behavior: 'smooth' })
	})
})





// Получаем кнопку "Show my skills" и элемент секции skill-container
const showSkillsButton = document.querySelector('.skills');
const skillContainer = document.querySelector('.skills-container');
const foto2 = document.querySelector(".foto2");

// Устанавливаем начальное состояние кнопки
let isSkillsVisible = false;

// Добавляем обработчик события на кнопку "Show my skills"
showSkillsButton.addEventListener('click', function () {
  if (isSkillsVisible) {
    // Если навыки видимы, скрываем их и меняем текст кнопки на "Show my skills"
    skillContainer.style.display = 'none';
    showSkillsButton.textContent = 'Meine Fähigkeiten anzeigen'
    foto2.style.display = "flex";
  } else {
    // Если навыки скрыты, показываем их и меняем текст кнопки на "Hide my skills"
    skillContainer.style.display = 'flex';
    showSkillsButton.textContent = 'Meine Fähigkeiten ausblenden'
    foto2.style.display = "none";
  }

  // Инвертируем состояние переменной
  isSkillsVisible = !isSkillsVisible;
});


// Получаем все кнопки slider-nav и изображение
const sliderNavButtons = document.querySelectorAll('.slider-nav');
const sliderImage = document.querySelector('.reviews .portrait');
const sliderItems = document.querySelectorAll('.slider-item');

let currentIndex = 0; // Индекс активного слайда
let autoChangeTimer; // Таймер для автоматической смены слайдов

// Функция для смены слайда по индексу
function changeSlide(index) {
    if (index !== currentIndex) {
        sliderNavButtons[currentIndex].classList.remove('selected');
        sliderItems[currentIndex].style.display = 'none';
        currentIndex = index;
        sliderNavButtons[currentIndex].classList.add('selected');
        sliderItems[currentIndex].style.display = 'flex';
        const newContent = sliderItems[currentIndex].getAttribute('data-content');
        // Обновите контент на странице, используя newContent
    }
}

// Функция для автоматической смены слайдов
function autoChangeSlide() {
    const nextIndex = (currentIndex + 1) % sliderNavButtons.length;
    changeSlide(nextIndex);
    var imgSrc = sliderItems[nextIndex].getAttribute('data-img-src');
    sliderImage.src = imgSrc;
}

// Начинаем автоматическую смену слайдов с интервалом в 2 секунды
autoChangeTimer = setInterval(autoChangeSlide, 2000);

// Длительность показа слайда после клика (в миллисекундах)
const slideShowDurationAfterClick = 8000;

// Обработчик клика на кнопках слайдера
sliderNavButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        clearTimeout(autoChangeTimer);
        changeSlide(index);
        var imgSrc = sliderItems[index].getAttribute('data-img-src');
        sliderImage.src = imgSrc;

        autoChangeTimer = setTimeout(() => {
            autoChangeSlide();
            autoChangeTimer = setInterval(autoChangeSlide, 2000);
        }, slideShowDurationAfterClick);
    });
});

// Изначально устанавливаем первый слайд и начинаем автоматическую смену
changeSlide(currentIndex);

// Добавляем обработчики свайпа на мобильных устройствах
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
            const prevIndex = (currentIndex - 1 + sliderNavButtons.length) % sliderNavButtons.length;
            changeSlide(prevIndex);
        } else {
            const nextIndex = (currentIndex + 1) % sliderNavButtons.length;
            changeSlide(nextIndex);
        }
    }
}


    // Получаем ссылки на все обязательные элементы ввода
   
	const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageTextarea = document.getElementById('message');
    const sendButton = document.getElementById('sendButton');

    // Функция для проверки валидности элементов ввода
    function validateInputs() {
        const isValidName = nameInput.value.trim() !== '';
        const isValidEmail = emailInput.value.trim() !== '';
        const isValidMessage = messageTextarea.value.trim() !== '';

        // Присваиваем класс "mana" валидным элементам ввода
        nameInput.classList.toggle('mana', isValidName);
        emailInput.classList.toggle('mana', isValidEmail);
        messageTextarea.classList.toggle('mana', isValidMessage);

        // Проверяем, все ли обязательные поля заполнены
        if (isValidName && isValidEmail && isValidMessage) {
            sendButton.classList.add('mana'); // Если все поля заполнены, присваиваем класс "mana" кнопке
        } else {
            sendButton.classList.remove('mana'); // В противном случае удаляем класс "mana" с кнопки
        }
    }

    // Добавляем слушатели событий на элементы ввода для проверки при изменении
    nameInput.addEventListener('input', validateInputs);
    emailInput.addEventListener('input', validateInputs);
    messageTextarea.addEventListener('input', validateInputs);



	// Получаем кнопку "down" по классу
const downButton = document.querySelector('.down');

// Получаем блок "about me" по атрибуту data-index
const aboutMeBlock = document.querySelector('.block[data-index="1"]');

// Добавляем обработчик события клика на кнопку "down"
downButton.addEventListener('click', function () {
    // Используем метод scrollIntoView для плавной прокрутки к блоку "about me"
    aboutMeBlock.scrollIntoView({ behavior: 'smooth' });
});

// Получаем кнопку "hireme" по классу
const hireMeButton = document.querySelector('.hireme');

// Получаем блок "service" по атрибуту data-index
const serviceBlock = document.querySelector('.block[data-index="5"]');

// Добавляем обработчик события клика на кнопку "hireme"
hireMeButton.addEventListener('click', function () {
    // Используем метод scrollIntoView для плавной прокрутки к блоку "service"
    serviceBlock.scrollIntoView({ behavior: 'smooth' });
});
// Получаем кнопку "arrow" по классу
const arrowButton = document.querySelector('.arrow');

// Добавляем обработчик события клика на кнопку "arrow"
arrowButton.addEventListener('click', function () {
    // Используем метод scrollIntoView для плавной прокрутки к началу страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Получаем элемент футера по тегу
const footer = document.querySelector('footer');

// Получаем кнопку "unten" по классу
const untenButton = document.querySelector('.unten');
const footerText = document.querySelector('.b3')
// Функция для проверки видимости футера
function isFooterVisible() {
    const footerRect = footer.getBoundingClientRect();
    return footerRect.top < window.innerHeight && footerRect.bottom >= 0;
}

// Функция для установки класса "active" на кнопке "unten" в зависимости от видимости футера
function updateUntenButton() {
    if (isFooterVisible()) {
        untenButton.classList.add('active');
        footerText.classList.add('active')
        arrowButton.classList.add('active')
    } else {
        untenButton.classList.remove('active');
        footerText.classList.remove('active')
        arrowButton.classList.remove('active')
    }
}

// Добавляем слушатель события прокрутки страницы
window.addEventListener('scroll', updateUntenButton);

// Устанавливаем начальное состояние кнопки "unten" при загрузке страницы
updateUntenButton();

// Добавляем слушатель события прокрутки страницы
window.addEventListener('scroll', updateUntenButton)

// Устанавливаем начальное состояние кнопки "unten" при загрузке страницы
updateUntenButton()

document.addEventListener('DOMContentLoaded', function () {
	const scrollbarTrack = document.getElementById('scrollbar-track')

	const updateScrollbarColor = () => {
		const scrollPercentage =
			(window.scrollY /
				(document.documentElement.scrollHeight - window.innerHeight)) *
			100
		const newColor = `linear-gradient(to bottom, #84212e ${scrollPercentage}%, transparent 0%)`

		scrollbarTrack.style.background = newColor
		scrollbarTrack.style.opacity = '1' // Показываем элемент
	}

	window.addEventListener('scroll', updateScrollbarColor)
	updateScrollbarColor() // Обновляем цвет дорожки скроллбара при загрузке страницы
})


// Идентификаторы вашего Contentful пространства и токен доступа
const spaceId = 'fana5mnl0cnv';
const accessToken = 'TWhWFg5LrI4Bt_hL0hN6FWUrXwuo5QRSMFXw2tzikuI';

// Создаем клиент Contentful
const client = contentful.createClient({
  space: spaceId,
  accessToken: accessToken,
});

// Функция для загрузки и отображения контента
function loadContent() {
  client
    .getEntries()
    .then(response => {
      console.log(response);
      // Получаем записи (контент) из Contentful
      const projects = response.items;

      // Получаем контейнер для проектов
      const container = document.querySelector('.portfolio-nav-container');

      // Очищаем контейнер
      container.innerHTML = '';

      // Отображаем каждый проект
      projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('portfolio-nav');

        // Используйте правильное имя поля (например, "image") в соответствии с вашей моделью данных Contentful
        const image = project.fields.image;

        // Проверка на наличие изображения перед его использованием
        if (
          image &&
          image.fields &&
          image.fields.file &&
          image.fields.file.url
        ) {
          const imageUrl = image.fields.file.url;

          // Извлекаем текст описания из объекта "description"
          const descriptionText = project.fields.description;

          // Создаем HTML для проекта (подставьте свои поля из Contentful)
          projectDiv.innerHTML = `
    <div class="background">
        <img src="${imageUrl}" alt="${project.fields.title}">
    </div>
    <div class="onhover">
        <h1 class="title">${project.fields.title}</h1>
        <p class="description">${descriptionText}</p>
        <button><a href="${project.fields.link}" target="_blank">Öffnen</a></button>
    </div>
  `;

          // Добавляем проект в контейнер
          container.appendChild(projectDiv);

          // Добавляем обработчик события клика для текущей карточки
          projectDiv.addEventListener('click', () => {
            // Проверяем, есть ли класс "open" у текущей карточки
            const isOpen = projectDiv.classList.contains('open');

            // Удаляем класс "open" у всех карточек
            const allProjects = document.querySelectorAll('.portfolio-nav');
            allProjects.forEach(item => {
              item.classList.remove('open');
            });

            // Если класс "open" не был у текущей карточки, добавляем его
            if (!isOpen) {
              projectDiv.classList.add('open');
            }
          });
        }
      });
    })
    .catch(console.error);
}

// Загружаем контент после полной загрузки DOM-дерева
document.addEventListener('DOMContentLoaded', () => {
  loadContent();
});


  
// Находим кнопку и модальное окно
var openModalButton = document.getElementById("openModalButton");
var fullscreenModal = document.getElementById("fullscreenModal");
var closeModalButton = document.getElementById("closeModalButton");

// Открывает модальное окно
openModalButton.addEventListener("click", function() {
    fullscreenModal.style.display = "block";
});

// Закрывает модальное окно
closeModalButton.addEventListener("click", function() {
    fullscreenModal.style.display = "none";
});

// Закрывает модальное окно при клике вне его
window.addEventListener("click", function(event) {
    if (event.target == fullscreenModal) {
        fullscreenModal.style.display = "none";
    }
});// Находим кнопку и модальное окно
var openModalButton = document.getElementById("openModalButton");
var fullscreenModal = document.getElementById("fullscreenModal");
var closeModalButton = document.getElementById("closeModalButton");
var body = document.body;

// Открывает модальное окно
openModalButton.addEventListener("click", function() {
    fullscreenModal.classList.add("open"); // Добавляем класс "open"
    body.classList.add("open-modal"); // Добавляем класс для отключения скроллинга
});

// Закрывает модальное окно
closeModalButton.addEventListener("click", function() {
    fullscreenModal.classList.remove("open"); // Убираем класс "open"
    body.classList.remove("open-modal"); // Убираем класс для включения скроллинга
});

// Закрывает модальное окно при клике вне его
window.addEventListener("click", function(event) {
    if (event.target == fullscreenModal) {
        fullscreenModal.classList.remove("open"); // Убираем класс "open"
        body.classList.remove("open-modal"); // Убираем класс для включения скроллинга
    }
});







document
	.getElementById('sendButton')
	.addEventListener('click', function (event) {
		event.preventDefault() // Отменяем стандартное поведение отправки формы

		const name = document.getElementById('name').value.trim()
		const email = document.getElementById('email').value.trim()
		const message = document.getElementById('message').value.trim()

		// Проверка на заполнение обязательных полей
		if (name === '' || email === '' || message === '') {
			alert('Fühlen Sie alle benotige Pfelder aus, bitte')
			return // Останавливаем выполнение функции
		}

		// Проверка на корректность email с использованием регулярного выражения
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			alert('Schreiben Sie eine Korrekte E-Mail, bitte.')
			return // Останавливаем выполнение функции
		}

		// Если все проверки прошли успешно, можно отправить данные
		const company = document.getElementById('company').value.trim()

		const botToken = '6495569227:AAFWgyr05DE59rVVz9WtbG1hW2P7LK6gsm8'
		const chatId = '-1001901970344'
		const text = `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nMessage: ${message}`

		fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chat_id: chatId,
				text: text,
			}),
		})
			.then(response => response.json())
			.then(data => {
				if (data.ok) {
					alert('Dankeschön! Ihre Nachricht wurde erfolgereich gesendet.')
					// Очищаем поля формы после успешной отправки
					document.getElementById('name').value = ''
					document.getElementById('company').value = ''
					document.getElementById('email').value = ''
					document.getElementById('message').value = ''
				} else {
					alert('Es wurde nicht geklapt!.')
				}
			})
			.catch(error => {
				console.error('Ошибка при отправке сообщения в Telegram:', error)
			})
	})


