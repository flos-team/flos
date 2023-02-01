FROM gradle:7.4-jdk17-alpine as build
WORKDIR /
COPY . .
RUN gradle clean build --no-daemon
RUN ls -l build/libs

FROM openjdk:17-alpine
WORKDIR /
RUN ls -l
COPY --from=build /build/libs/*.jar /app.jar 
CMD ["java", "-jar", "app.jar"]
