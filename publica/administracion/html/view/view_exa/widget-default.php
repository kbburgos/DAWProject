<div class="row ml-1 mr-1">
	<div class="col-sm-12">
		<center><h1 id="datos">Histórico de exámenes del paciente</h1></center>
	</div>
	<div class="col-sm-12">
		<center>
			<form method="post" class="form-horizontal">
			<input type="text" name="cedula" placeholder="CI......" required class="form-control"><br>
				<input type="submit" value="Buscar" class="btn btn-primary">
			</form><br>
		</center>
	</div>
	<div class="table-responsive">
		<center>
			<table class="table table-bordered table-hover text-center">
				<thead>
					<tr>
						<th> Id </th>
						<th> CI </th>
						<th> Nombre</th>
						<th> Fecha </th>
						<th> Tipo de examen </th>
						<th> Imagen </th>
						<th colspan="3"> Operaciones  </th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td> </td>
						<td> </td>
						<td> </td>
						<td> </td>
						<td> </td>
						<td> <img height="70" src="" /> </td>
						<th><a class="btn btn-warning btn-xs" href=""> Modificar </a> </th>
						<th><a class="btn btn-danger btn-xs" href=""> Eliminar </a> </th>
						<th><a target="_blank" class="btn btn-success btn-xs" href=""> Ver </a> </th>
					</tr>
				</tbody>
			</table>
		</center>
	</div>
</div>
