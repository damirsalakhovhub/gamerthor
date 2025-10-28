# Render.com Configuration Files

## render.yaml

Основной файл конфигурации для Render.com. Определяет все сервисы и их настройки.

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

### Объяснение параметров:

**Web Service:**
- `type: web` - тип сервиса (веб-приложение)
- `name: gamerthor` - имя сервиса
- `env: ruby` - язык программирования
- `buildCommand` - команда сборки
- `startCommand` - команда запуска
- `envVars` - переменные окружения

**PostgreSQL Service:**
- `type: pserv` - тип сервиса (PostgreSQL)
- `name: gamerthor-db` - имя базы данных
- `env: postgresql` - тип базы данных
- `plan: free` - бесплатный план

## Procfile

Файл для определения команд запуска приложения.

```
web: bundle exec rails server -p $PORT
```

## config/database.yml

Конфигурация базы данных для всех окружений.

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

## config/application.rb

Основные настройки приложения.

```ruby
module Gamerthor
  class Application < Rails::Application
    config.load_defaults 8.0
    
    # Allow all hosts for Render deployment
    config.hosts << ".onrender.com"
    
    # ... остальные настройки
  end
end
```

## config/environments/production.rb

Настройки для production окружения.

```ruby
# ... стандартные настройки Rails

# Host authorization for Render
config.hosts << "gamerthor.onrender.com"
config.hosts << ".onrender.com"
```

## Gemfile

Зависимости Ruby с поддержкой PostgreSQL.

```ruby
# Use postgresql as the database for Active Record
gem "pg", "~> 1.1"
# Keep sqlite3 for compatibility
gem "sqlite3", ">= 2.1"

# ... остальные гемы
```

## .env (для локальной разработки)

Пример файла с переменными окружения для локальной разработки.

```
RAILS_ENV=development
SECRET_KEY_BASE=your_secret_key_here
DATABASE_URL=postgresql://localhost/gamerthor_development
WEB_CONCURRENCY=2
PORT=3000
```

## Важные моменты

1. **render.yaml** должен быть в корне проекта
2. **Procfile** должен быть в корне проекта
3. **config/database.yml** должен использовать PostgreSQL
4. **Host Authorization** должен разрешать `.onrender.com`
5. **Gemfile.lock** должен содержать `x86_64-linux` платформу

