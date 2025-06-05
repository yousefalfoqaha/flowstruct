FROM eclipse-temurin:23-jdk
WORKDIR /gjuplans/services/backend

RUN apt-get update && apt-get install -y maven

COPY pom.xml ./

RUN mvn dependency:go-offline -B

COPY src src

EXPOSE 8080

CMD ["mvn", "spring-boot:run"]