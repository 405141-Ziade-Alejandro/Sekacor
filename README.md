# Sekacor

## estructura general:
```
/gestor-tanques/
│
├── back/              # Proyecto Java Spring
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
│
├── front/             # Proyecto Angular
│   ├── src/
│   ├── angular.json
│   └── Dockerfile
│
├── docker-compose.yml
├── .gitignore
└── README.md

```
## 📦 Detalle de las imágenes Docker
🔧 /back/Dockerfile (Spring Boot)
```
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests
EXPOSE 8080
CMD ["java", "-jar", "target/tu-jar-final.jar"]
```
    Asegurarse de que el .jar se llame igual o ajustá el CMD.

## 🧪 /front/Dockerfile (Angular)
```
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/tu-nombre-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

```
Reemplazá /dist/tu-nombre-app por la ruta real que genera Angular cuando hacés ng build.

## ⚙️ docker-compose.yml (en la raíz)
``` yaml
version: '3.8'
services:
  backend:
    build: ./back
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/tanques
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=root

  frontend:
    build: ./front
    ports:
      - "4200:80"
    depends_on:
      - backend

  db:
    image: mysql:8
    environment:
      - MYSQL_DATABASE=tanques
      - MYSQL_ROOT_PASSWORD=root
    ports:
      - "3306:3306"
    volumes:
      - dbdata:/var/lib/mysql

volumes:
  dbdata:
```