# Builds and runs the Spring Boot backend. Render (and most hosts) use this file automatically.

# --- Step 1: build the jar with Maven ---
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q dependency:go-offline
COPY src ./src
RUN mvn -q package -DskipTests

# --- Step 2: run it on a small Java 21 image ---
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/portfolio-backend-1.0.0.jar app.jar

# Use the online settings (application-prod.properties)
ENV SPRING_PROFILES_ACTIVE=prod
# Keep memory use inside the free plan's limit
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75 -XX:+UseSerialGC"

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
