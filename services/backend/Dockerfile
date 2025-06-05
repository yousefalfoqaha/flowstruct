FROM eclipse-temurin:23-jdk AS build
WORKDIR /gjuplans/services/backend

RUN apt-get update && apt-get install -y maven

COPY pom.xml ./

RUN ./mvnw dependency:go-offline

COPY src src

RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:23-jdk
WORKDIR /gjuplans/services/backend

COPY --from=build /gjuplans/services/backend/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
