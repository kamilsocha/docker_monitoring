FROM openjdk:11.0.8-jre-slim-buster

EXPOSE 8888

RUN mkdir /app
RUN mkdir /app/config
COPY ./build/libs/*.jar /app/app.jar
# ADD ./src/main/resources/configs /app/config

# VOLUME /app/config

# ENV WAIT_VERSION 2.7.2
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/${WAIT_VERSION}/wait /wait
# RUN chmod +x /wait

ENTRYPOINT ["java","-Dspring.profiles.active=native,docker","-jar","/app/app.jar"]
