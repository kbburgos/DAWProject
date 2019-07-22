use sistemmedico;
/*
rol

0= administrador
1= medico
2= recepcion

*/
Insert into usersist values ('0952669661', 'DAW20191S', 'jorah', 'mormont','jorahmormont@gmail.com','0910786615',1, 1, null, now());
Insert into usersist values ('0915628478', 'DAW20191S2', 'sansa', 'stark','sansastark@gmail.com','0910786612',1, 2, null, now());


Insert into paciente values ('0325874169', 'Galo Angres', 'Bustamante', 'gbustament@gmail.com', '0952669661', null, now());
Insert into paciente values ('0124789563', 'Maria', 'Burgos', 'mb@gmail.com', '0952669662', null, now());


Insert into examenes (image, tipo, create_at, id_paciente)values (null, 'examen de sangre', now(),'0325874169');
Insert into examenes (image, tipo, create_at, id_paciente)values (null, 'rayos x', now(),'0124789563');


Insert into cita (title, node, create_at, is_active, id_paciente, id_medico)values ('control','', now(),1,'0325874169','0952669661');
Insert into cita (title, node, create_at, is_active, id_paciente, id_medico)values ('blanqueo','', now(),1,'0124789563','0915628478');


Insert into odontograma (cara, tratamiento, pos, create_at, cedula)values ('', '', 1, now(), '0325874169');
Insert into odontograma (cara, tratamiento, pos, create_at, cedula)values ('', '', 1, now(), '0124789563');



Insert into tratamiento values (1,'', '', '0325874169');
Insert into tratamiento values (2,'', '', '0124789563');