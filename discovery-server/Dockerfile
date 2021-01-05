FROM openjdk:11.0.8-jre-slim-buster

EXPOSE 8761

ADD ./build/libs/*.jar app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
