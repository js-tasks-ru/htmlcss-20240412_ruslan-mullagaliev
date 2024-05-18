# Бургер-меню

figma: [https://www.figma.com/file/LavZmQfQccqyrTMzoSJYNu/CSS-Course?node-id=18829%3A452](https://www.figma.com/file/LavZmQfQccqyrTMzoSJYNu/CSS-Course?node-id=18829%3A452)

Бургер-меню называется таким, потому что открывается через кнопку, похожую на бургер.

Нужно, чтобы оно плавно выезжало и также плавно заезжало обратно за плоскость экрана.

Можно сделать с помощью чекбокса и бургера в теге `<label>`, можно с помощью js.

js-скрипт уже подключен к html и лежит рядом - `burger-menu.js`. Он делает следующее:
- По клику на элемент с id `burger-menu-open` назначает элементу с id `burger-menu` атрибут `data-open`.
- По клику на элемент с id `burger-menu-close` удаляет с элемента с id `burger-menu` атрибут `data-open`.

Не забывайте, что меню отображается только на мобильных устройствах. `display: none` для десктопов будет приятным дополнением.
