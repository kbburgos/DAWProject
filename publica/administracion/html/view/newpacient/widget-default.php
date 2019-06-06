<div class="container">
	<div class="row">
		<h1>Nuevo Paciente</h1>
	</div>
	<div class="row">
		<div class="col-sm-12">
			<form method="post" action="#">
		  <div class="form-group">
		    <label for="inputEmail1" class="col-lg-2 control-label">Nombre*</label>
		    <div class="col-md-12">
		      <input type="text" name="name" class="form-control" id="name" placeholder="Nombre" required>
		    </div>
		  </div>
		  <div class="form-group">
		    <label for="inputEmail1" class="col-lg-2 control-label">Apellido*</label>
		    <div class="col-md-12">
		      <input type="text" name="lastname" required class="form-control" id="lastname" placeholder="Apellido" required>
		    </div>
		  </div>
		  <div class="form-group">
		    <label for="inputEmail1" class="col-lg-2 control-label">CI*</label>
		    <div class="col-md-12">
		      <input type="text" name="ci" required class="form-control" id="ci" placeholder="C.I." required>
		    </div>
		  </div>
		  <div class="form-group">
		    <label for="inputEmail1" class="col-lg-2 control-label">Dirección*</label>
		    <div class="col-md-12">
		      <input type="text" name="address" class="form-control"  id="address1" placeholder="Dirección" required>
		    </div>
		  </div>
		  <div class="form-group">
		    <label for="inputEmail1" class="col-lg-2 control-label">Email*</label>
		    <div class="col-md-12">
		      <input type="email" name="email" class="form-control" id="email1" placeholder="Email" required>
		    </div>
		  </div>

		  <div class="form-group">
		    <label for="inputEmail1" class="col-lg-2 control-label">Teléfono*</label>
		    <div class="col-md-12">
		      <input required type="number" name="phone" class="form-control" id="phone1" placeholder="Teléfono">
		    </div>
		  </div>
		  <p class="alert alert-info">* Campos obligatorios</p>
		  <div class="form-group">
		    <div class="col-lg-offset-2 col-lg-10">
		      <button type="submit" class="btn btn-primary">Agregar Paciente</button>
		    </div>
		  </div>
		</form>
		</div>
	</div>
</div>
