# Калькулятор банковских вкладов

Учебный fullstack-проект для расчёта итоговой суммы и доходности банковского вклада. Frontend отправляет данные в REST API на Spring Boot и отображает результат расчёта.

## Стек технологий

- **Backend:** Java 21, Spring Boot, Spring Web MVC, Jakarta Validation, Maven, Lombok
- **Frontend:** React, TypeScript, Vite
- **API:** REST, JSON

## Возможности

- Расчёт итоговой суммы вклада и прибыли при ежемесячной капитализации процентов
- Валидация суммы, срока и процентной ставки
- Централизованная обработка ошибок валидации с HTTP 400
- Разделение backend-кода на Controller, Service и DTO
- Интеграция frontend с backend через `POST /api/calculate`

## Запуск backend

Требуется установленная JDK 21.

Из каталога `backend` выполните:

```bash
./mvnw spring-boot:run
```

В Windows PowerShell или CMD:

```bat
mvnw.cmd spring-boot:run
```

Backend будет доступен по адресу `http://localhost:8080`.

## Запуск frontend

Требуется Node.js и npm.

Из каталога `frontend` выполните:

```bash
npm install
npm run dev
```

Откройте адрес, который покажет Vite (обычно `http://localhost:5173`). Backend должен быть запущен отдельно.

## API

`POST /api/calculate`

Пример тела запроса:

```json
{
  "amount": 100000,
  "months": 12,
  "rate": 8.5
}
```

Пример ответа:

```json
{
  "total": 108844.46,
  "profit": 8844.46
}
```

Фактические значения ответа зависят от входных данных и формулы расчёта.

## Структура проекта

```text
backend/   # Spring Boot REST API
frontend/  # React + TypeScript UI
```

## Примечание

Проект является учебным и предназначен для демонстрации базовых практик разработки REST API и интеграции frontend/backend.
