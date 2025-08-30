FROM eclipse-temurin:21-jdk AS base
WORKDIR /app

COPY --chmod=755 api/mvnw ./
COPY api/.mvn .mvn

COPY api/pom.xml ./
RUN ./mvnw dependency:go-offline

COPY api/src src

FROM base AS build
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre AS prod
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
