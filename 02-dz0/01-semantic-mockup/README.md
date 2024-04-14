# Семантическая разметка страницы (РЕШЕНИЕ)

Еще раз посмотрим, что должно получиться.

![Семантическая разметка страницы](../src/public/1.png)

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Семантическая разметка страницы</title>
    <!-- Здесь будут стили -->
  </head>
  <body>
    <!-- Здесь будет верстка -->
  </body>
</html>
```

## Добавьте на страницу семантические блоки
   - [header](#header)
   - [nav](#nav)
   - [main](#main-и-article)
   - [article](#main-и-article)
   - [footer](#footer)
[семантические блоки](#Результат)

### header
Смотрим на итоговую картинку. Первый сверху - `Header`. Это заголовок, и он должен быть вложен в семантический блок заголовка - тег `header`. Этот тег осуществляет секционирование страницы, а непосредственно текст заголовка страницы нужно вложить в `h1`.
```html
<header>
  <h1>Header</h1>
</header>
```

### nav
Следующий пункт - навигация.
Ее семантический тег - `nav`. Опционально, можно встроить ее в `header` страницы или добавить отдельным элементом. Пусть будет внутри заголовочного блока.

```html
<header>
  <h1>Header</h1>
  <nav>
    <a href="#">Navigation 1</a>
    <a href="#">Navigation 2</a>
    <a href="#">Navigation 3</a>
  </nav>
</header>
```

### main и article
Все, с заголовочной частью закончили. Дальше основной контент страницы - `main`, а внутри него две статьи.
```html
<main>
  <article>
    <!-- Статья с маркированным списком -->
  </article>
  <article>
    <!-- Статья с нумерованным списком -->
  </article>
</main>
```

В первой статье есть заголовок и маркированный список. Заголовок `h1` - заголовок страницы, а теперь нам нужен тот, что поменьше - `h2`.

Для маркированного списка используем `ul`. Для элемента маркированного списка - `li`.

```html
<article>
  <h2>Article 1</h2>
  <ul>
    <li>Оригинальная трилогия</li>
    <li>Трилогия приквелов</li>
    <li>Трилогия сиквелов</li>
  </ul>
</article>
```

С нумерованным списком поступаем так же, только тег списка теперь `ol`.

```html
<article>
  <h2>Article 2</h2>
  <ol>
    <li>Эпизод IV — Новая надежда</li>
    <li>Эпизод V — Империя наносит ответный удар</li>
    <li>Эпизод VI — Возвращение джедая</li>
  </ol>
</article>
```

### footer

Остался только `footer`. Его даже скучно разбирать. Положим в конец.

### Результат

Все сложим и получим:

```html autorun
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Семантическая разметка страницы</title>
    <!-- Здесь будут стили -->
  </head>
  <body>
    <header>
      <h1>Header</h1>
      <nav>
        <a href="#">Navigation 1</a>
        <a href="#">Navigation 2</a>
        <a href="#">Navigation 3</a>
      </nav>
    </header>
    <main>
      <article>
        <h2>Article 1</h2>
        <ul>
          <li>Оригинальная трилогия</li>
          <li>Трилогия приквелов</li>
          <li>Трилогия сиквелов</li>
        </ul>
      </article>
      <article>
        <h2>Article 2</h2>
        <ol>
          <li>Эпизод IV — Новая надежда</li>
          <li>Эпизод V — Империя наносит ответный удар</li>
          <li>Эпизод VI — Возвращение джедая</li>
        </ol>
      </article>
    </main>
    <footer>Footer</footer>
  </body>
</html>
```

_Здесь можно сходить за кофе!_

## Добавьте css

Стили будем задавать через селекторы класса, поэтому добавьте атрибут class каждому элементу, которому хотите задать стили и добавьте тег ```style``` в ```head```.

```html autorun
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Семантическая разметка страницы</title>
    <style>
      body {
        /* Цвет текста для всего документа (наследуется) */
        color: white;

        /* Стили браузеров задают внешние отступы для body, занулим их */
        margin: 0;
      }

      .header {
        /* Цвет фона */
        background: #FF0000;
        /* Выравнивание текста по центру */
        text-align: center;
      }

      .title {
        /* Размер шрифта */
        font-size: 85px;
        /* По-умолчанию у h1 есть отступ снизу, его можно убрать */
        margin: 0;
      }

      .navigation {
        background: #FF9900;
        /* Внутренний отступ у блока */
        padding: 20px;
      }

      .link {
        font-size: 40px;
        color: white;
        margin-right: 20px;
      }

      .main {
        background: #05A143;
        padding: 20px;
      }

      .article {
        background: #001AFF;
        padding: 20px;
        font-size: 30px;
        margin-bottom: 10px;
      }

      .footer {
        background: #BD00FF;
        text-align: center;
        font-size: 85px;
      }
    </style>
  </head>
  <body>
    <header class="header">
      <h1 class="title">Header</h1>
      <nav class="navigation">
        <a class="link" href="#">Navigation 1</a>
        <a class="link" href="#">Navigation 2</a>
        <a class="link" href="#">Navigation 3</a>
      </nav>
    </header>
    <main class="main">
      <article class="article">
        <h2>Article 1</h2>
        <ul>
          <li>Оригинальная трилогия</li>
          <li>Трилогия приквелов</li>
          <li>Трилогия сиквелов</li>
        </ul>
      </article>
      <article class="article">
        <h2>Article 2</h2>
        <ol>
          <li>Эпизод IV — Новая надежда</li>
          <li>Эпизод V — Империя наносит ответный удар</li>
          <li>Эпизод VI — Возвращение джедая</li>
        </ol>
      </article>
    </main>
    <footer class="footer">Footer</footer>
  </body>
</html>
```
