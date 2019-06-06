<?php
define('MODULO_DEFECTO', 'home');
define('LAYOUT_DEFECTO', 'default.php');
define('MODULO_PATH', realpath('html/view/'));
define('LAYOUT_PATH', realpath('html/layouts/'));

$conf['home'] = array(
       'archivo' => 'home/widget-default.php',
       'layout' => LAYOUT_DEFECTO
);

$conf['citas'] = array(
       'archivo' => 'reservations/widget-default.php',
);

$conf['pacientes'] = array(
       'archivo' => 'pacients/widget-default.php',
);

$conf['medicos'] = array(
       'archivo' => 'medics/widget-default.php',
);
$conf['usuarios'] = array(
       'archivo' => 'users/widget-default.php',
);
$conf['newpacient'] = array(
       'archivo' => 'newpacient/widget-default.php',
);
$conf['newmedic'] = array(
       'archivo' => 'newmedic/widget-default.php',
);
$conf['newuser'] = array(
       'archivo' => 'newuser/widget-default.php',
);
$conf['view_exa'] = array(
       'archivo' => 'view_exa/widget-default.php',
);
$conf['add_exa'] = array(
       'archivo' => 'add_exa/widget-default.php',
);

?>
