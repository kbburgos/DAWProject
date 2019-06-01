<?php
define('MODULO_DEFECTO', 'home');
define('LAYOUT_DEFECTO', 'default.php');
define('MODULO_PATH', realpath('html/view/'));
define('LAYOUT_PATH', realpath('html/layouts/'));

$conf['home'] = array(
       'archivo' => 'home/index.php',
       'layout' => LAYOUT_DEFECTO
);

?>
