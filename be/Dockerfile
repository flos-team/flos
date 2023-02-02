FROM gradle:7.4-jdk17-alpine as build
WORKDIR /
COPY . .
RUN gradle clean build --no-daemon
RUN ls -l build/libs

FROM openjdk:17-alpine
WORKDIR /
COPY --from=build /build/libs /
CMD ["java", "-jar", "flos-0.0.1-SNAPSHOT.jar"]
