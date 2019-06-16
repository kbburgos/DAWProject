
//NAMESPACE-->google.maps...
	var divMapa=document.getElementById('mapa');
	navigator.geolocation.getCurrentPosition(fn_ok,fn_error);
	function fn_error() {
		// body...
	}
	function fn_ok(respuesta){
		var lat=respuesta.coords.latitude;
		var lon=respuesta.coords.longitude;

		var gLatLon=new google.maps.LatLng(lat,lon);
		var objConfig={
			zoom:17,
			center: gLatLon
		}

		
		var gMapa=new google.maps.Map(divMapa,objConfig); //A donde se va a renderizar, Una configuración de ese mapa
		

		var objConfigMarker={
			position:gLatLon,
			animation: google.maps.Animation.DROP,
			map:gMapa,
			draggable:true,
			title:"Usted está aquí"
		}

		var gMarker= new google.maps.Marker(objConfigMarker);
		gMarker.setIcon('../resources/img/person.png');

		
		var lat2='-2.180865';
		var lon2='-79.898463';

		var gLatLon2=new google.maps.LatLng(lat2,lon2);


		var config={				
			position: gLatLon2,
			map: gMapa,
			animation:google.maps.Animation.DROP,
			title: 'Facultad de Odontología'
			}

		var gMarkerDV= new google.maps.Marker(config);
		
		var objHTML={    
				content:'<div style="height: 80px; width: 240px"><h2>Facultad de Odontología</h2><p>El mejor lugar para tratar tu dientes.</p></div>'
			}

			var gInfW = new google.maps.InfoWindow(objHTML);
			google.maps.event.addListener(gMarkerDV,'click',function(){
				gInfW.open(gMapa,gMarkerDV);
			});

		var objHTML={    
				content:'<div style="height: 50px; width: 160px"><h2>¡Usted está aquí!</h2></div>'
			}

			var gInfW2 = new google.maps.InfoWindow(objHTML);
			google.maps.event.addListener(gMarker,'click',function(){
				gInfW2.open(gMapa,gMarker);
			});


			var objConfigDR = {
				map: gMapa,
				suppressMarkers:true
			}

			var objConfigDS={
				origin: gLatLon,
				destination: gLatLon2,
				travelMode:google.maps.TravelMode.DRIVING 
			}

			var ds = new google.maps.DirectionsService();
			var dr = new google.maps.DirectionsRenderer(objConfigDR);

			ds.route(objConfigDS,fnRutear);

			function fnRutear(resultados,status){
				if(status=='OK'){
					dr.setDirections(resultados);
				}else{
					alert('Error'+status);
				}
			}

		/*			
		var gCoder=new google.maps.Geocoder();
		var objInformacion={
			address:'Av. Kennedy 401, Guayaquil 090512, Ecuador'
		}
		gCoder.geocode(objInformacion ,fn_coder);

		function fn_coder(datos){
			var coordenadas='-2.180865, -79.898463'; // obj latLon
			var config={
				map: gMapa,
				position: coordenadas,
				title: 'Facultad de Odontología'
			}
			var gMarkerDV = new google.maps.Marker(config);
			gMarkerDV.setIcon('person.png');

			var objHTML={    
				content:'<div style="height: 150px; width: 300px"><h2>Facultad de Odontología</h2><p>Información</p></div>'
			}
			
			var gInfW = new google.maps.InfoWindow(objHTML);
			google.maps.event.addListener(gMarkerDV,'click',function(){
				gInfW.open(gMapaDV,gMarker);
			});

		}//fn_coder
		*/

	}
