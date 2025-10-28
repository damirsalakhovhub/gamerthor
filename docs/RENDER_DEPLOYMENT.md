# Render.com Deployment Guide

## Обзор

Этот проект настроен для автоматического деплоя на Render.com. Все необходимые конфигурации уже включены в репозиторий.

## Быстрый старт

### 1. Клонирование проекта

```bash
git clone https://github.com/damirsalakhovhub/gamerthor.git
cd gamerthor
```

### 2. Локальная разработка

```bash
# Установка зависимостей
bundle install

# Запуск локального сервера
bundle exec rails server
```

### 3. Деплой на Render.com

1. Зайдите на [render.com](https://render.com)
2. Нажмите "New +" → "Web Service"
3. Подключите GitHub репозиторий `damirsalakhovhub/gamerthor`
4. Render автоматически определит настройки из файлов конфигурации

## Конфигурационные файлы

### render.yaml
```yaml
services:
  - type: web
    name: gamerthor
    env: ruby
    buildCommand: bundle install && bundle exec rails assets:precompile
    startCommand: bundle exec rails db:create db:migrate && bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RAILS_ENV:-production}
    envVars:
      - key: RAILS_ENV
        value: production
      - key: SECRET_KEY_BASE
        generateValue: true
      - key: DATABASE_URL
        fromDatabase:
          name: gamerthor-db
          property: connectionString
  - type: pserv
    name: gamerthor-db
    env: postgresql
    plan: free
```

### Procfile
```
web: bundle exec rails server -p $PORT
```

### config/database.yml
```yaml
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: gamerthor_development

test:
  <<: *default
  database: gamerthor_test

production:
  <<: *default
  url: <%= ENV['DATABASE_URL'] %>
```

## Настройки Render.com

### Environment Variables
- `RAILS_ENV=production` - автоматически устанавливается
- `SECRET_KEY_BASE` - автоматически генерируется
- `DATABASE_URL` - автоматически подключается к PostgreSQL

### Build Command
```
bundle install && bundle exec rails assets:precompile
```

### Start Command
```
bundle exec rails db:create db:migrate && bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RAILS_ENV:-production}
```

## База данных

### PostgreSQL
- Автоматически создается бесплатный PostgreSQL сервис
- Название: `gamerthor-db`
- План: Free
- Подключается автоматически через `DATABASE_URL`

### Миграции
- Автоматически выполняются при каждом деплое
- Команда: `bundle exec rails db:create db:migrate`

## Структура проекта

```
gamerthor/
├── app/
│   ├── views/
│   │   ├── home/           # Главная страница
│   │   └── kit/            # UI Kit страницы
│   └── assets/
│       └── stylesheets/     # Стили
├── config/
│   ├── database.yml        # Конфигурация БД
│   ├── application.rb      # Настройки приложения
│   └── routes.rb           # Маршруты
├── docs/                   # Документация
├── render.yaml             # Конфигурация Render
├── Procfile               # Команды запуска
└── Gemfile                # Зависимости Ruby
```

## Особенности

### Host Authorization
- Настроено для работы с Render доменами
- Добавлены `.onrender.com` в разрешенные хосты

### Платформы
- Поддержка Linux (x86_64-linux) для Render
- Поддержка macOS (arm64-darwin) для локальной разработки

### Гемы
- `pg` - PostgreSQL драйвер
- `sqlite3` - для совместимости
- `puma` - веб-сервер

## Troubleshooting

### Ошибки сборки
1. Проверьте `Gemfile.lock` - должен содержать `x86_64-linux`
2. Убедитесь что все гемы поддерживают Linux

### Ошибки базы данных
1. Проверьте что PostgreSQL сервис создан
2. Убедитесь что `DATABASE_URL` настроен

### Ошибки Host Authorization
1. Проверьте `config/application.rb` - должны быть `.onrender.com`
2. Проверьте `config/environments/production.rb`

## Полезные ссылки

- [Render.com Documentation](https://render.com/docs)
- [Rails Deployment Guide](https://guides.rubyonrails.org/deployment.html)
- [PostgreSQL on Render](https://render.com/docs/databases)

## Контакты

- GitHub: [damirsalakhovhub/gamerthor](https://github.com/damirsalakhovhub/gamerthor)
- Render: [gamerthor.onrender.com](https://gamerthor.onrender.com)
