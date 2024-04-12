CREATE DATABASE db_todoappfullstack;

USE db_todoappfullstack;

CREATE TABLE tb_task (
    id_task INT PRIMARY KEY AUTO_INCREMENT,
    nm_task VARCHAR(50),
    isCompleted BOOLEAN
);