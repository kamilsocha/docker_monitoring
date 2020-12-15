FROM openjdk:11.0.8-jre-slim-buster

EXPOSE 8080

RUN mkdir /app
COPY ./build/libs/*.jar /app/app.jar

ENTRYPOINT ["java","-Dspring.profiles.active=docker","-jar","/app/app.jar"]
