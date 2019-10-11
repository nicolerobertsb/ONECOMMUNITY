DROP DATABASE IF EXISTS one_community_db;
CREATE DATABASE one_community_db;
USE one_community_db;

CREATE TABLE user(
    id INT AUTO_INCREMENT NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    about_me TEXT NOT NULL,
    PRIMARY KEY(id)
);
​
CREATE TABLE services(
    id INT AUTO_INCREMENT NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
​
CREATE TABLE request(
    id INT AUTO_INCREMENT NOT NULL,
    recipient_id INT NOT NULL,
    services_id INT NOT NULL,
    volunteer_id INT,
    detail TEXT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(recipient_id) REFERENCES user(id),
    FOREIGN KEY(services_id) REFERENCES services(id),
    FOREIGN KEY(volunteer_id) REFERENCES user(id)
);

CREATE TABLE response(
    id INT AUTO_INCREMENT NOT NULL,
    responder_id INT NOT NULL,
    request_id INT NOT NULL,
    start_date DATETIME,
    end_date DATETIME,
    PRIMARY KEY(id),
    FOREIGN KEY(responder_id) REFERENCES user(id),
    FOREIGN KEY(request_id) REFERENCES request(id)
);
​
CREATE TABLE times_available(
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES user(id)
);
​
CREATE TABLE user_services_jt(
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    services_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(services_id) REFERENCES services(id)
);
