FROM eclipse-temurin:23-jdk
WORKDIR /app

COPY mvnw ./
COPY .mvn .mvn
COPY pom.xml ./

RUN chmod +x ./mvnw && \
    sed -i 's/\r$//' ./mvnw

RUN ./mvnw dependency:go-offline -B

EXPOSE 8080
CMD ["./mvnw", "spring-boot:run"]
