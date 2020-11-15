FROM openjdk:11.0.8-jre-slim-buster

EXPOSE 8080

ADD ./build/libs/*.jar app.jar

ENTRYPOINT ["java","-Dspring.profiles.active=docker","-jar","/app.jar"]
