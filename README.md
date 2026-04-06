# Spring Boot Admin Panel Application 🔐

Профессиональное Spring Boot приложение с полной системой авторизации, аутентификации и админ-панелью для управления пользователями. Проект демонстрирует лучшие практики разработки на Java/Spring с использованием REST API, JWT, аннотаций безопасности и современного стека технологий.

**Язык**: Русский | **Java версия**: 17+ | **Spring Boot версия**: 3.x+

---

## 📋 Оглавление

1. [Обзор](#обзор)
2. [Требования](#требования)
3. [Установка](#установка)
4. [Конфигурация](#конфигурация)
5. [Запуск](#запуск)
6. [Структура проекта](#структура-проекта)
7. [REST API](#rest-api)
8. [Примеры использования](#примеры-использования)
9. [Аутентификация](#аутентификация)
10. [Роли и права доступа](#роли-и-права-доступа)
11. [Особенности](#особенности)
12. [Возможные ошибки](#возможные-ошибки)
13. [Дальнейшее развитие](#дальнейшее-развитие)

---

## 🎯 Обзор

Это полнофункциональное приложение для управления пользователями с ролевой системой доступа. Включает:

✅ **Аутентификация и авторизация** — система входа с ролями ADMIN и USER  
✅ **REST API** — полный набор endpoints для работы с пользователями  
✅ **Админ-панель** — интерфейс для управления пользователями  
✅ **Динамическое обновление** — использование Fetch API для обновления без перезагрузок  
✅ **Spring Security** — защита endpoints и управление правами доступа  
✅ **Hibernate & JPA** — работа с базой данных  
✅ **Thymeleaf** — серверный рендеринг шаблонов  
✅ **Bootstrap 5** — современный дизайн интерфейса  

---

## 💻 Требования

Перед началом убедитесь, что у вас установлены:

| Компонент | Версия | Команда проверки |
|-----------|--------|------------------|
| **Java** | 17 или выше | `java -version` |
| **Maven** | 3.6+ | `mvn -version` |
| **MySQL** | 8.0+ | `mysql --version` |
| **Git** | (опционально) | `git --version` |

### Проверка Java версии:
```bash
java -version
# Output: openjdk version "17.0.1" или выше
```

---

## 📥 Установка

### Шаг 1: Клонирование репозитория

```bash
# Используя Git
git clone https://github.com/Riss2121/3_1_4_Zadacha.git

# Или скачайте ZIP архив и распакуйте его
cd 3_1_4_Zadacha
```

### Шаг 2: Создание базы данных

Откройте MySQL клиент и выполните:

```sql
-- Создание базы данных
CREATE DATABASE jdbc_hibernate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Переключение на БД
USE jdbc_hibernate;

-- Проверка создания
SHOW DATABASES;
```

**Или из командной строки:**

```bash
mysql -u root -p -e "CREATE DATABASE jdbc_hibernate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

---

## ⚙️ Конфигурация

### Шаг 1: Настройка подключения к БД

Отредактируйте файл `src/main/resources/application.properties`:

```properties
# ==================== DATABASE CONFIGURATION ====================
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/jdbc_hibernate?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&characterEncoding=utf8mb4
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# ==================== JPA/HIBERNATE CONFIGURATION ====================
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.jdbc.batch_size=20
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true

# ==================== SPRING CONFIGURATION ====================
spring.mvc.hiddenmethod.filter.enabled=true
spring.application.name=Admin Panel Application

# ==================== SERVER CONFIGURATION ====================
server.port=8080
server.servlet.context-path=/
server.error.include-message=always
server.error.include-binding-errors=always

# ==================== LOGGING ====================
logging.level.root=INFO
logging.level.ru.kata.spring.boot_security.demo=DEBUG
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

**Параметры подключения:**

| Параметр | Значение | Описание |
|----------|---------|---------|
| `url` | `jdbc:mysql://127.0.0.1:3306/jdbc_hibernate` | Адрес БД и имя БД |
| `username` | `root` | Пользователь MySQL |
| `password` | `root` | Пароль MySQL |
| `useSSL` | `false` | Отключить SSL для локальной разработки |
| `serverTimezone` | `UTC` | Часовой пояс |

### Шаг 2: Если используется другой пользователь MySQL

```properties
# Пример для пользователя 'admin' с паролем 'mypassword'
spring.datasource.username=admin
spring.datasource.password=mypassword
```

---

## 🚀 Запуск

### Способ 1: Запуск из IDE (IntelliJ IDEA, Eclipse)

1. Откройте проект в IDE
2. Нажмите правой кнопкой на класс `DemoApplication.java`
3. Выберите **Run 'DemoApplication'**
4. Откройте браузер: `http://localhost:8080/login`

### Способ 2: Запуск через Maven

```bash
# Полная сборка и запуск
mvn clean install
mvn spring-boot:run

# Или сразу
mvn spring-boot:run

# Вывод должен содержать:
# Started DemoApplication in X.XXX seconds
```

### Способ 3: Запуск jar файла

```bash
# Сборка
mvn clean package -DskipTests

# Запуск
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### Проверка запуска

```bash
# Если приложение запущено, этот запрос вернет страницу входа
curl http://localhost:8080/login
```

---

## 📁 Структура проекта

```
3_1_4_Zadacha/
│
├── src/
│   ├── main/
│   │   ├── java/ru/kata/spring/boot_security/demo/
│   │   │   ├── configs/              # Конфигурация Spring Security
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   └── WebConfig.java
│   │   │   │
│   │   │   ├── controller/           # MVC контроллеры (HTML страницы)
│   │   │   │   ├── AdminController.java
│   │   │   │   ├── UserController.java
│   │   │   │   └── LoginController.java
│   │   │   │
│   │   │   ├── rest/                 # REST контроллеры (JSON API)
│   │   │   │   ├── AdminRestController.java
│   │   │   │   └── UserRestController.java
│   │   │   │
│   │   │   ├── model/                # Сущности (Entity)
│   │   │   │   ├── User.java
│   │   │   │   └── Role.java
│   │   │   │
│   │   │   ├── dto/                  # DTO для запросов/ответов
│   │   │   │   ├── UserCreateRequest.java
│   │   │   │   ├── UserUpdateRequest.java
│   │   │   │   └── UserResponse.java
│   │   │   │
│   │   │   ├── repository/           # Доступ к БД
│   │   │   │   ├── UserRepository.java
│   │   │   │   └── RoleRepository.java
│   │   │   │
│   │   │   ├── service/              # Бизнес-логика
│   │   │   │   ├── UserService.java
│   │   │   │   └── RoleService.java
│   │   │   │
│   │   │   └── DemoApplication.java  # Главный класс приложения
│   │   │
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── css/              # CSS стили
│   │       │   └── js/
│   │       │       ├── admin.js      # Скрипты админ-панели
│   │       │       └── user.js       # Скрипты страницы пользователя
│   │       │
│   │       ├── templates/            # Thymeleaf шаблоны
│   │       │   ├── login.html
│   │       │   ├── admin.html
│   │       │   └── user.html
│   │       │
│   │       └── application.properties # Конфигурация приложения
│   │
│   └── test/                          # Тесты (опционально)
│
├── .mvn/                              # Maven wrapper
│
├── pom.xml                            # Зависимости Maven
├── mvnw                               # Maven wrapper скрипт (Linux/Mac)
├── mvnw.cmd                           # Maven wrapper скрипт (Windows)
├── .gitignore                         # Игнорирование файлов Git
└── README.md                          # Этот файл
```

---

## 🔌 REST API

### 📌 Базовая информация

- **Base URL:** `http://localhost:8080`
- **Content-Type:** `application/json`
- **Authentication:** HTTP Basic Auth (username:password)

### 🔐 Аутентификация

Все запросы к API требуют базовую аутентификацию:

```bash
curl -u username:password http://localhost:8080/api/...
```

Или через заголовок:
```bash
curl -H "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" http://localhost:8080/api/...
```

Где `dXNlcm5hbWU6cGFzc3dvcmQ=` это base64 кодирование `username:password`.

**Примеры учетных данных:**
- **Admin:** `admin:admin`
- **User:** `user:user`

---

## 📡 Endpoints API

### 1️⃣ Получение списка всех пользователей (ADMIN)

```
GET /api/admin/users
```

**Требования:** Роль ADMIN  
**Параметры:** нет

**Пример запроса:**
```bash
curl -u admin:admin \
  -X GET http://localhost:8080/api/admin/users \
  -H "Accept: application/json"
```

**Ответ (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "roles": [
      {
        "id": 1,
        "name": "ROLE_ADMIN"
      }
    ]
  },
  {
    "id": 2,
    "name": "Regular User",
    "email": "user@example.com",
    "roles": [
      {
        "id": 2,
        "name": "ROLE_USER"
      }
    ]
  }
]
```

---

### 2️⃣ Получение пользователя по ID (ADMIN)

```
GET /api/admin/users/{id}
```

**Требования:** Роль ADMIN  
**Параметры пути:**
- `id` (integer, required) — ID пользователя

**Пример запроса:**
```bash
curl -u admin:admin \
  -X GET http://localhost:8080/api/admin/users/1 \
  -H "Accept: application/json"
```

**Ответ (200 OK):**
```json
{
  "id": 1,
  "name": "Admin User",
  "email": "admin@example.com",
  "roles": [
    {
      "id": 1,
      "name": "ROLE_ADMIN"
    }
  ]
}
```

**Ошибка (404 Not Found):**
```json
{
  "error": "Пользователь не найден",
  "status": 404
}
```

---

### 3️⃣ Создание нового пользователя (ADMIN)

```
POST /api/admin/users
```

**Требования:** Роль ADMIN  
**Content-Type:** `application/json`

**Тело запроса:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "roles": [
    {
      "id": 2,
      "name": "ROLE_USER"
    }
  ]
}
```

**Описание полей:**

| Поле | Тип | Обязательное | Описание |
|------|-----|-------------|---------|
| `name` | string | ✅ | Имя пользователя (2-100 символов) |
| `email` | string | ✅ | Email (должен быть уникальным) |
| `password` | string | ✅ | Пароль (минимум 4 символа) |
| `roles` | array | ✅ | Массив ролей (содержит `id` и `name`) |

**Пример запроса:**
```bash
curl -u admin:admin \
  -X POST http://localhost:8080/api/admin/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "roles": [
      {
        "id": 2,
        "name": "ROLE_USER"
      }
    ]
  }'
```

**Ответ (201 Created):**
```json
{
  "id": 3,
  "name": "John Doe",
  "email": "john@example.com",
  "roles": [
    {
      "id": 2,
      "name": "ROLE_USER"
    }
  ]
}
```

**Ошибка (400 Bad Request) — Email уже существует:**
```json
{
  "error": "Пользователь с таким email уже существует",
  "status": 400
}
```

---

### 4️⃣ Обновление пользователя (ADMIN)

```
PUT /api/admin/users/{id}
```

**Требования:** Роль ADMIN  
**Параметры пути:**
- `id` (integer, required) — ID пользователя

**Тело запроса:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "newPassword456",
  "roles": [
    {
      "id": 1,
      "name": "ROLE_ADMIN"
    }
  ]
}
```

**Пример запроса:**
```bash
curl -u admin:admin \
  -X PUT http://localhost:8080/api/admin/users/3 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "newPassword456",
    "roles": [
      {
        "id": 1,
        "name": "ROLE_ADMIN"
      }
    ]
  }'
```

**Ответ (200 OK):**
```json
{
  "id": 3,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "roles": [
    {
      "id": 1,
      "name": "ROLE_ADMIN"
    }
  ]
}
```

---

### 5️⃣ Удаление пользователя (ADMIN)

```
DELETE /api/admin/users/{id}
```

**Требования:** Роль ADMIN  
**Параметры пути:**
- `id` (integer, required) — ID пользователя для удаления

**Пример запроса:**
```bash
curl -u admin:admin \
  -X DELETE http://localhost:8080/api/admin/users/3
```

**Ответ (204 No Content):**
```
(пустое тело)
```

**Или (200 OK):**
```json
{
  "message": "Пользователь успешно удален"
}
```

---

### 6️⃣ Получение текущего авторизованного пользователя (USER)

```
GET /api/user
```

**Требования:** Любая роль (USER или ADMIN)  
**Параметры:** нет

**Пример запроса:**
```bash
curl -u user:user \
  -X GET http://localhost:8080/api/user \
  -H "Accept: application/json"
```

**Ответ (200 OK):**
```json
{
  "id": 2,
  "name": "Regular User",
  "email": "user@example.com",
  "roles": [
    {
      "id": 2,
      "name": "ROLE_USER"
    }
  ]
}
```

---

### 7️⃣ Получение доступных ролей (ADMIN)

```
GET /api/admin/roles
```

**Требования:** Роль ADMIN  
**Параметры:** нет

**Пример запроса:**
```bash
curl -u admin:admin \
  -X GET http://localhost:8080/api/admin/roles \
  -H "Accept: application/json"
```

**Ответ (200 OK):**
```json
[
  {
    "id": 1,
    "name": "ROLE_ADMIN"
  },
  {
    "id": 2,
    "name": "ROLE_USER"
  }
]
```

---

## 📚 Примеры использования

### Сценарий 1: Полный цикл управления пользователем

```bash
#!/bin/bash

# 1. Получить список пользователей
echo "=== Получение списка пользователей ==="
curl -u admin:admin http://localhost:8080/api/admin/users | jq .

# 2. Создать нового пользователя
echo -e "\n=== Создание нового пользователя ==="
NEW_USER=$(curl -u admin:admin \
  -X POST http://localhost:8080/api/admin/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Smith",
    "email": "alice@example.com",
    "password": "alice123",
    "roles": [{"id": 2, "name": "ROLE_USER"}]
  }')

echo $NEW_USER | jq .

# 3. Получить ID нового пользователя
USER_ID=$(echo $NEW_USER | jq -r '.id')
echo "Создан пользователь с ID: $USER_ID"

# 4. Получить информацию о пользователе
echo -e "\n=== Информация о пользователе $USER_ID ==="
curl -u admin:admin http://localhost:8080/api/admin/users/$USER_ID | jq .

# 5. Обновить пользователя
echo -e "\n=== Обновление пользователя ==="
curl -u admin:admin \
  -X PUT http://localhost:8080/api/admin/users/$USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "password": "newPassword789",
    "roles": [{"id": 1, "name": "ROLE_ADMIN"}]
  }' | jq .

# 6. Удалить пользователя
echo -e "\n=== Удаление пользователя ==="
curl -u admin:admin \
  -X DELETE http://localhost:8080/api/admin/users/$USER_ID
echo "Пользователь удален"
```

Сохраните скрипт как `test_api.sh` и запустите:
```bash
chmod +x test_api.sh
./test_api.sh
```

---

### Сценарий 2: Работа с авторизацией

#### 2.1 Попытка доступа без аутентификации

```bash
# ❌ Будет ошибка 401 Unauthorized
curl http://localhost:8080/api/admin/users
```

**Ответ:**
```
HTTP/1.1 401 Unauthorized
```

---

#### 2.2 USER пытается получить доступ к admin endpoints

```bash
# ❌ Будет ошибка 403 Forbidden
curl -u user:user \
  -X GET http://localhost:8080/api/admin/users
```

**Ответ:**
```
HTTP/1.1 403 Forbidden
```

---

#### 2.3 Правильный доступ от ADMIN

```bash
# ✅ Успешный ответ
curl -u admin:admin \
  -X GET http://localhost:8080/api/admin/users
```

---

### Сценарий 3: Использование jq для обработки JSON

```bash
# Установка jq (если нет)
# Ubuntu/Debian: sudo apt-get install jq
# macOS: brew install jq
# Windows: https://stedolan.github.io/jq/download/

# Получить только имена пользователей
curl -u admin:admin http://localhost:8080/api/admin/users | jq '.[].name'

# Вывод:
# "Admin User"
# "Regular User"

# Получить пользователя с email содержащим 'admin'
curl -u admin:admin http://localhost:8080/api/admin/users | jq '.[] | select(.email | contains("admin"))'

# Получить количество пользователей
curl -u admin:admin http://localhost:8080/api/admin/users | jq 'length'

# Вывод: 2

# Красивый вывод JSON
curl -u admin:admin http://localhost:8080/api/admin/users | jq '.'
```

---

## 🔐 Аутентификация

### Методы аутентификации

#### 1. HTTP Basic Authentication (наиболее простой)

```bash
curl -u username:password http://localhost:8080/api/...
```

Где:
- `-u` флаг для указания учетных данных
- `username` — имя пользователя
- `password` — пароль

#### 2. Через заголовок Authorization

```bash
# 1. Закодируйте credentials в base64
echo -n "admin:admin" | base64
# Вывод: YWRtaW46YWRtaW4=

# 2. Используйте в заголовке
curl -H "Authorization: Basic YWRtaW46YWRtaW4=" \
  http://localhost:8080/api/admin/users
```

#### 3. Через переменные окружения

```bash
# Установка переменных
export API_USER="admin"
export API_PASSWORD="admin"
export API_BASE="http://localhost:8080"

# Использование
curl -u $API_USER:$API_PASSWORD \
  $API_BASE/api/admin/users
```

#### 4. Создание алиаса для удобства

```bash
# Добавьте в ~/.bashrc или ~/.zshrc
alias api-call='curl -u admin:admin -H "Content-Type: application/json"'

# Теперь используйте так:
api-call http://localhost:8080/api/admin/users
```

---

### Тестирование аутентификации

```bash
#!/bin/bash

echo "=== Тест аутентификации ==="

# ❌ Без учетных данных
echo "1. Без учетных данных (401):"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" \
  http://localhost:8080/api/admin/users

# ✅ С учетными данными админа
echo -e "\n2. С учетными данными админа (200):"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" \
  -u admin:admin \
  http://localhost:8080/api/admin/users

# ❌ С неправильными учетными данными
echo -e "\n3. С неправильным паролем (401):"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" \
  -u admin:wrongpassword \
  http://localhost:8080/api/admin/users

# ✅ Пользователь USER (403 для admin endpoints)
echo -e "\n4. USER пытается получить доступ к admin endpoints (403):"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" \
  -u user:user \
  http://localhost:8080/api/admin/users
```

---

## 👥 Роли и права доступа

### Определение ролей

| Роль | Описание | Права |
|------|---------|-------|
| **ROLE_ADMIN** | Администратор системы | ✅ Все операции (CRUD для пользователей) |
| **ROLE_USER** | Обычный пользователь | ✅ Просмотр только своего профиля |

### Матрица прав доступа

| Endpoint | ADMIN | USER | Guest |
|----------|-------|------|-------|
| `GET /api/admin/users` | ✅ | ❌ | ❌ |
| `GET /api/admin/users/{id}` | ✅ | ❌ | ❌ |
| `POST /api/admin/users` | ✅ | ❌ | ❌ |
| `PUT /api/admin/users/{id}` | ✅ | ❌ | ❌ |
| `DELETE /api/admin/users/{id}` | ✅ | ❌ | ❌ |
| `GET /api/user` | ✅ | ✅ | ❌ |
| `/admin` (страница) | ✅ | ❌ | ❌ |
| `/user` (страница) | ✅ | ✅ | ❌ |
| `/login` (страница) | ✅ | ✅ | ✅ |

### Примеры разного доступа

#### Админ имеет полный доступ:
```bash
curl -u admin:admin http://localhost:8080/api/admin/users
# ✅ 200 OK
```

#### User видит только свой профиль:
```bash
curl -u user:user http://localhost:8080/api/user
# ✅ 200 OK

curl -u user:user http://localhost:8080/api/admin/users
# ❌ 403 Forbidden
```

#### Guest не может ничего делать:
```bash
curl http://localhost:8080/api/user
# ❌ 401 Unauthorized
```

---

## ✨ Особенности

### 1. Динамическое обновление страницы

При создании, редактировании или удалении пользователя страница обновляется **без перезагрузки** благодаря JavaScript и Fetch API.

**Как это работает:**
```javascript
// JavaScript код в admin.js
fetch('/api/admin/users', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(userData)
})
.then(response => response.json())
.then(data => {
  // Обновить таблицу пользователей
  refreshUserTable();
})
.catch(error => console.error('Ошибка:', error));
```

---

### 2. Разделение ролей

- **MVC контроллеры** (`/controller/`) — рендеринг HTML страниц
- **REST контроллеры** (`/rest/`) — JSON API для фронтенда

---

### 3. Безопасность паролей

Все пароли хранятся в **зашифрованном виде** с использованием BCryptPasswordEncoder.

```java
// В Service
passwordEncoder.encode("plainTextPassword")
// Результат: $2a$10$slYQmyNdGzin7olVN3p5be... (невозможно расшифровать)
```

---

### 4. Связь ManyToMany между User и Role

```
┌──────────┐         ┌───────────┐         ┌──────────┐
│   User   │◄────────┤user_roles │────────►│   Role   │
└──────────┘         └───────────┘         └──────────┘
  id (PK)               user_id (FK)          id (PK)
  name                  role_id (FK)          name
  email
  password
```

---

## ⚠️ Возможные ошибки

### Ошибка 1: "Connection refused" при запуске

```
java.net.ConnectException: Connection refused: connect
```

**Решение:**
1. Убедитесь, что MySQL запущена:
   ```bash
   # Windows
   services.msc  # Поищите MySQL80

   # Linux/Mac
   ps aux | grep mysql
   ```

2. Проверьте настройки БД в `application.properties`

3. Создайте БД:
   ```sql
   CREATE DATABASE jdbc_hibernate;
   ```

---

### Ошибка 2: "401 Unauthorized" при доступе к API

```json
{
  "status": 401,
  "error": "Unauthorized"
}
```

**Решение:**
- Добавьте флаг `-u username:password` к curl запросу
- Проверьте правильность пароля
- Убедитесь, что пользователь существует в БД

```bash
# ❌ Неправильно
curl http://localhost:8080/api/admin/users

# ✅ Правильно
curl -u admin:admin http://localhost:8080/api/admin/users
```

---

### Ошибка 3: "403 Forbidden" для USER при доступе к /admin

```json
{
  "status": 403,
  "error": "Forbidden"
}
```

**Решение:**
- USER не имеет прав доступа к админ функциям
- Используйте аккаунт ADMIN:

```bash
# ❌ USER не может
curl -u user:user http://localhost:8080/api/admin/users

# ✅ ADMIN может
curl -u admin:admin http://localhost:8080/api/admin/users
```

---

### Ошибка 4: "Port 8080 is already in use"

```
Address already in use: bind
```

**Решение — опция 1: Освободить порт**
```bash
# Linux/Mac
lsof -i :8080
kill -9 <PID>

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Решение — опция 2: Использовать другой порт**
```properties
# В application.properties
server.port=8081
```

Затем запустите на `http://localhost:8081`

---

### Ошибка 5: "Syntax error in SQL statement"

```
org.hibernate.exception.GenericJDBCException: could not execute statement
```

**Решение:**
- Убедитесь, что MySQL версия 8.0+
- Проверьте синтаксис в `application.properties`
- Используйте правильный dialect:

```properties
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

---

### Ошибка 6: Пользователь существует но "Пользователь не найден"

**Решение:**
- Используйте правильный ID
- Проверьте ID пользователя:

```bash
curl -u admin:admin http://localhost:8080/api/admin/users | jq '.[] | {id: .id, name: .name}'
```

---

## 🔄 Дальнейшее развитие

### Краткосрочные улучшения (1-2 недели)

- [ ] Добавить валидацию входных данных (`@Valid`, `@NotBlank`)
- [ ] Реализовать обработку ошибок через `@ControllerAdvice`
- [ ] Добавить Swagger документацию
- [ ] Написать Unit-тесты для сервисов

### Среднесрочные улучшения (1 месяц)

- [ ] Добавить JWT аутентификацию вместо Basic Auth
- [ ] Реализовать Refresh Token механизм
- [ ] Добавить Pagination для списка пользователей
- [ ] Написать интеграционные тесты

### Долгосрочные улучшения (3+ месяца)

- [ ] Добавить логирование (SLF4J, Logback)
- [ ] Реализовать аудит операций
- [ ] Добавить кэширование (Redis)
- [ ] Развернуть на продакшене (Docker, Kubernetes)
- [ ] Добавить дополнительные роли (MODERATOR, SUPPORT и т.д.)
- [ ] Реализовать двухфакторную аутентификацию (2FA)

---

## 📞 Полезные ресурсы

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security Guide](https://spring.io/guides/gs/securing-web/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [REST API Best Practices](https://restfulapi.net/)
- [curl Manual](https://curl.se/docs/manual.html)
- [jq Manual](https://stedolan.github.io/jq/manual/)

---

## 👨‍💻 Автор

**Roman** (Riss2121)  
GitHub: [@Riss2121](https://github.com/Riss2121)

---

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. Смотрите файл LICENSE для более подробной информации.

---

## 🤝 Вклад в проект

Если вы нашли баг или у вас есть предложение по улучшению:

1. Создайте Issue в репозитории
2. Отправьте Pull Request с описанием изменений
3. Убедитесь, что код прошел тестирование

---

## ❓ Часто задаваемые вопросы

### Q: Как изменить пароль пользователя?
**A:** Используйте PUT endpoint:
```bash
curl -u admin:admin \
  -X PUT http://localhost:8080/api/admin/users/2 \
  -H "Content-Type: application/json" \
  -d '{"name":"User","email":"user@example.com","password":"newPassword","roles":[{"id":2,"name":"ROLE_USER"}]}'
```

### Q: Как создать нового администратора через curl?
**A:** Укажите ROLE_ADMIN в roles:
```bash
curl -u admin:admin \
  -X POST http://localhost:8080/api/admin/users \
  -H "Content-Type: application/json" \
  -d '{
    "name":"New Admin",
    "email":"newadmin@example.com",
    "password":"adminPassword",
    "roles":[{"id":1,"name":"ROLE_ADMIN"}]
  }'
```

### Q: Как удалить все пользователей кроме администратора?
**A:** Получите список, отфильтруйте и удалите:
```bash
# Получить всех user-ов (не администраторов)
curl -u admin:admin http://localhost:8080/api/admin/users | \
  jq '.[] | select(.roles[].name == "ROLE_USER") | .id' | \
  while read id; do
    curl -u admin:admin -X DELETE http://localhost:8080/api/admin/users/$id
  done
```

### Q: Как экспортировать данные пользователей в JSON?
**A:**
```bash
curl -u admin:admin http://localhost:8080/api/admin/users | jq '.' > users_export.json
```

### Q: Как импортировать пользователей из JSON?
**A:**
```bash
cat users.json | jq '.[] | {name, email, password, roles}' | while read user; do
  curl -u admin:admin \
    -X POST http://localhost:8080/api/admin/users \
    -H "Content-Type: application/json" \
    -d "$user"
done
```

---

## 📝 Чек-лист для запуска

- [ ] Java 17+ установлена
- [ ] Maven 3.6+ установлен
- [ ] MySQL 8.0+ установлена и запущена
- [ ] База данных `jdbc_hibernate` создана
- [ ] `application.properties` отредактирован с правильными креденшалами
- [ ] Проект скачан/клонирован
- [ ] Проект запущен (`mvn spring-boot:run`)
- [ ] Приложение доступно на `http://localhost:8080/login`
- [ ] API тестируется с curl командами

---

**Последнее обновление:** 2026-04-06  
**Версия документации:** 2.0
