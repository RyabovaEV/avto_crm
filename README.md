# Avto CRM

Система управления маршрутами и расписанием для автотранспортной компании. CRM приложение для управления новостями, расписанием маршрутов и информацией о компании.

## 🚀 Возможности

- **Управление компанией** - информация о компании, контактные телефоны, реквизиты страховки
- **Управление маршрутами** - создание и редактирование маршрутов с расписанием отправлений
- **Сезонное расписание** - разные маршруты для разных сезонов (лето, осень, зима, весна)
- **Новости** - публикация новостей и объявлений для клиентов
- **Комментарии к маршрутам** - добавление специальных примечаний к отправлениям
- **Тёмная тема** - поддержка светлой и тёмной темы оформления

## 📋 Требования

- Node.js 18+
- PostgreSQL 12+
- npm или yarn

## 🛠️ Технологический стек

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **База данных**: PostgreSQL
- **Стили**: Tailwind CSS 4
- **UI компоненты**: Lucide React icons
- **Валидация**: Zod
- **Редактор**: MD Editor (для новостей)
- **Темы**: next-themes

## 📦 Установка

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd avto_crm
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка переменных окружения

Создайте файлы `.env.development.local` и `.env.production.local`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/avto_crm"
```

### 4. Миграция базы данных

```bash
npm run db:migrate:dev
```

### 5. Генерация Prisma клиента

```bash
npm run db:generate:dev
```

### 6. Заполнение начальных данных (опционально)

```bash
npm run db:seed:dev
```

## 🏃 Запуск

### Режим разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Production сборка и запуск

```bash
npm run build
npm start
```

## 📚 Доступные команды

| Команда                       | Описание                          |
| ----------------------------- | --------------------------------- |
| `npm run dev`                 | Запуск сервера разработки         |
| `npm run build`               | Сборка проекта для production     |
| `npm start`                   | Запуск production сервера         |
| `npm run lint`                | Проверка кода                     |
| `npm run lint:fix`            | Исправление lint ошибок           |
| `npm run format`              | Форматирование кода Prettier      |
| `npm run db:migrate:dev`      | Запуск миграций в dev             |
| `npm run db:migrate:prod`     | Запуск миграций в production      |
| `npm run db:studio:dev`       | Открытие Prisma Studio (dev)      |
| `npm run db:studio:prod`      | Открытие Prisma Studio (prod)     |
| `npm run db:seed:dev`         | Заполнение начальных данных (dev) |
| `npm run db:sync:prod-to-dev` | Синхронизация БД prod → dev       |

## 📁 Структура проекта

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── insurance/
│   │   ├── news/
│   │   ├── organization/
│   │   ├── phones/
│   │   ├── route-comments/
│   │   └── routes/
│   ├── news/              # Страница новостей
│   ├── schedule/          # Страница расписания
│   ├── settings/          # Страница настроек
│   └── layout.tsx
├── components/            # React компоненты
│   ├── layout/           # Компоненты макета (Header, Sidebar)
│   ├── news/             # Компоненты новостей
│   ├── phones/           # Компоненты телефонов
│   ├── routes/           # Компоненты маршрутов
│   ├── settings/         # Компоненты настроек
│   └── ui/               # Переиспользуемые UI компоненты
├── config/               # Конфигурация
│   ├── navigation.ts     # Навигация приложения
│   └── SeasonTheme.ts    # Темы сезонов
├── hooks/                # Custom React hooks
│   ├── useAsyncAction.ts
│   ├── useEditableList.ts
│   ├── useRoutesSchedule.ts
│   └── useSettingsForm.ts
├── lib/                  # Утилиты и вспомогательные функции
│   ├── api.ts
│   ├── db.ts
│   ├── validation/       # Функции валидации
│   └── export/           # Функции экспорта
└── generated/            # Сгенерированные файлы Prisma

prisma/
├── schema.prisma         # Схема БД
├── seed.ts              # Скрипт заполнения данных
└── migrations/          # Миграции БД
```

## 📊 Модель данных

### Основные сущности

- **CompanyInfo** - Информация о компании
- **CompanyPhone** - Телефоны компании
- **CompanyInsurance** - Информация о страховке
- **Route** - Маршруты
- **RouteDeparture** - Отправления маршрутов
- **RouteComment** - Комментарии к отправлениям
- **Season** - Сезоны (лето, осень, зима, весна)
- **SeasonPeriod** - Периоды сезонов
- **News** - Новости

## 🐳 Docker

Проект поддерживает Docker. Для запуска контейнеров:

```bash
docker-compose up -d
```

## 📝 Разработка

### Добавление новой API маршрута

1. Создайте файл в `src/app/api/[resource]/route.ts`
2. Используйте `lib/db.ts` для работы с БД
3. Добавьте валидацию с помощью Zod

### Добавление нового компонента

1. Создайте компонент в `src/components/`
2. Используйте Tailwind CSS для стилей
3. Используйте Lucide React для иконок

### Работа с БД

```bash
# Создать новую миграцию
npm run db:migrate:dev -- --create-only

# Просмотр БД в Prisma Studio
npm run db:studio:dev

# Синхронизация production БД с development
npm run db:sync:prod-to-dev
```

## ⚙️ Конфигурация

### TypeScript

Конфигурация в `tsconfig.json` (strict mode включен)

### ESLint

Конфигурация в `eslint.config.mjs`

### Prettier

Конфигурация в `.prettierrc` (если существует) или в `package.json`

### Tailwind CSS

Конфигурация в `postcss.config.mjs`

## 🐛 Решение проблем

### Ошибка подключения к БД

- Проверьте переменную `DATABASE_URL` в `.env.development.local`
- Убедитесь, что PostgreSQL запущен
- Проверьте данные для подключения (host, port, user, password)

### Ошибка миграций

```bash
# Сбросить БД и переприменить миграции
npm run db:migrate:dev -- --skip-generate
```

### Prisma ошибки

```bash
# Пересгенерировать Prisma клиент
npm run db:generate:dev
```

## 📄 Лицензия

Приватный проект.

## 👤 Контакты

Для вопросов и предложений обращайтесь к разработчику.
