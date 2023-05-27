create database TrapVibeZ;
use TrapVibeZ;
create table usuario(
idUsuario int primary key auto_increment,
nome varchar(50),
email varchar(50),
senha varchar(100)
);

create table quiz(
idQuiz int primary key auto_increment,
acertos int,
erros int,
fkUsuario int,
foreign key (fkUsuario) references
usuario (idUsuario)
);

create table noticia(
idNoticia int primary key auto_increment,
descricao varchar(1000),
link varchar(1000),
img varchar(1000),
dia int,
mes int,
ano int
);

select*from usuario;
select*from quiz;
select*from noticia;