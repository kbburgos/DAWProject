create database SistemMedico;
use SistemMedico;



create table userSist(
	id_user int primary key,
    username varchar(50),
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
	id_paciente int primary key,
    namepaciente varchar(50),
    lastname varchar(50),
    email varchar(100),
    phone varchar(50),
    image longblob,
    create_at timestamp
	);
    
create table examenes(
	id_examenes int primary key,
    image longblob,
    tipo text,
    create_at timestamp,
    id_paciente int,
    constraint fkexamenpaciente foreign key (id_paciente) references paciente(id_paciente));


create table cita(
	id_cita int primary key,
    title varchar(50),
    node text,
    create_at text,
    is_active tinyint,
    id_paciente int,
    id_medico int,
    constraint fkcitapaciente foreign key (id_paciente) references paciente(id_paciente),
    constraint fkcitamedico foreign key (id_medico) references userSist(id_user)
	);
    
    
create table odontograma(
	id_odontograma int primary key,
    cara varchar(30),
    tratamiento varchar(30),
    pos int,
    create_at timestamp,
    id_paciente int,
    constraint fkodontogramapaciente foreign key (id_paciente) references paciente(id_paciente)
    );
    

create table tratamiento(
	id_tratamiento int primary key,
    descripcion text,
    tipo varchar(50),
    id_paciente int,
    constraint fktratamientopaciente foreign key (id_paciente) references paciente(id_paciente)
);