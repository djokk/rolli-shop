window.addEventListener('click', (event) => {
  if (event.target.hasAttribute('data-action')) {
    // От кнопки по которой кликнули находим обертку текущего счетчика
    const counterWrapper = event.target.closest('.counter-wrapper');
    // От обертки счетчика находим div c значением счетчика
    const counter = counterWrapper.querySelector('[data-counter]');

    if (event.target.dataset.action === 'plus') {
      // Изменяем текст в счетчике увеличивая его на 1
      counter.innerText = ++counter.innerText;

      if (event.target.closest('.cart-wrapper')) {
        // Пересчет суммы заказа, скрытие/показ блоков в корзине
        toggleCartStatus();
      } 
    } else if (event.target.dataset.action === 'minus') {
      // Проверка где находится товар - в каталоге или в корзине
      // Если товар в каталоге - то уменьшаем до 1
      if (event.target.closest('.cart-wrapper')) {
        if (parseInt(counter.innerText) > 1) {
          // Если кол-во больше единицы -> уменьшая на 1
          counter.innerText = --counter.innerText;
          toggleCartStatus();
        } else {
          event.target.closest('.cart-item').remove();

          toggleCartStatus();
        }
      } 
      // Иначе, если колв-во = 1, тогда удаляем товар из корзины
      else {
        // Уменьшаем счетчик только до 1
        if (parseInt(counter.innerText) > 1) {
          // Изменяем текст в счетчике уменьшая его на 1
          counter.innerText = --counter.innerText;
        }
      }
    }
  }
})