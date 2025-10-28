# README

# Gamerthor - UI Kit Project

Проект для демонстрации UI Kit компонентов с автоматическим деплоем на Render.com.

## 🚀 Быстрый старт

### Локальная разработка

```bash
# Клонирование
git clone https://github.com/damirsalakhovhub/gamerthor.git
cd gamerthor

# Установка зависимостей
bundle install

# Запуск сервера
bundle exec rails server
```

Откройте [http://localhost:3000](http://localhost:3000)

### Деплой на Render.com

1. Зайдите на [render.com](https://render.com)
2. Нажмите "New +" → "Web Service"
3. Подключите GitHub репозиторий `damirsalakhovhub/gamerthor`
4. Render автоматически определит настройки

## 📁 Структура проекта

```
gamerthor/
├── app/
│   ├── views/
│   │   ├── home/           # Главная страница
│   │   └── kit/            # UI Kit страницы
│   └── assets/
│       └── stylesheets/     # Стили компонентов
├── docs/                   # Документация
│   ├── RENDER_DEPLOYMENT.md
│   ├── CONFIG_FILES.md
│   └── TROUBLESHOOTING.md
├── config/
│   ├── database.yml        # PostgreSQL конфигурация
│   ├── application.rb      # Настройки приложения
│   └── routes.rb           # Маршруты
├── render.yaml             # Конфигурация Render
├── Procfile               # Команды запуска
└── Gemfile                # Ruby зависимости
```

## 🎨 UI Kit

### Доступные страницы:
- [Buttons](https://gamerthor.onrender.com/kit/buttons) - Кнопки разных размеров и стилей
- [Inputs](https://gamerthor.onrender.com/kit/inputs) - Поля ввода с вариациями
- [Selects](https://gamerthor.onrender.com/kit/selects) - Выпадающие списки
- [Modals](https://gamerthor.onrender.com/kit/modals) - Модальные окна
- [Forms](https://gamerthor.onrender.com/kit/forms) - Формы

### Компоненты:
- **Buttons**: Primary, Default, Transparent, Outline, Success, Danger, White, Black
- **Inputs**: Medium, Large с состояниями (default, focused, disabled)
- **Field Variants**: Required fields, Help text, Error states
- **Selects**: Разные размеры и стили

## 🛠 Технологии

- **Ruby on Rails 8.0.3**
- **PostgreSQL** (production)
- **SQLite3** (development)
- **Puma** веб-сервер
- **SCSS** для стилей
- **Render.com** для хостинга

## 📚 Документация

- [Render Deployment Guide](docs/RENDER_DEPLOYMENT.md) - Полное руководство по деплою
- [Configuration Files](docs/CONFIG_FILES.md) - Описание конфигурационных файлов
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Решение частых проблем

## 🌐 Ссылки

- **Live Site**: [gamerthor.onrender.com](https://gamerthor.onrender.com)
- **GitHub**: [damirsalakhovhub/gamerthor](https://github.com/damirsalakhovhub/gamerthor)
- **Render Dashboard**: [dashboard.render.com](https://dashboard.render.com)

## 🔧 Разработка

### Добавление новых компонентов:

1. Создайте стили в `app/assets/stylesheets/components/`
2. Добавьте страницу в `app/views/kit/`
3. Обновите маршруты в `config/routes.rb`
4. Добавьте ссылку в навигацию

### Локальная база данных:

```bash
# Создание базы
bundle exec rails db:create

# Миграции
bundle exec rails db:migrate

# Заполнение тестовыми данными
bundle exec rails db:seed
```

## 📝 Лицензия

MIT License

## 👨‍💻 Автор

Damir Salakhov - [GitHub](https://github.com/damirsalakhovhub)
