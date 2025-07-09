FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

COPY --chmod=755 mvnw ./
COPY .mvn .mvn

COPY pom.xml ./
RUN ./mvnw dependency:go-offline

COPY src src

RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre AS prod
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
