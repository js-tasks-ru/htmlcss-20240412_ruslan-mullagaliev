# Аккордеон

Связка тегов `<summary>` и `<details>` представляет собой раскрывающийся виджет, показывающий дополнительную информацию.

figma: [https://www.figma.com/file/LavZmQfQccqyrTMzoSJYNu/csscourse1?node-id=17129%3A224](https://www.figma.com/file/LavZmQfQccqyrTMzoSJYNu/csscourse1?node-id=17129%3A224)

## Поддержка

95% поддержки в целом. Не поддерживается в Internet Explorer.

[caniuse](https://caniuse.com/details)

## Тонкости

1. Обратите внимание, что `summary` по-умолчанию имеет `display: inline`. Поменяйте, если это необходимо.

2. За стрелочку в `summary` отвечает псевдоэлемент `::-webkit-details-marker`. Так как пока что не изучали, как прибивать элементы к краям контейнера, то скрываем нативную так, а свою сделаем позже:
    ```css
    .accordion__summary::-webkit-details-marker {  /* нестандартный псевдоэлемент Google Chrome */
        display: none;
    }
    ```
3. Между пунктами в аккордеоне есть внешние отступы, но у последнего пункта отступа вниз быть не должно. Решение этой проблемы может выглядеть так:
    ```css
    .accordion__item {
        margin-bottom: 8px;
    }

    .accordion__item:last-child {
        margin-bottom: 0;
    }
    ```
4. При открытии аккордеона, у тега `details` добавляется атрибут `open`.

Пока что пункты аккордеона раскрываются без анимации. Но с фантазией, можете добавить в аккордеон любой текст :)
