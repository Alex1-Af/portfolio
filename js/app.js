/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/functions.js
function isWebP() {
	function testWebP(callback) {

		let webP = new Image();
		webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	testWebP(function (support) {

		if (support == true) {
		document.querySelector('body').classList.add('webp');
		} else {
		document.querySelector('body').classList.add('no-webp');
		}
		
	});
}






;// CONCATENATED MODULE: ./src/js/modules/myLib.js
function initializeMyLib() {
	window.myLib = {};
	myLib.body = document.querySelector('body');

	window.myLib.closestAttr = function (item, attr) {
		let node = item;
		while (node) {
			let attrValue = node.getAttribute(attr);
			if (attrValue) {
				return attrValue;
			}
			node = node.parentElement;
		}
		return null;
	};
	window.myLib.closestItemByClass = function (item, className) {
		let node = item;
		while (node) {
			if (node.classList.contains(className)) {
				return node;
			}
			node = node.parentElement;
		}
		return null;
	};
	window.myLib.addScroll = function () {
		myLib.body.classList.add('_lock');
	};
	window.myLib.removeScroll = function () {
		myLib.body.classList.remove('_lock');
	};
}
;// CONCATENATED MODULE: ./src/js/modules/pop-up.js
function initPopup(targetElement, e) {


	// Проверяем, что клик был по элементу с классом .popup-link
	const target = targetElement.closest('.popup-link');
	if (!target) return;



	// Получаем класс попапа из data-атрибута
	const popupClass = target.dataset.popup;
	if (!popupClass) return;
	// Получаем data-work для определения активного элемента
	const workShow = target.dataset.work;

	// Находим попап по классу
	const popup = document.querySelector(`.${popupClass}`);
	if (!popup) return;


	// Находим активный элемент внутри попапа
	const work = popup.querySelector(`.${workShow}`);


	// Скрываем все элементы item-popup, кроме активного
	const allItems = popup.querySelectorAll('.item-popup');
	allItems.forEach(item => {
		item.style.display = 'none';
	});
	if (work) {
		work.style.display = 'block';
	}

	e.preventDefault();

	// Переменные
	const lockPadding = myLib.body.querySelectorAll('.lock-padding');
	let unlock = true;
	const timeout = 800;

	const showPopup = function (target) {
		if (!unlock) return;
		// Сброс скролла перед открытием
		work.closest('.popup-works').scrollTop = 0;
		target.classList.add('is-active');


	};

	const closePopup = function (target) {
		if (!unlock) return;
		target.classList.remove('is-active');
		// Удаляем обработчики событий после закрытия попапа
		myLib.body.removeEventListener('keydown', handleKeydown);
		myLib.body.removeEventListener('click', handleClosePopup);
	};


	const closeScroll = function () {
		const lockPaddingValue = window.innerWidth - myLib.body.querySelector('.wrapper').offsetWidth + 'px';

		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = lockPaddingValue;
			}
		}
		window.myLib.body.style.paddingRight = lockPaddingValue;
		myLib.addScroll();

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	};

	const showScroll = function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		window.myLib.body.style.paddingRight = '0px';
		myLib.removeScroll();

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	};

	if (popup) {
		showPopup(popup);
		closeScroll();
	}
	// Обработчик закрытия попапа
	const handleClosePopup = (e) => {
		const target = e.target;

		// Закрываем попап при клике на кнопку закрытия или вне контента
		if (target.classList.contains('popup-close') || target.classList.contains('popup__inner')) {
			const popup = window.myLib.closestItemByClass(target, 'popup');
			closePopup(popup);
			showScroll();
		}
	};

	// Обработчик закрытия попапа по клавише Esc
	const handleKeydown = (e) => {
		if (e.key === 'Escape') {
			const activePopup = myLib.body.querySelector('.popup.is-active');
			if (activePopup) {
				closePopup(activePopup);
				showScroll();
			}
		}
	};
	// Добавляем обработчики событий
	myLib.body.addEventListener('keydown', handleKeydown);
	myLib.body.addEventListener('click', handleClosePopup);

}




;// CONCATENATED MODULE: ./src/js/modules/scroll-menu.js
function initScrollMenu(targetElement, e) {

	const menuScroll = myLib.body.querySelectorAll('.menu__scroll'); //прокрутка при клике

	if (!menuScroll.length) return;

	if (!targetElement.classList.contains('menu__scroll')) return;

	if (targetElement.href.includes('#') && myLib.body.querySelector('.' + targetElement.href.split("#")[1])) {
		e.preventDefault();
		const gotoBlock = document.querySelector('.' + targetElement.href.split("#")[1]);
		const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - myLib.body.querySelector('header').offsetHeight;
		
		//функция прокрутки behavior: "smooth" плавно
		window.scrollTo({
			top: gotoBlockValue,
			behavior: "smooth"
		});
	}


}
;// CONCATENATED MODULE: ./src/js/modules/scroll-up.js
function initScrollUp(targetElement) {
	if (targetElement.closest('.scroll-up')) {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
}
;// CONCATENATED MODULE: ./src/js/modules/click.js




function initClick() {
	myLib.body.addEventListener("click", function (e) {

		const targetElement = e.target;
		initPopup(targetElement, e);
		initScrollMenu(targetElement, e); //скролл меню
		initScrollUp(targetElement); //стрелка вверх
	});

}
;// CONCATENATED MODULE: ./src/js/modules/preloader.js
function handlePreloader() {
	window.onload = function () {
		const pleloader = myLib.body.querySelector('#pleloader');
		myLib.body.classList.remove('_lock');
		myLib.body.classList.add('loaded');
		if (pleloader) { pleloader.classList.add('pleloader-active'); }
	}
}
;// CONCATENATED MODULE: ./src/js/modules/animation.js
function initAnimation() {
	const animItems = myLib.body.querySelectorAll('._anim-items');
	const offsetScroll = 600;
	const scrollUp = myLib.body.querySelector('.scroll-up');
	

	if (animItems.length > 0) {
		window.addEventListener('scroll', animOnScroll); //собітие при скроле
		function animOnScroll(params) {

			//=====================
			if (scrollY > offsetScroll) { //срелка вверх
				scrollUp.classList.add('_active');
			} else {
				scrollUp.classList.remove('_active');
			}
			//========================


			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index];
				const animItemHeigth = animItem.offsetHeight; //полную высоту элемента
				const animItemOffset = offset(animItem).top;// насколько обїект находится ниже чем верх страниці
				const animStart = 4; // регулирует момент старта анимаци при достижении 1/4 его вісоті

				let animItemPoint = window.innerHeight - animItemHeigth / animStart; //высота окна браузера - высота объекта

				if (animItemHeigth > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}
				if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeigth)) {
					//если прокрутили до позиции объекто - точка  старта но меньше чем похиция объекта + его высота
					animItem.classList.add('_active');
				} else {
					if (!animItem.classList.contains('_anim-no-hide')) {
						animItem.classList.remove('_active');
					}
				}
			}
		}
		function offset(el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.scrollX || document.documentElement.scrollLeft,
				scrollTop = window.scrollY || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
		}

		setTimeout(() => {
			animOnScroll();
		}, 300);

	}
}
;// CONCATENATED MODULE: ./src/js/modules/scroll-parallax-img.js
function initScrollParallaxImg() {

	document.addEventListener('scroll', () => {
		const scrollY = window.scrollY;
	
		// Параллакс для текста и иконок
		document.querySelectorAll('.js-parallax').forEach(element => {
			const speed = parseFloat(element.getAttribute('data-speed'));
			 const offset = scrollY * speed;
			element.style.transform = `translateY(${offset}px)`;
		});
	});
}

;// CONCATENATED MODULE: ./src/js/modules/mouse-parallax.js
function initMouseParallax() {
	
// Параллакс при движении мыши
myLib.body.addEventListener("mousemove", (event) => {
	const { clientX, clientY } = event; // Получаем координаты мыши
	const centerX = window.innerWidth / 2; // Центр экрана по X
	const centerY = window.innerHeight / 2; // Центр экрана по Y

	// Смещение курсора от центра экрана (от -1 до 1)
	const offsetX = (clientX - centerX) / centerX;
	const offsetY = (clientY - centerY) / centerY;

	// Применяем параллакс к элементам
	myLib.body.querySelectorAll('.js-parallax').forEach(element => {
		const speed = parseFloat(element.getAttribute('data-speed'));
		const moveX = offsetX * 50 * speed; // Смещение по X
		const moveY = offsetY * 50 * speed; // Смещение по Y

		// Комбинируем эффект скролла и мыши
		const scrollY = window.scrollY;
		const scrollOffset = scrollY * speed;
		element.style.transform = `translate(${moveX}px, ${moveY + scrollOffset}px)`;
		});
	});
}

;// CONCATENATED MODULE: ./src/js/modules/transform-text.js
function initRandomTransformText() {
	const consoleContainer = document.querySelector('.console-container');
	const text = consoleContainer.textContent; // Получаем текст
	consoleContainer.innerHTML = ''; // Очищаем контейнер

	// Разбиваем текст на символы
	let isInsideConsoleText = false; // Флаг для отслеживания, находимся ли мы внутри console-text
	const characters = text.split('').map((char, index) => {
		const span = document.createElement('span');
		span.textContent = char === ' ' ? '\u00A0' : char; // Заменяем пробелы на неразрывные пробелы

		// Если символ — это открывающая кавычка ", начинаем отслеживать console-text
		if (char === '"' && !isInsideConsoleText) {
			isInsideConsoleText = true;
		}
		// Если символ — это закрывающая кавычка ", прекращаем отслеживать console-text
		else if (char === '"' && isInsideConsoleText) {
			isInsideConsoleText = false;
		}

		// Если символ находится внутри "Hello World", добавляем класс console-text
		if (isInsideConsoleText || char === '"') {
			span.classList.add('console-text');
		}

		span.style.transform = getRandomTransform(); // Начальная случайная трансформация
		span.style.opacity = '0'; // Изначально символы невидимы
		return span;
	});

	// Добавляем символы в контейнер
	characters.forEach(span => consoleContainer.appendChild(span));

	// Сразу запускаем анимацию символов
	characters.forEach((span, index) => {
		setTimeout(() => {
			span.style.transform = 'translate(0, 0) scale(1) rotateY(0deg)'; // Возвращаем на место
			span.style.opacity = '1'; // Делаем видимым
		}, index * 100); // Задержка для каждого символа
	});

	// Запуск анимации рамки через 2 секунды после начала анимации текста
	setTimeout(() => {
		consoleContainer.classList.add('animate-border');
	}, 1000); // Задержка перед началом анимации рамки

	// Функция для случайной трансформации
	function getRandomTransform() {
		const translateX = (Math.random() - 0.5) * 500; // Больший разброс по X (-250px до 250px)
		const translateY = (Math.random() - 0.5) * 500; // Больший разброс по Y (-250px до 250px)
		const scale = Math.random() * 0.5 + 0.5; // Случайный масштаб (0.5 до 1)
		const rotateY = (Math.random() - 0.5) * 360; // Случайный поворот по Y (-180deg до 180deg)
		return `translate(${translateX}px, ${translateY}px) scale(${scale}) rotateY(${rotateY}deg)`;
	}

	///=========================// Функция для случайной трансформации
	function getRandomTransform() {
		const translateX = (Math.random() - 0.5) * 500; // Больший разброс по X (-250px до 250px)
		const translateY = (Math.random() - 0.5) * 500; // Больший разброс по Y (-250px до 250px)
		const scale = Math.random() * 0.5 + 0.5; // Случайный масштаб (0.5 до 1)
		const rotateY = (Math.random() - 0.5) * 360; // Случайный поворот по Y (-180deg до 180deg)
		return `translate(${translateX}px, ${translateY}px) scale(${scale}) rotateY(${rotateY}deg)`;
	}

	///=========================
}
;// CONCATENATED MODULE: ./src/js/modules/transform-icons.js
function initRandomTransformIcons() { 
	const techBlocks = myLib.body.querySelectorAll('.tech-icons-svg'); // Ищем все элементы

	if (!techBlocks.length) return;

	// Функция для случайной трансформации
	function getRandomTransform() {
		const translateX = (Math.random() - 0.5) * 500;
		const translateY = (Math.random() - 0.5) * 500;
		const scale = Math.random() * 0.5 + 0.5;
		const rotateY = (Math.random() - 0.5) * 360;
		return `translate(${translateX}px, ${translateY}px) scale(${scale}) rotateY(${rotateY}deg)`;
	}

	// Функция запуска анимации для конкретного блока
	function startAnimation(block) {
		Array.from(block.children).forEach((element) => {
			element.style.transform = getRandomTransform();
			element.style.opacity = '0';
		});

		Array.from(block.children).forEach((element, index) => {
			setTimeout(() => {
				element.style.transform = 'translate(0, 0) scale(1) rotateY(0deg)';
				element.style.opacity = '1';
			}, index * 300);
		});
	}

	// Запускаем наблюдатель для каждого блока
	techBlocks.forEach((block) => {
		const observer = new MutationObserver((mutationsList) => {
			for (const mutation of mutationsList) {
				if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
					if (block.classList.contains('_active')) {
						startAnimation(block);
						observer.disconnect(); // Останавливаем наблюдение после первого запуска
					}
				}
			}
		});

		observer.observe(block, { attributes: true });
	});
}

;// CONCATENATED MODULE: ./src/js/modules/tabs.js
function initTabs() {
	const worksContainer = myLib.body.querySelector('.works__container');

	// Делегирование событий на контейнер кнопок
	worksContainer.addEventListener('click', function (e) {
		// Проверяем, что клик был по кнопке
		if (e.target.classList.contains('works__button')) {
			// Убираем класс is-active у всех кнопок
			worksContainer.querySelectorAll('.works__button').forEach(button => {
				button.classList.remove('is-active');
			});

			// Добавляем класс is-active нажатой кнопке
			e.target.classList.add('is-active');

			// Получаем значение data-filter нажатой кнопки
			const filter = e.target.getAttribute('data-filter');

			// Фильтруем элементы работ
			filterWorks(filter);
		}
	});

	function filterWorks(filter) {
		const worksItems = document.querySelectorAll('.main-works__item');
  
		worksItems.forEach(item => {
			 const categories = item.getAttribute('data-category').split(',');
  
			 if (filter === 'all' || categories.includes(filter)) {
				  // Показываем элемент
				  item.classList.remove('hide');
				  item.style.display = 'block'; // Возвращаем элемент в поток
				  setTimeout(() => {
						item.classList.add('_active'); // Запускаем анимацию появления
				  }, 10); // Небольшая задержка для корректной анимации
			 } else {
				  // Скрываем элемент
				  item.classList.remove('_active'); // Убираем анимацию появления
				  item.classList.add('hide'); // Запускаем анимацию скрытия
  
				  // Удаляем элемент из потока после завершения анимации
				  setTimeout(() => {
						item.style.display = 'none';
				  }, 500); // Задержка должна соответствовать длительности анимации
			 }
		});
  }

}
;// CONCATENATED MODULE: ./src/js/modules/matrix.js
function initMatrixEffect() {


	const canvas = document.getElementById('matrixCanvas');
	if (!canvas) return;

	const ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const letters = 'アァイィウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const fontSize = 16;
	const columns = canvas.width / fontSize;
	const drops = Array(Math.floor(columns)).fill(1);

	function drawMatrix() {
		ctx.fillStyle = 'rgba(0, 26, 0, 0.1)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = '#0F0';
		ctx.font = `${fontSize}px monospace`;

		drops.forEach((y, i) => {
			const text = letters[Math.floor(Math.random() * letters.length)];
			ctx.fillText(text, i * fontSize, y * fontSize);

			if (y * fontSize > canvas.height && Math.random() > 0.975) {
				drops[i] = 0;
			}

			drops[i]++;
		});
	}

	setInterval(drawMatrix, 50);

	window.addEventListener('resize', () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});

}

// 
/**
 *  <canvas id="matrixCanvas"></canvas>
 * .competence {
  position: relative;
  background: #001a00;
  overflow: hidden;
}
#matrixCanvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
} 

 */
;// CONCATENATED MODULE: ./src/js/app.js
















initializeMyLib();
handlePreloader();  // window.onload
isWebP(); //поддержка WebP


// выполнение после загрузки страници
document.addEventListener("DOMContentLoaded", () => {
	// Инициализация UI компонентов
	initUIComponents();
});

function initUIComponents() {
	
	initClick(); //делегирование кликов
	initAnimation(); //анимация
	initScrollParallaxImg(); //скролл parallax картинок
	initMouseParallax(); // Параллакс при движении мыши
	initRandomTransformText(); // Функция для случайной трансформации текста
	initRandomTransformIcons(); // Функция для случайной трансформации блоков
	initTabs(); // Функция для табов
	initMatrixEffect(); // Функция эффекта матрица
}
/******/ })()
;