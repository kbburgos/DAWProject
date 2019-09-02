use sistemmedico;


insert into caradientes (nombre, createdAt, updatedAt) values('O',now(),now());
insert into caradientes (nombre, createdAt, updatedAt) values('L',now(),now());
insert into caradientes (nombre, createdAt, updatedAt) values('D',now(),now());
insert into caradientes (nombre, createdAt, updatedAt) values('P',now(),now());
insert into caradientes (nombre, createdAt, updatedAt) values('M',now(),now());
insert into caradientes (nombre, createdAt, updatedAt) values('V',now(),now());
insert into caradientes (nombre, createdAt, updatedAt) values('default',now(),now());

insert into tipotratamientos(nombre, descripcion, createdAt, updatedAt) values('blanqueamiento','con tus dientes',now(),now());
insert into tipotratamientos(nombre, descripcion, createdAt, updatedAt) values('profilagsis','tambien con tus dientes',now(),now());

insert into pacientes values('0213654789','Jonathan','Sesme','jp@gmail.com','123456789','2019/07/25','05:05:05',now(),now());
insert into pacientes values('8523697412','Karla','Burgos','kb@gmail.com','123456755','2019/07/25','05:05:05',now(),now());
insert into pacientes values('0214785963','Tony','Veas','tv@gmail.com','123456744','2019/07/25','05:05:05',now(),now());
insert into pacientes values('2014777458','Carlos','Quintana','cq@gmail.com','123456745','2019/07/25','05:05:05',now(),now());


insert into roles (nombre, descripcion, createdAt, updatedAt) values ('administrador','administra el sistema',now(),now());
insert into roles (nombre, descripcion, createdAt, updatedAt) values ('medico','estudiante que atiende a paciente',now(),now());


insert into usersistems values('8854796625','daw2019','Travis','Maddox','tm@gmail.com','47588',1,1,null,now(),now());
insert into usersistems values('8854777455','daw2019','Liam','James','lj@gmail.com','47558',1,2,null,now(),now());


insert into citas (titulo, nota, createdAt, updatedAt, is_active, id_paciente, id_medico, fecha, hora)values('titulo1','node1',now(),now(),1,'0213654789','8854777455', '2019/07/25','05:05:05');
insert into citas (titulo, nota, createdAt, updatedAt, is_active, id_paciente, id_medico, fecha, hora)values('titulo2','node2',now(),now(),1,'8523697412','8854777455', '2019/07/25','05:05:05');
insert into citas (titulo, nota, createdAt, updatedAt, is_active, id_paciente, id_medico, fecha, hora)values('titulo3','node3',now(),now(),1,'0214785963','8854777455', '2019/07/25','05:05:05');
insert into citas (titulo, nota, createdAt, updatedAt, is_active, id_paciente, id_medico, fecha, hora)values('titulo4','node4',now(),now(),1,'2014777458','8854777455', '2019/07/25','05:05:05');


insert into examen_pacientes (descripExamen, image, createdAt, updatedAt, id_paciente) values ('examen de sangre',null,now(),now(),'0213654789');
insert into examen_pacientes (descripExamen, image, createdAt, updatedAt, id_paciente) values ('examen de VIH, rayos X',null,now(),now(),'0214785963');
insert into examen_pacientes (descripExamen, image, createdAt, updatedAt, id_paciente) values ('examen de sangre, prueba de azucar',null,now(),now(),'8523697412');


insert into tratamientoodontogramas(nombre, ruta, createdAt, updatedAt)values('extracción', '/simbolosOdontograma/extraccion.png',now(),now());
insert into tratamientoodontogramas(nombre, ruta, createdAt, updatedAt)values('sellante', '/simbolosOdontograma/sellante.png',now(),now());
insert into tratamientoodontogramas(nombre, ruta, createdAt, updatedAt)values('corona', '/simbolosOdontograma/corona.png',now(),now());
insert into tratamientoodontogramas(nombre, ruta, createdAt, updatedAt)values('prótesis removible', '/simbolosOdontograma/protesisR.png',now(),now());
insert into tratamientoodontogramas(nombre, ruta, createdAt, updatedAt)values('caries', '/simbolosOdontograma/carie.png',now(),now());
insert into tratamientoodontogramas(nombre, ruta, createdAt, updatedAt)values('restauración', '/simbolosOdontograma/restauracion.png',now(),now());
insert into tratamientoodontogramas(nombre, ruta, createdAt, updatedAt)values('endodoncia', '/simbolosOdontograma/endodoncia.png',now(),now());
insert into tratamientoodontogramas(nombre, ruta, createdAt, updatedAt)values('prótesis total', '/simbolosOdontograma/protesisT.png',now(),now());
insert into tratamientoodontogramas(nombre, ruta, createdAt, updatedAt)values('extracción indicada', '/simbolosOdontograma/extraccionI.png',now(),now());
insert into tratamientoodontogramas(nombre, ruta, createdAt, updatedAt)values('prótesis fija', '/simbolosOdontograma/protesisF.png',now(),now());


insert into odontogramas (cara,tratamiento,pos,createdAt,updatedAt, cedula) values(1,1,1,now(),now(),'2014777458');
insert into odontogramas (cara,tratamiento,pos,createdAt,updatedAt, cedula) values(2,2,3,now(),now(),'0214785963');
insert into odontogramas (cara,tratamiento,pos,createdAt,updatedAt, cedula) values(3,3,4,now(),now(),'8523697412');


insert into tratamientos (descripcion, tipo, cedula, createdAt, updatedAt)values('descpt1',1,'2014777458',now(),now());
insert into tratamientos (descripcion, tipo, cedula, createdAt, updatedAt)values('descpt2',2,'8523697412',now(),now());


