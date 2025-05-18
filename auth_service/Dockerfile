FROM openjdk:21
WORKDIR /app
COPY target/auth-service-*.jar auth-service.jar
ENTRYPOINT ["java", "-jar", "auth-service.jar"]
