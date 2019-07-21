create database SistemMedico;
use SistemMedico;
CREATE USER 'medicina'@'localhost' identified by 'medicina';
GRANT ALL PRIVILEGES ON SistemMedico.* TO medicina@localhost;
FLUSH PRIVILEGES;

create table userSist(
    cedula varchar(10) primary key,
    pasword varchar(50),
    nameuser varchar(50),
    lastname varchar(50),
    email varchar(100),
    phone varchar(50),
    is_active tinyint,
    rol tinyint,
    image longblob,
    create_at timestamp);
    

create table paciente(
	cedula varchar(10) primary key,
    namepaciente varchar(50),
    lastname varchar(50),
    email varchar(100),
    phone varchar(50),
    image longblob,
    create_at timestamp
	);
    
create table examenes(
	id_examenes int primary key auto_increment,
    image longblob,
    tipo text,
    create_at timestamp,
    id_paciente varchar(10),
    constraint fkexamenpaciente foreign key (id_paciente) references paciente(cedula));


create table cita(
	id_cita int primary key auto_increment,
    title varchar(50),
    node text,
    create_at text,
    is_active tinyint,
    id_paciente varchar(10),
    id_medico varchar(10),
    constraint fkcitapaciente foreign key (id_paciente) references paciente(cedula),
    constraint fkcitamedico foreign key (id_medico) references userSist(cedula)
	);
    
    
create table odontograma(
	id_odontograma int primary key auto_increment,
    cara varchar(30),
    tratamiento varchar(30),
    pos int,
    create_at timestamp,
    cedula varchar(10),
    constraint fkodontogramapaciente foreign key (cedula) references paciente(cedula)
    );
    

create table tratamiento(
	id_tratamiento int primary key,
    descripcion text,
    tipo varchar(50),
    cedula varchar(10),
    constraint fktratamientopaciente foreign key (cedula) references paciente(cedula)
);