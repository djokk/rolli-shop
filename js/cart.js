// Div внутри корзины, в который мы добавляем товары
const cartWrapper = document.querySelector('.cart-wrapper');

// Отслеживаем клик на странице
window.addEventListener('click', (event) => {

	// Проверяем что клик был совершен по кнопке "Добавить в корзину"
	if (event.target.hasAttribute('data-cart')) {
		// Находим карточку с товаром, внутри котрой был совершен клик
		const card = event.target.closest('.card');

		// Собираем данные с этого товара и записываем их в единый объект productInfo
		const productInfo = {
			id: card.dataset.id,
			imgSrc: card.querySelector('.product-img').getAttribute('src'),
			title: card.querySelector('.item-title').innerText,
			itemsInBox: card.querySelector('[data-items-in-box]').innerText,
			weight: card.querySelector('.price__weight').innerText,
			price: card.querySelector('.price__currency').innerText,
			counter: card.querySelector('[data-counter]').innerText,
		};

		// Проверять если ли уже такой товар в корзине
		const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
		// Если товар есть в корзине
		if (itemInCart) {
			const counterElement = itemInCart.querySelector('[data-counter]');
			counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
		}
		// Если товара нет в корзине
		else {
			// Собранные данные подставим в шаблон для товара в корзине
			const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
															<div class="cart-item__top">
																	<div class="cart-item__img">
																		<img src="${productInfo.imgSrc}" alt="">
																	</div>
																	<div class="cart-item__desc">
																		<div class="cart-item__title">${productInfo.title}</div>
																		<div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>
																		<!-- cart-item__details -->
																		<div class="cart-item__details">
																			<div class="items items--small counter-wrapper">
																				<div class="items__control" data-action="minus">-</div>
																				<div class="items__current" data-counter="">${productInfo.counter}</div>
																				<div class="items__control" data-action="plus">+</div>
																			</div>
																			<div class="price">
																				<div class="price__currency">${productInfo.price}</div>
																			</div>
																		</div>
																</div>
															</div>
														</div>`;

			// Отобразим товар в корзине
			cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
		}

		// Сбрасываем счетчик кол-ва товара который только что добавили в корзину
		card.querySelector('[data-counter]').innerText = '1';
		toggleCartStatus();
	}

});

// Функция показать/скрытия Корзина пустаб пересчета суммы заказа
const toggleCartStatus =  () => {
	const cartEmpty = document.querySelector('[data-cart-empty]');
	const cartTotal = document.querySelector('.cart-total');
	const orderForm = document.querySelector('#order-form');

	// Показываем или скрываем определенные элементы в корзине
	// Проверяем есть ли в корзине товары (наличие тегов с классом .cart-item)
	// Есть в корзине ТОВАРЫ
	if(cartWrapper.querySelectorAll('.cart-item').length > 0){
		cartEmpty.classList.add('none');
		cartTotal.classList.remove('none');
		orderForm.classList.remove('none');
	}
	// Если корзина ПУСТА
	else {
		cartEmpty.classList.remove('none');
		cartTotal.classList.add('none');
		orderForm.classList.add('none');
	}
	
	// Пересчитываем стоимость заказа
	let totalPrise = 0;
	cartWrapper.querySelectorAll('.cart-item').forEach((item) => {
		const counter = item.querySelector('[data-counter]').innerText;
		const priceOneItem = item.querySelector('.price__currency').innerText;
		const price = parseInt(counter) * parseInt(priceOneItem);
		totalPrise += price;
		if(totalPrise >= 1000){
			cartTotal.querySelector('.delivery-cost').textContent = 'бесплатно'
		}else{
			cartTotal.querySelector('.delivery-cost').textContent = '300р'
		}
	})
	console.log(totalPrise);
	cartTotal.querySelector('.total-price').innerText = totalPrise;
}

