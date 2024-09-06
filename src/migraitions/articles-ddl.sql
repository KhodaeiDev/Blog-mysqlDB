CREATE TABLE articles (
    id int(10) unsigned NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    content mediumtext  NOT NULL,
    slug varchar(255) NOT NULL,
    author_id int(10) unsigned NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    
    PRIMARY KEY(id),
    UNIQUE KEY article_unique (slug),
    KEY article_author_fk (author_id),
    CONSTRAINT article_author_fk FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=INNODB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;