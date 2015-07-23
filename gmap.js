    var map;
    var geocoder;
	var initialLocation;
	var tcnt = 0;
    var iconBlue = new GIcon(); 
    iconBlue.image = 'http://labs.google.com/ridefinder/images/mm_20_blue.png';
    iconBlue.shadow = 'http://labs.google.com/ridefinder/images/mm_20_shadow.png';
    iconBlue.iconSize = new GSize(12, 20);
    iconBlue.shadowSize = new GSize(22, 20);
    iconBlue.iconAnchor = new GPoint(6, 20);
    iconBlue.infoWindowAnchor = new GPoint(5, 1);

   var iconGreen = new GIcon(); 
    iconGreen.image = 'http://labs.google.com/ridefinder/images/mm_20_green.png';
    iconGreen.shadow = 'http://labs.google.com/ridefinder/images/mm_20_shadow.png';
    iconGreen.iconSize = new GSize(12, 20);
    iconGreen.shadowSize = new GSize(22, 20);
    iconGreen.iconAnchor = new GPoint(6, 20);
    iconGreen.infoWindowAnchor = new GPoint(5, 1);

     var iconBlack = new GIcon(); 
    iconBlack.image = 'http://labs.google.com/ridefinder/images/mm_20_black.png';
    iconBlack.shadow = 'http://labs.google.com/ridefinder/images/mm_20_shadow.png';
    iconBlack.iconSize = new GSize(12, 20);
    iconBlack.shadowSize = new GSize(22, 20);
    iconBlack.iconAnchor = new GPoint(6, 20);
    iconBlack.infoWindowAnchor = new GPoint(5, 1);

    var iconRed = new GIcon(); 
    iconRed.image = 'http://labs.google.com/ridefinder/images/mm_20_red.png';
    iconRed.shadow = 'http://labs.google.com/ridefinder/images/mm_20_shadow.png';
    iconRed.iconSize = new GSize(12, 20);
    iconRed.shadowSize = new GSize(22, 20);
    iconRed.iconAnchor = new GPoint(6, 20);
    iconRed.infoWindowAnchor = new GPoint(5, 1);
	
    var iconYellow = new GIcon(); 
    iconYellow.image = 'http://labs.google.com/ridefinder/images/mm_20_yellow.png';
    iconYellow.shadow = 'http://labs.google.com/ridefinder/images/mm_20_shadow.png';
    iconYellow.iconSize = new GSize(12, 20);
    iconYellow.shadowSize = new GSize(22, 20);
    iconYellow.iconAnchor = new GPoint(6, 20);
    iconYellow.infoWindowAnchor = new GPoint(5, 1);
	
    var iconBrown = new GIcon(); 
    iconBrown.image = 'http://labs.google.com/ridefinder/images/mm_20_brown.png';
    iconBrown.shadow = 'http://labs.google.com/ridefinder/images/mm_20_shadow.png';
    iconBrown.iconSize = new GSize(12, 20);
    iconBrown.shadowSize = new GSize(22, 20);
    iconBrown.iconAnchor = new GPoint(6, 20);
    iconBrown.infoWindowAnchor = new GPoint(5, 1);
	
    var customIcons = [];
    customIcons["restaurant"] = iconBlue;
    customIcons["bar"] = iconRed;
	customIcons["bg"] = iconGreen;
	customIcons["pub"] = iconBlack;
	customIcons["live"] = iconYellow;
	customIcons["dance"] = iconBrown;
	

    function load() {
      if (GBrowserIsCompatible()) {
        geocoder = new GClientGeocoder();
		//initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
     	chkMap();
        map = new GMap2(document.getElementById('map'));
        map.addControl(new GSmallMapControl());
        map.addControl(new GMapTypeControl());
		map.setCenter(initialLocation);
		//map.setCenter(new GLatLng(initialLocation.Kd, initialLocation.Ga));
		document.getElementById('addressInput').value = initialLocation.Kd + ', ' + initialLocation.Ga;
		alert(document.getElementById('addressInput').value);
        //map.setCenter(new GLatLng(40, -100), 4);
      }
    }

   function searchLocations() {
     var address = document.getElementById('addressInput').value;
	 alert(address);
	// var lat = document.getElementById('mylat').value;
	// var mlong = document.getElementById('mylong').value;
	 
     geocoder.getLatLng(address, function(latlng) {
       if (!latlng) {
         alert("address: " + address + ' not found');
       } else {
         searchLocationsNear(latlng);
       }
     });
   }

   function searchLocationsNear(center) {
     var radius = document.getElementById('radiusSelect').value;
	 var radiustype = document.getElementById('types').value;
     var searchUrl = 'genxml.php?lat=' + center.lat() + '&lng=' + center.lng() + '&radius=' + radius + "&type=" + radiustype;
	 
     GDownloadUrl(searchUrl, function(data) {
       var xml = GXml.parse(data);
       var markers = xml.documentElement.getElementsByTagName('marker');
       map.clearOverlays();
	   
       var sidebar = document.getElementById('sidebar');
       sidebar.innerHTML = '';
       if (markers.length == 0) {
         sidebar.innerHTML = 'No results found.';
         map.setCenter(new GLatLng(40, -100), 4);
         return;
       }

       var bounds = new GLatLngBounds();
       for (var i = 0; i < markers.length; i++) {
		 var lid = markers[i].getAttribute('id');
		 var phone = markers[i].getAttribute('phone');
         var name = markers[i].getAttribute('name');
		 var rats = markers[i].getAttribute('ratnum');
         var address = markers[i].getAttribute('address');
		 var type = markers[i].getAttribute('type');
		 var addy = markers[i].getAttribute('addy');
         var distance = parseFloat(markers[i].getAttribute('distance'));
         var point = new GLatLng(parseFloat(markers[i].getAttribute('lat')),
                                 parseFloat(markers[i].getAttribute('lng')));
         
         var marker = createMarker(point, name, address, addy, type, phone, lid, rats);
         map.addOverlay(marker);
         var sidebarEntry = createSidebarEntry(marker, name, address, addy, distance);
         sidebar.appendChild(sidebarEntry);
         bounds.extend(point);
       }
       map.setCenter(bounds.getCenter(), map.getBoundsZoomLevel(bounds));
     });
   }

    function createMarker(point, name, address, addy, type, phone, lid, rats) {
      var marker = new GMarker(point, customIcons[type]);
	  var address1 = document.getElementById('addressInput').value;
	  if (rats == 0){
		    var rates = "be the first to write a review";
	  }else{
			var rates = rats + " reviews."  
	  }
      var html = "<a href='index.php?page=19&id=" + lid + "' style='color:Blue'>details - " + rates + "</a><br/><font color='#000000'<b>" + name + "</b><br/>" + address + "<br/>" + addy + "<br/>" + phone + "<br/><br/></font><a href='http://maps.google.com/maps?saddr=" + address1 + "&daddr=" + address + ' ' + addy + "' target='_blank' style='color:Blue'>directions</a><br/><a href='index.php?s=men&id=" + lid + "' style='color:Blue'>menu</a>";
      GEvent.addListener(marker, 'click', function() {
        marker.openInfoWindowHtml(html);
      });
      return marker;
    }

    function createSidebarEntry(marker, name, address, addy, distance) {
      var div = document.createElement('div');
      var html = '<font color="white"><b>' + name + '</b> (' + distance.toFixed(1) + ')<br/>' + address + '<br/>' + addy + '</font>';
      div.innerHTML = html;
      div.style.cursor = 'pointer';
      div.style.marginBottom = '5px'; 
      GEvent.addDomListener(div, 'click', function() {
        GEvent.trigger(marker, 'click');
      });
      GEvent.addDomListener(div, 'mouseover', function() {
        div.style.backgroundColor = '#4A4344';
      });
      GEvent.addDomListener(div, 'mouseout', function() {
        div.style.backgroundColor = '';
      });
      return div;
    }
	function tst(){
		navigator.geolocation.getCurrentPosition(function(position){
			initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			return;
		}, function(){
			handleNoGeolocation(browserSupportFlag);
		});
	}
	function chkMap(id,typ){
		tcnt = 0;
		initialLocation = '';
	  if(navigator.geolocation) {
		browserSupportFlag = true;
		navigator.geolocation.watchPosition(function(position){
			initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			if(tcnt==0 && initialLocation!=''){
				sendData(id,initialLocation,typ);
				window.location.href=window.location.href;
			}
			tcnt = tcnt + 1;
		}, function() {
			handleNoGeolocation(browserSupportFlag);
		});
	  } else if (google.gears) {
		browserSupportFlag = true;
		var geo = google.gears.factory.create('beta.geolocation');
		geo.getCurrentPosition(function(position){
			initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
			alert("Skips to geo");
		}, function() {
		  handleNoGeoLocation(browserSupportFlag);
		});
		alert("error");
	  } else {
		browserSupportFlag = false;
		alert("Not going to work");
		handleNoGeolocation(browserSupportFlag);
	  }
	  function handleNoGeolocation(errorFlag) {
		  alert("reached here");
		if (errorFlag == true) {
		  alert("Geolocation service failed.");
		} else {
		  alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
		}
	  }
	}
	function sendData(id,local,typ){
		var xmlhttp = getXMLHttp();
		xmlhttp.onreadystatechange=function(){
			if(xmlhttp.readyState==4){
				document.getElementById("cont").innerHTML=xmlhttp.responseText;
			}
		}
		lyn = "HiddenFunctions.php?type=drop&latlng="+local+"&id="+id+"&typ="+typ;
		xmlhttp.open("GET",lyn,true);
		xmlhttp.send();
	}
	function getXMLHttp(){
	  var xmlHttp
	  try{
		//Firefox, Opera 8.0+, Safari
		xmlHttp = new XMLHttpRequest();
	  }
	  catch(e){
		//Internet Explorer
		try{
		  xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch(e){
		  try{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		  }
		  catch(e){
			alert("Your browser does not support AJAX!")
			return false;
		  }
		}
	  }
	  return xmlHttp;
	}