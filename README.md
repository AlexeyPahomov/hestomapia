# Hestomapia

Карта с информацией об объектах.

## Стек

- React + Vite + TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [MapLibre GL](https://maplibre.org/) + [OpenStreetMap](https://www.openstreetmap.org/)

## Быстрый старт

1. Скопируйте `.env.example` в `.env` и укажите API-ключ Wikimapia:

```bash
cp .env.example .env
```

Ключ можно получить на [wikimapia.org/api](https://wikimapia.org/api/?action=how_to).

2. Установите зависимости и запустите dev-сервер:

```bash
npm install
npm run dev
```

Запросы к Wikimapia API идут через `/api/wikimapia`. Ключ подставляется на сервере и не попадает в клиентский бандл.

## Деплой на Vercel

1. Добавьте переменную окружения **`WIKIMAPIA_API_KEY`** (без префикса `VITE_`).
2. Задеплойте проект — маршрут `api/wikimapia.ts` проксирует запросы к Wikimapia.

> Если раньше использовался `VITE_WIKIMAPIA_API_KEY`, ключ был виден в браузере. Рекомендуется сменить ключ в кабинете Wikimapia.

## Структура проекта (FSD)

```
src/
  app/        — инициализация приложения, глобальные стили
  pages/      — страницы
  widgets/    — крупные UI-блоки (карта)
  features/   — пользовательские сценарии
  entities/   — бизнес-сущности
  shared/     — переиспользуемый код (config, lib, ui)
```
