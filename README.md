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

## Релизы

Версии и `CHANGELOG.md` генерируются через [standard-version](https://github.com/conventional-changelog/standard-version) по [Conventional Commits](https://www.conventionalcommits.org/).

```bash
# первый релиз (создаст CHANGELOG и тег v0.0.1)
npm run release:first

# следующие релизы — версия по коммитам с последнего тега
npm run release

# принудительный bump
npm run release:patch
npm run release:minor
npm run release:major
```

После релиза: `git push --follow-tags origin main`.

## Деплой на Vercel

1. Добавьте переменную окружения **`WIKIMAPIA_API_KEY`** для окружения **Production**.
2. После изменения переменных сделайте **Redeploy** — без этого ключ не подхватится.
3. Задеплойте проект — маршрут `api/wikimapia.ts` проксирует запросы к Wikimapia.
