# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Hestomapia — альтернативный клиент Wikimapia: карта (MapLibre + OSM), на которой полигоны объектов подгружаются из открытого Wikimapia API по видимой области. Деплой — Vercel (статика + serverless-функция в `api/`).

## Команды

```bash
npm run dev       # Vite dev-сервер; /api/wikimapia проксируется Vite'ом (vite.config.ts)
npm run build     # tsc -b (app + node + api) && vite build
npm run lint      # eslint .
npm run release   # standard-version: bump версии + CHANGELOG по conventional-коммитам
```

Тестов в проекте нет. Проверка изменений — `npm run build` + `npm run lint`.

Для работы нужен `.env` с `WIKIMAPIA_API_KEY` (см. `.env.example`). Ключ берётся на wikimapia.org/api под залогиненным аккаунтом и быстро сгорает навсегда (ошибка `1004`), хотя документация обещает сброс через 24 часа.

## Архитектура

### Ключ API живёт только на сервере

Клиент ходит на `/api/wikimapia/?…` без ключа. Ключ подставляет:
- в проде — `api/wikimapia.ts` (Vercel function, `export default { fetch }`), URL собирается в `lib/wikimapia/upstream-url.ts`;
- в dev/preview — прокси в `vite.config.ts`, использующий ту же `buildWikimapiaUpstreamSearchParams`.

Логика, общая для `api/` и Vite-конфига, лежит в `lib/` (вне `src/`, проверяется `tsconfig.api.json`). В `api/` импорты из `lib/` пишутся с расширением `.js` (Node ESM на Vercel).

### Экономия квоты ключа

Каждый запрос к upstream тратит лимит ключа, поэтому кэширование многослойное — сохраняй его при изменениях:
- **CDN Vercel**: прокси ставит `Cache-Control: s-maxage=…` только на успешные ответы. Ответы с `debug` (ошибки Wikimapia приходят с HTTP 200 и `{ debug: { code, message } }`) — `no-store`.
- **Стабильные URL**: `normalizeBbox` (`src/shared/lib/maplibre/normalize-bbox.ts`) расширяет bbox наружу до сетки 0.01°; в запрос уходит именно нормализованный bbox, иначе CDN никогда не попадает в кэш.
- **react-query** (`places-query.ts`): `staleTime` 15 мин, без refetch on focus/mount; `moveend` дебаунсится на 500 мс.
- При `1004` клиент блокирует дальнейшие загрузки мест до перезагрузки страницы (`useQuotaBlockState`), а ретраи на ошибках API отключены (`shouldRetryWikimapiaRequest`).

### Слой Wikimapia API (`src/shared/api/wikimapia/`)

`client.ts` → `parse-response.ts` (превращает `debug` в `WikimapiaApiError`, пустой массив `[]` — в пустой результат) → сырые типы `WikimapiaRaw*`. Нормализация сырых ответов в доменные типы — в `src/entities/place/lib/normalize.ts` (у Wikimapia поля плавают: `title`/`name`, `places`/`folder`, `polygon` на верхнем уровне или в `location`).

Для загрузки по области используется функция `box`, а не `place.getbyarea` — последняя возвращает `[]` для многих ключей.

### Feature-Sliced Design

Слои `app → pages → widgets → features → entities → shared`, импорт только вниз. Алиасы `@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared` (заданы и в `tsconfig.app.json`, и в `vite.config.ts` — при добавлении править оба). Слайсы экспортируют публичный API через `index.ts`; снаружи импортировать только из него.

Основные потоки:
- `features/load-places-by-bounds` — привязка к событиям карты (`lib/bind-*`), запрос мест по bbox, отрисовка GeoJSON-слоёв (`lib/places-layers.ts`), клик по полигону.
- `features/place-details` — загрузка деталей объекта (`place.getbyid`) с отменой предыдущего запроса через AbortController (не через react-query).
- `widgets/map`, `widgets/place-details-panel` — UI карты и панели объекта (фото-карусель, комментарии).

## Соглашения

- Коммиты — Conventional Commits на русском (`feat: …`, `fix: …`, `perf: …`); релизный коммит — `release: 🚀vX.Y.Z` (`.versionrc.json`). После релиза: `git push --follow-tags origin main`.
- Стили — Tailwind CSS v4 через `@tailwindcss/vite`.
- Тексты UI и комментарии в коде — на русском.
