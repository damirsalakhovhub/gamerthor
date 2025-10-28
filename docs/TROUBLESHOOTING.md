# Troubleshooting Render.com Deployment

## Частые ошибки и их решения

### 1. Platform Error

**Ошибка:**
```
Your bundle only supports platforms ["arm64-darwin-24"] but your local platform is x86_64-linux
```

**Решение:**
```bash
bundle lock --add-platform x86_64-linux
git add Gemfile.lock
git commit -m "Add Linux platform support"
git push origin main
```

### 2. Host Authorization Error

**Ошибка:**
```
Blocked hosts: gamerthor.onrender.com
```

**Решение:**
Добавить в `config/application.rb`:
```ruby
config.hosts << ".onrender.com"
```

Добавить в `config/environments/production.rb`:
```ruby
config.hosts << "gamerthor.onrender.com"
config.hosts << ".onrender.com"
```

### 3. Database Connection Error

**Ошибка:**
```
ActiveRecord::PendingMigrationError
```

**Решение:**
Убедиться что в `render.yaml` есть:
```yaml
startCommand: bundle exec rails db:create db:migrate && bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RAILS_ENV:-production}
```

### 4. SQLite3 Adapter Error

**Ошибка:**
```
Error loading the 'sqlite3' Active Record adapter
```

**Решение:**
1. Добавить SQLite3 в Gemfile:
```ruby
gem "sqlite3", ">= 2.1"
```

2. Обновить Gemfile.lock:
```bash
bundle install
bundle lock --add-platform x86_64-linux
```

### 5. Build Command Error

**Ошибка:**
```
Build failed
```

**Решение:**
Проверить `render.yaml`:
```yaml
buildCommand: bundle install && bundle exec rails assets:precompile
```

### 6. Environment Variables Error

**Ошибка:**
```
Missing environment variables
```

**Решение:**
Убедиться что в `render.yaml` есть:
```yaml
envVars:
  - key: RAILS_ENV
    value: production
  - key: SECRET_KEY_BASE
    generateValue: true
  - key: DATABASE_URL
    fromDatabase:
      name: gamerthor-db
      property: connectionString
```

## Проверочный список

### Перед деплоем:
- [ ] `render.yaml` настроен правильно
- [ ] `Procfile` существует
- [ ] `config/database.yml` использует PostgreSQL
- [ ] `config/application.rb` разрешает `.onrender.com`
- [ ] `Gemfile.lock` содержит `x86_64-linux`
- [ ] Все файлы закоммичены и запушены

### После деплоя:
- [ ] Сборка прошла успешно
- [ ] Приложение запустилось
- [ ] База данных создана
- [ ] Миграции выполнены
- [ ] Сайт доступен по URL

## Полезные команды

### Локальная проверка:
```bash
# Проверка конфигурации
bundle exec rails routes
bundle exec rails db:migrate:status

# Проверка сборки
bundle exec rails assets:precompile
```

### Render CLI:
```bash
# Установка CLI
npm install -g @render/cli

# Логи
render logs --service gamerthor

# Перезапуск
render restart --service gamerthor
```

## Мониторинг

### Логи:
- Заходите в Render Dashboard
- Выбирайте сервис `gamerthor`
- Смотрите логи в реальном времени

### Метрики:
- CPU usage
- Memory usage
- Response time
- Error rate

## Контакты для поддержки

- Render Support: [support@render.com](mailto:support@render.com)
- Render Documentation: [render.com/docs](https://render.com/docs)
- GitHub Issues: [github.com/damirsalakhovhub/gamerthor/issues](https://github.com/damirsalakhovhub/gamerthor/issues)
