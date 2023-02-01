FROM gradle:7.4-jdk17-alpine as build
RUN mkdir -p /be
WORKDIR /be
COPY . .
RUN gradle clean build --no-daemon

FROM openjdk:17-alpine
RUN mkdir -p /home/be
WORKDIR /home/be
COPY --from=build /be/build/libs/*.jar /home/be/app.jar 
CMD ["java", "-jar", "app.jar"]
