# Поле ввода

figma: [https://www.figma.com/file/LavZmQfQccqyrTMzoSJYNu/CSS-Course?node-id=18342%3A1](https://www.figma.com/file/LavZmQfQccqyrTMzoSJYNu/CSS-Course?node-id=18342%3A1)

Самое обычное - `input type="text"`.

Не забудьте учесть состояния:
- `:focus`
- `_invalid`
- `_success`
- `_success:focus`
- `_invalid:focus`

Для `_success` и `_invalid` используем БЭМ-модификаторы, а не их CSS-братья `:valid` и `:invalid`, так как возможности CSS в данном случае не так велики, как JS. Если в форме регистрации придет ошибка, что такой email уже зарегистрирован, то нужно уметь выставить состояние `invalid` через JS. Также не всегда момент валидации через CSS совпадает с желаемым моментом валидации поля по дизайну.

В общем случае можно сделать `input` недоступным для ввода через `:disabled`.
Можно предусмотреть и это состояние - задание по желанию, со звездочкой :D
