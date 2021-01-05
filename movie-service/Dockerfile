FROM openjdk:11.0.8-jre-slim-buster

EXPOSE 8080

RUN mkdir /app
COPY ./build/libs/*.jar /app/app.jar
COPY ./src/main/resources/data-test.sql /app/data-test.sql
COPY ./data_file.json /app/data_file.json

ENTRYPOINT ["java","-jar","/app/app.jar"]
