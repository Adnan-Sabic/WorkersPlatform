FROM openjdk:17
WORKDIR /
ADD target/platformBackend-0.0.1-SNAPSHOT.jar app.jar
RUN useradd -m ado
USER ado
CMD java -Dspring.profiles.active=docker -jar app.jar