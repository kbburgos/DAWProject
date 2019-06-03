<!DOCTYPE html>
<html lang="es">
<head>
  <title>Sis Medic - TBS</title>
  <meta charset="utf-8">
  <meta name="author" content="Tech Brain Solutions">
  <link rel="icon" href="resources/favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" media="screen">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
  <script src="https://kit.fontawesome.com/52540fbc5c.js"></script>
  <link rel="stylesheet" type="text/css" href="css/style-home.css" media="screen">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

</head>

<?php
include("html/controller/conf.php");

if (!empty($_REQUEST['mod'])) {
  $modulo = $_REQUEST['mod'];
}
else {
  $modulo = MODULO_DEFECTO;
}

if (empty($conf[$modulo])) {
  $modulo = MODULO_DEFECTO;
}

if (empty($conf[$modulo]['layout'])) {
  $conf[$modulo]['layout'] = LAYOUT_DEFECTO;
}

$path_layout = LAYOUT_PATH."/".$conf[$modulo]['layout'];
$path_modulo = MODULO_PATH."/".$conf[$modulo]['archivo'];

?>
<body>
    <?php
if (file_exists($path_layout)) {
  include( $path_layout );
}
else {
  die('Error al cargar');
}
?>

<?php
if (file_exists( $path_modulo )) {
    include( $path_modulo );
  }
  else {
      echo($path_modulo);
    die('Error al cargar el módulo **'.$modulo.'**. No existe el archivo **'.$conf[$modulo]['archivo'].'**');
  }
?>

<footer class="fixed-bottom text-center bg-dark" id="footer-text"><p class="mt-2">Sistema de gestión de pacientes <a href="index.php">Sis Medic - TBS </a>
  &copy; 2019 Todos los derechos reservados para <a target="_blank" href="https://www.facebook.com/TECHBRAIN.EC/"> Tech Brain SOlutions</a></p></footer>
</body>
</html>
