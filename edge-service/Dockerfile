FROM openjdk:11.0.8-jre-slim-buster

EXPOSE 8080

COPY ./build/libs/*.jar app.jar

# ENV WAIT_VERSION 2.7.2
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/${WAIT_VERSION}/wait /wait
# RUN chmod +x /wait

ENTRYPOINT ["java","-Dspring.profiles.active=docker","-jar","/app.jar"]
