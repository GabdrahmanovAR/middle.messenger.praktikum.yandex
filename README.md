# Чат приложение [![Netlify Status](https://api.netlify.com/api/v1/badges/c7e183f3-d873-45ec-9b98-cd0ad938280e/deploy-status)](https://app.netlify.com/sites/ornate-churros-e697b5/deploys)
## _Проект Яндекс.Практикум_

## Оглавление

- [**Стек технологий**](#stack)
- [**Установка**](#install)
- [**Деплой**](#deploy)
- [**Макет**](#maket)
- [**Маршруты приложения**](#routes)
- [**Линтинг и тестирование кода**](#check)

<a name="stack"></a>

## Стек технологий
- Разработка
[express](https://expressjs.com/ru/) + [typescript](https://www.typescriptlang.org/) + [sass](https://sass-lang.com/) + [vite](https://vitejs.dev/) + [handlebars](https://handlebarsjs.com/)
- Тестирование
[mocha](https://mochajs.org/) + [chai](https://www.chaijs.com/) + [sinon](https://sinonjs.org/)

<a name="install"></a>

## Установка

Проекту необходим [Node.js](https://nodejs.org/) v18.18 || >=v20 для запуска.

Установка зависимостей и запуск сервера для разработки. Проект открывается на 3000 порту.

```sh
npm i
npm run start
```

Продуктив-версии приложения. Сборка происходит в папку dist.

```sh
npm run build
```

<a name="deploy"></a>

## Деплой

Настроен автодеплой приложения на ресурсе [Netlify](https://app.netlify.com/). Процесс деплоя запускается при изменении ветки deploy.
Ссылка на страницы приложения:
[https://ornate-churros-e697b5.netlify.app/](https://ornate-churros-e697b5.netlify.app/)

<a name="maket"></a>

## Макет

Вёрстка реализована на основании предоставленного готового шаблона. Ссылка на [шаблон в Figma](https://www.figma.com/file/H12WXWboLkN5HtE1AWpHjK/Chat_external_link-(Copy)?type=design&node-id=1%3A537&mode=design&t=Czbjy9qlFry8kB0w-1).

<a name="routes"></a>

## Маршруты приложения
| Страница | Путь |
| ------ | ------ |
| Авторизация | /|
| Регистрация | /sign-up|
| Чат | /messenger|
| Настройки профиля | /settings|

<a name="check"></a>

## Линтинг и тестирование кода
В приложении настроен [pre-commit (husky)](https://typicode.github.io/husky/) запускающий линтеры и тесты перед коммитом.
Ручную проверку кода можна запустить через скрипты:

- обнаружение проблем кода с использованием [eslint](https://eslint.org/). Запускается проверка js, ts, scss файлов:
    ```sh
    npm run lint
    ```
- тестирование кода:
    ```sh
    npm run test
    ```
