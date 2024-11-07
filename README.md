Api Creada con el Frmamework Expressjs , utilza servicios para gestionar, usuarios mediante un CRUD, tiena autentificacion mediante JWT

Base de datos en MySQL
create database node_api;
create table users(
id int not null auto_increment primary key,
name varchar(50),
last_name varchar(50),
age int(3)
);

create table auth (
id  int not null auto_increment primary key,
username varchar(60),
password varchar(60)
);
