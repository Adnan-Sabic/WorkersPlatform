# WorkersPlatform
Platform for workers and people looking for workers.
Description
Workers platform is a vertical C2C online marketplace which function is to connect seekers and service providers. Users can use the workers platform unauthenticated to see available offers and demands and filter them, but have the option to sing up and get more functionalities like creating an offer or demand, updating profile and so on.

# Technical aspects

On this picture is WorkersPlatform arhitecture shown.
![Alt text](https://github.com/Adnan-Sabic/WorkersPlatform/blob/migrate-to-MySQL/ArhitectureWorkersPlatform.png "Workers platform arhitecture")
 
    •	MySQL is the database used for keeping all data about users, advertisements, categories, citie... To manage database migrations I used the libary Flyway
    •	MinIO is a S3 object storage used to store users profile pictures and advertisements pictures.
    •	Spring boot is the framework used for creating the backend part of the workers platform. It connects to the database and MinIO. For the communication with MinIO the aws-java-sdk-bom library is used. 
    •	Adminer is used for easier manipulation with the database
    •	React is used to create the web page of the platform. The web page is responsive. To achieve responsiveness antD and @media query are used. To handle global states Redux is used. To make async calls to the backend application and MinIO (to retrieve and upload pictures) React Query and axios are used.

# How to start the application
All services of the platform are dockerized. To start the platform locally you need to have Docker installed.

    1.	Clone the git repository from migrate-to-MySQL branch locally
    2.	Position yourself into the folder platformBackend with some CLI (gitBash, cmd, openShell) and execute this commands
        1.	mvn clean package
        2.	docker build -t platform-back .
    3.	Position yourself into the folder frontend with some CLI (gitBash, cmd, openShell) and execute this command
        1.	docker build -t platform-front
    4.	Go back to platformBackend and execute
        1.	docker-compose up
    5.	You can find ur application at http://localhost:13000/

