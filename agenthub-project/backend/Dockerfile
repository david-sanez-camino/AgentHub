# Build stage
FROM maven:3.6.3-jdk-8 AS build

# Build stage (compatible with ARM64/Jetson) para ivanfran
#FROM maven:3.8.8 AS build
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build
COPY src ./src
    RUN mvn clean package -Dmaven.test.skip=true
# runtime stage using a modern JRE with ARM support
FROM eclipse-temurin:8-jre
#PARA IVANFRAN
#FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
