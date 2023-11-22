/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

	const movieDB = {
		movies: [
			"Логан",
			"Лига справедливости",
			"Ла-ла лэнд",
			"Одержимость",
			"Скотт Пилигрим против..."
		]
	};

	document.getElementsByClassName("promo__adv")[0].remove();
	document.getElementsByClassName("promo__genre")[0].innerHTML = "ДРАМА";
	document.querySelector(".promo__bg").style.backgroundImage = "url(img/bg.jpg)";

	const form = document.querySelector("form.add"),
		inpObj = form.querySelector(".adding__input"),
		isFav = form.querySelector("[type='checkbox']");

	function dispMovList() {
		const movList = document.querySelector(".promo__interactive-list");
		movList.innerHTML = "";
		movieDB.movies.sort();
		movieDB.movies.forEach((it, i) => {
			movList.innerHTML += `
				<li class="promo__interactive-item">${i + 1} - ${it}
				<div class="delete"></div>
				</li>
			`;
		});

		document.querySelectorAll(".delete").forEach((it, i) => {
			it.addEventListener("click", () => {
				movieDB.movies.splice(i, 1);
				dispMovList();
			});
		});
	}

	dispMovList();

	function addMovie(inp) {
		movieDB.movies.push(inp);
		dispMovList();
	}

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		let newMov = inpObj.value.trim();
		if (newMov.length > 21) newMov = newMov.slice(0, 18) + "...";

		if (newMov && newMov.length > 1) addMovie(newMov.toUpperCase());

		(isFav.checked && newMov) ? console.log("Добавляем любимый фильм") : null;

		e.target.reset();
	});


});