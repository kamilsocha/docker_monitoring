FROM openjdk:11.0.8-jre-slim-buster

EXPOSE 8888

RUN mkdir /app
RUN mkdir /app/config
COPY ./build/libs/*.jar /app/app.jar
COPY ./src/main/resources/configs /app/config

ENTRYPOINT ["java","-Dspring.profiles.active=native,docker","-jar","/app/app.jar"]
