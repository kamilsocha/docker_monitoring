FROM openjdk:11.0.8-jre-slim-buster

VOLUME /tmp

EXPOSE 8080

ADD ./build/libs/*.jar app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
