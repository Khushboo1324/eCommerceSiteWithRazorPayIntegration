# E-Commerce Application

This repository contains a full-stack **E-Commerce Application** built using **Spring Boot (Java)** for the backend and a **modern JavaScript frontend** (React-based) for the client side.

---

## 📁 Project Structure

```
e-com/
├── frontend/        # Frontend application (React)
├── src/             # Backend source code (Spring Boot)
├── pom.xml          # Maven configuration
├── mvnw, mvnw.cmd   # Maven wrapper scripts
├── .env             # Environment variables
├── HELP.md          # Spring Boot help file
├── target/          # Build output (generated)
└── README.md        # Project documentation
```

---

## 🚀 Features

- User authentication and authorization
- Product listing and search
- Shopping cart and checkout
- Order management
- RESTful APIs
- Responsive frontend UI

---

## 🛠️ Tech Stack

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- MySQL / H2 (configurable)

### Frontend
- React
- JavaScript
- HTML5 & CSS3
- Axios (API calls)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd e-com
```

---

### 2. Backend Setup (Spring Boot)

#### Prerequisites
- Java 17+
- Maven

#### Run Backend

```bash
./mvnw spring-boot:run
```

Backend will start at:
```
http://localhost:8080
```

---

### 3. Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Frontend will start at:
```
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/ecom_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=yourpassword
```

---

## 🧪 Testing

```bash
./mvnw test
```

---

## 📦 Build

```bash
./mvnw clean package
```

The JAR file will be generated in:
```
target/
```

---

## 📌 Notes

- Make sure MySQL is running before starting the backend.
- Update database credentials in `.env` or `application.properties`.

---

## 👩‍💻 Author

**Choudhary Khushboo**

---

## 📄 License

This project is licensed under the MIT License.

