FROM eclipse-temurin:21-jdk AS deps
WORKDIR /app

COPY --chmod=755 api/mvnw ./
COPY api/.mvn .mvn

COPY api/pom.xml ./
RUN ./mvnw dependency:go-offline

FROM deps AS build

COPY api/src src

RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre AS runtime
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
