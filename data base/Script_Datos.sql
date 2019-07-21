use sistemmedico;
/*
rol

0= administrador
1= medico
2= recepcion

*/
Insert into usersist values (1, 'jorMor', 'DAW20191S', 'jorah', 'mormont','jorahmormont@gmail.com','0910786615',1, 1, null, now());
Insert into usersist values (2, 'santar', 'DAW20191S2', 'sansa', 'stark','sansastark@gmail.com','0910786612',1, 2, null, now());


Insert into paciente values (1, 'Galo Angres', 'Bustamante', 'gbustament@gmail.com', '0952669661', null, now());
Insert into paciente values (2, 'Maria', 'Burgos', 'mb@gmail.com', '0952669662', null, now());


Insert into examenes values (1, null, 'examen de sangre', now(),1);
Insert into examenes values (2, null, 'rayos x', now(),2);


Insert into cita values (1, 'control','', now(),1,1,2);
Insert into cita values (2, 'blanqueo','', now(),1,2,1);


Insert into odontograma values (1, '', '', 1, now(), 2);
Insert into odontograma values (2, '', '', 1, now(), 1);



Insert into tratamiento values (1, '', '', 1);
Insert into tratamiento values (2, '', '', 2);