# Fitfriends
Проект создан на микросервисной архитектуре.
## Ресурсы проектa
- Файлы HTTP запросов находятся в папке fitfriends/apps/api-gateway/src/app/controllers
- Пример файла с переменными окружения fitfriends/envs/.env-example
- Документация доступна по адресу http://localhost:3333/spec после запуска сервиcа api-gateway
- Список микросервисов:
    4.1 api-gateway — содердит http контроллеры
    4.2 users — отвечает за авторизацию, хранение сессий, пользователей и друзей
    4.3 fitness — содержит бизнес логику приложения
    4.4 storage — отвечает за обработку файлов
5 Списки сценариев для микросервисов:
    5.1 serve — запускает сервис, доступен для всех сервисов.
6 Сценарии для сервиса fitness
    6.1 db-reset — делает перестановку клиента prisma
    6.2 db-generate — генерирует клиента в соответствие со схемой
    6.3 db-migrate — осуществляет миграцию БД
7 Запусук сценариев осуществляется через `nx run <название сервиса>:<название сценария>`
8 Сценарии командной строки:
    8.1 `services:docker-up`  — загрузит и сконфигурирует контейнеры docker 
    8.2 `services:docker-start` — запустит все контейнеры
    8.3 `services:docker-stop` — остановит все контейнеры
    8.4 `services:db-init` — проинициализирует prisma 
    8.5 `services:db-seed` — заполнит базы данных тестовыми данными
    8.6 `services:db-reset` — очистит базы данных
    8.7 `services:start` — запустит все микросервисы
9 Команда герерации тестовых данных создает две учетные записи: 
  `coach@fitfriends.local` — роль тренера
  `customer@fitfriends.local` — роль клиента
  Пароль для всех учетоных записей: `123456`

## Порядок действий для запуска проекта
1 Создайте файл .env в папке fitfriends/envs/ обновите переменные окружения по образцу в файле .env-example
2 Установите зависимости `npm i`
3 Установите docker
4 В директории ./fitfriends запустите сценарии в следующем порядке:
    4.1 `npm run servisec:docker-up`
    4.2 `npm run services:docker-start`
    4.3 `npm run services:start`
  Перейдите в другое окно терминала
    4.4 `npm run services:db-init`
    4.5 `services:seed`
