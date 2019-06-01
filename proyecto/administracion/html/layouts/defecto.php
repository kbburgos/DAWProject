
<body>

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="index.php">Literatura ACP</a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="index.php?mod=home">Home</a></li>
      <li><a href="index.php?mod=noticias">Noticias</a></li>
        <li><a href="index.php?mod=historias">Todas las historias</a></li>
         <li><a href="index.php?mod=filtros">Buscar</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li><a href="index.php?mod=tu_historia"><span class="glyphicon glyphicon-user"></span> Tu historia</a></li>
      
        <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Registrate <span class="caret"></span></a>
        <ul class="dropdown-menu" style="width: 250px">
          
            <!-- formulario de login -->
            <?php
            if(isset($_COOKIE[md5("login")])){
                ?>
             <a href="index.php?mod=admin"><center><button type="submit" class="btn btn-success">Administrador</button></center></a>
                <?php
            }
            else
            {
                ?>
            <form action="controller/login/login.php" method="post" style="margin-left: 5px;
    margin-right: 5px;">
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" required>
    </div>
    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pwd" required>
    </div>
    
                <center><button type="submit" class="btn btn-success">Registrarse</button></center>
  </form>
            
            <?php
            }
            ?>
        </ul>
      </li>
    </ul>
  </div>
</nav>
  


</body>

