CREATE TABLE users (
    id int(10) unsigned NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    avatar varchar(255) DEFAULT NULL,
    password varchar(255) DEFAULT NULL,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    provider ENUM("local","google","meta") NOT NULL DEFAULT "local",
    role ENUM("user","admin") NOT NULL DEFAULT "user",
    
    PRIMARY KEY (id),
    UNIQUE KEY users_unique_username (username),
    UNIQUE KEY users_unique_email (email)
) ENGINE=INNODB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;