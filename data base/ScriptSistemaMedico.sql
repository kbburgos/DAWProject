create database SistemMedico;
use SistemMedico;
/*CREATE USER 'medicina'@'localhost' identified by 'medicina';
GRANT ALL PRIVILEGES ON SistemMedico.* TO medicina@localhost;
FLUSH PRIVILEGES;*/

create table roles(
	codigo int primary key auto_increment,
    nombre varchar(15),
    descripcion varchar(30),
    createdAt datetime,
    updatedAt datetime);
    
create table userSistems(
    cedula varchar(10) primary key,
    pasword varchar(64),
    nombreUser varchar(50),
    apellidoUser varchar(50),
    email varchar(100),
    phone varchar(50),
    is_active tinyint,
    rol int,
    image longblob,
    createdAt datetime,
    updatedAt datetime,
    constraint fkroluserSist foreign key (rol) references roles(codigo));
    
    
create table pacientes(
	cedula varchar(10) primary key,
    nombre varchar(50),
    apellido varchar(50),
    email varchar(100),
    phone varchar(50),
    image longblob,
    createdAt datetime,
    updatedAt datetime
	);
    
    
create table tipoExamenes(
	codigo int primary key auto_increment,
    nombre varchar(30),
    descripcion varchar(30),
    createdAt datetime,
    updatedAt datetime);
    
    
create table examen_Pacientes(
	codigo int primary key auto_increment,
    tipoExamen int,
    image longblob,
    createdAt datetime,
    updatedAt datetime,
    id_paciente varchar(10),
    constraint fkexamenpaciente foreign key (id_paciente) references pacientes(cedula),
    constraint fktipoExamen foreign key (tipoExamen) references tipoExamenes(codigo));


create table citas(
	codigo int primary key auto_increment,
    titulo varchar(50),
    node text,
    createdAt datetime,
    updatedAt datetime,
    is_active tinyint,
    id_paciente varchar(10),
    id_medico varchar(10),
    constraint fkcitapaciente foreign key (id_paciente) references pacientes(cedula),
    constraint fkcitamedico foreign key (id_medico) references userSistems(cedula)
	);
    
create table tratamientoOdontogramas(
	codigo int primary key auto_increment,
    nombre varchar(30),
    ruta text,
    createdAt datetime,
    updatedAt datetime);

create table caraDientes(
	codigo int primary key auto_increment,
    nombre varchar(20),
    createdAt datetime,
    updatedAt datetime);
    
create table odontogramas(
	codigo int primary key auto_increment,
    cara int,
    tratamiento int,
    pos int,
    createdAt datetime,
    updatedAt datetime,
    cedula varchar(10),
    constraint fkodontogramapaciente foreign key (cedula) references pacientes(cedula),
    constraint fkodontogramatratamiento foreign key (tratamiento) references tratamientoOdontogramas(codigo),
    constraint fkodontogramacara foreign key (cara) references caraDientes(codigo)
    );
    
create table tipoTratamientos(
	codigo int primary key auto_increment,
    nombre varchar(30),
    descripcion varchar(50),
    createdAt datetime,
    updatedAt datetime);
    
    
create table tratamientos(
	codigo int primary key,
    descripcion text,
    tipo int,
    cedula varchar(10),
    createdAt datetime,
    updatedAt datetime,
    constraint fktratamientopaciente foreign key (cedula) references pacientes(cedula),
    constraint fktipotratamiento foreign key (tipo) references tipoTratamientos(codigo)
);