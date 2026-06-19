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

Запросы к Wikimapia API проксируются через Vite (`/api/wikimapia` → `api.wikimapia.org`) из-за ограничений CORS в браузере.

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
