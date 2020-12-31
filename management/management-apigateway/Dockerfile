FROM openjdk:11.0.8-jre-slim-buster

EXPOSE 8080

COPY ./build/libs/*.jar app.jar

#COPY ./systemsConfig.json systemsConfig.json

ENTRYPOINT ["java","-Dspring.profiles.active=docker,development","-jar","/app.jar"]
