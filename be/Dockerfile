FROM gradle:7.4-jdk17-alpine as build
WORKDIR /
COPY . .
RUN gradle clean build --no-daemon

FROM openjdk:17-alpine
WORKDIR /
COPY --from=build /build/libs/*.jar /app.jar 
CMD ["java", "-jar", "app.jar"]
