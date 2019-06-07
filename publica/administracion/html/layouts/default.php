<div class="row bg-dark">
  <div class="col-sm-12">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <a class="navbar-brand" href="index.php">Sis Medic TBS <span class="badge badge-info">V 1.0</span></a>
      <a href="#" class="navbar-brand"><span class="btn btn-outline-info"> <i class="fas fa-plus-circle"></i> Nueva Cita </span></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="index.php"><i class="fas fa-home"></i> Home</a>
          </li>
          <li class="nav-item li-ocultar">
            <a class="nav-link" href="?mod=citas"><i class="fas fa-calendar-alt"></i> Citas</a>
          </li>
          <li class="nav-item li-ocultar">
            <a class="nav-link" href="?mod=pacientes"><i class="fas fa-male"></i> Pacientes</a>
          </li>
          <li class="nav-item li-ocultar">
            <a class="nav-link" href="?mod=medicos"><i class="fas fa-user-md"></i> Medicos</a>
          </li>
          <li class="nav-item li-ocultar">
            <a class="nav-link" href="?mod=usuarios"><i class="fas fa-users"></i> Usuarios</a>
          </li>
          <li class="nav-item li-ocultar">
            <div class="dropdown">
                <a class="nav-link text-muted dropdown-toggle bg-dark" data-toggle="dropdown">
                  <i class="fas fa-book"></i> Exámenes
                </a>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="?mod=view_exa"> <i class="fas fa-search"></i> Buscar </a>
                  <a class="dropdown-item" href="?mod=add_exa"> <i class="fas fa-plus"></i> Nuevo </a>
                </div>
              </div>
          </li>

          <li class="nav-item li-ocultar">
            <div class="dropdown">
                <a class="nav-link text-muted dropdown-toggle bg-dark" data-toggle="dropdown">
                  <i class="fas fa-teeth-open"></i> Odontograma
                </a>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href=""> <i class="fas fa-search"></i> Ver </a>
                  <a class="dropdown-item" href="#"> <i class="fas fa-plus-square"></i> Registrar Datos </a>
                  <a class="dropdown-item" href="#"> <i class="fas fa-plus-circle"></i> Registrar Nuevo Paciente </a>
                </div>
              </div>
          </li>
        </ul>
        <div class="nav-item dropdown">
            <a class="nav-link text-light dropdown-toggle bg-dark text-" data-toggle="dropdown">
              <img src="resources/people-icon.png" alt="foto-perfil" id="foto-perfil"> Nombre de usuario
            </a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#"> <i class="fas fa-key"></i> Cambiar contraseña </a>
              <a class="dropdown-item" href="#"> <i class="fas fa-sign-out-alt"></i> Cerrar Sesión </a>
            </div>
          </div>

    </div>
    </nav>

  </div>
</div>
<div id="menu" class="clearfix">
  <button type="button" class="btn btn-primary float-right mt-3 mr-3" data-toggle="modal" data-target="#myModal">
    <i class="fas fa-bars"></i>
  </button>

  <!-- The Modal -->
  <div class="modal w3-animate-zoom clearfix" id="myModal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content" >

        <!-- Modal Header -->
        <div class="modal-header" >
          <h4 class="modal-title color-text-celurean">Menú - Sis Medic TBS</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">

          <div class="card card-menu w3-hover-sepia float-left mr-4" >
              <a class="mt-2 text-center text-menu" href="?mod=citas"><i class="fas fa-calendar-alt fa-5x"></i> <h6>Citas</h6></a>
          </div>

          <div class="card card-menu w3-hover-sepia float-left mr-4" >
              <a class="mt-2 text-center text-menu" href="?mod=pacientes"><i class="fas fa-male fa-5x"></i> <h6>Pacientes</h6></a>
          </div>

          <div class="card card-menu w3-hover-sepia float-left mr-4" >
              <a class="mt-2 text-center text-menu" href="?mod=medicos"><i class="fas fa-user-md fa-5x"></i> <h6>Medicos</h6></a>

          </div>

          <div class="card card-menu w3-hover-sepia float-left mr-4" >
              <a class="mt-2 text-center text-menu" href="?mod=usuarios"><i class="fas fa-users fa-5x"></i> <h6>Usuarios</h6></a>
          </div>

          <div class="card card-menu float-left mr-4" >
              <a class="mt-2 text-center text-menu w3-hover-sepia" href="#"><i class="fas fa-book fa-5x"></i> <h6>Exámenes</h6></a>
              <a href="?mod=view_exa"><div class="card-body"> <i class="fas fa-search"></i> Buscar</div></a>
              <a href="?mod=add_exa"><div class="card-body"><i class="fas fa-plus"></i> Nuevo</div></a>
          </div>

          <div class="card card-menu float-left mr-4" id="card-odontograma">
              <a class="mt-2 text-center text-menu w3-hover-sepia" href="#"><i class="fas fa-teeth-open fa-5x"></i> <h6>Odontograma</h6></a>
              <div class="card-body"> <i class="fas fa-search"></i> Ver</div>
              <div class="card-body"><i class="fas fa-plus-square"></i> Registrar Datos</div>
              <div class="card-body"><i class="fas fa-plus-circle"></i> Registrar Nuevo Paciente</div>
          </div>

        </div>

      </div>
    </div>
  </div>
</div>
