//$(window).bind("resize", function(){
//    var orientation = window.orientation;
//    var new_orientation = (orientation) ? 0 : 180 + orientation;
//    $('body').css({
//        "-webkit-transform": "rotate(" + new_orientation + "deg)"
//    });
//});

var gResults=[];
function createListView()
{
	$('#result-listview').empty();
	$.each(gResults,function(index,result){
		// console.log(result);

  	  $('#result-listview').append(
  	  	'<li >'  +'<a href=""  onclick="changePage(id_' + index + ');"> ' +   result.name + '</a>' + '</li>'
  	  	);
  	    /*
	 * Here we are dynamically creating a new page. When a list item is clicked,
	 * this is what is actually shown. Do not forget to append this block of
	 * code to the body tag. If appended mistakenly somewhere else, the code
	 * wont work.
	 */
    content = 	'<div data-role="page" id="id_' + index + '" data-url="id_' + index + '">' +
					'<div data-role="header">' +
					'<a href="#" data-rel="back" data-icon="back">Back</a>' +
					  '<h1>' + result.name + '</h1>' + 
					'</div>' +
					'<div data-role="content">' +
					  '<p>' +
					    '<div data-role="fieldcontain" class="result">' 
					     +'Add :'+result.formatted_address + '<br/>'
					     +'Tel :'+result.formatted_phone_number + '<br/>'
					     +'Rating :' + result.rating+
					    '</div>' +
					  '</p>' +
					'</div>' +
			    '</div>';

  	$('body').append(content).trigger('create');  
  	  /* Tell JQM to enhance the page with the required classes. */
  	$(index).page();
  	});
$('#result-listview').listview('refresh');
  

}

function changePage(id) {
		$.mobile.changePage($(id), {transition : "slide"});
}

var mapdata = { destination: new google.maps.LatLng(59.3327881, 18.064488100000062) };
// Create the map then make 'displayDirections' request
$('#findpubsPage').live("pageinit", function() {
    $('#map_canvas').gmap({'center' : mapdata.destination, 
        'mapTypeControl' : true, 
        'navigationControl' : true,
        'navigationControlOptions' : {'position':google.maps.ControlPosition.LEFT_TOP}
        })
    .bind('init', function() {
        $('#refresh').trigger("click");        
    });
});	

// Request display of directions, requires jquery.ui.map.services.js
var toggleval = false; // used for test case: static locations
var devicePosition = {};
var onSuccess = function(position) {
						devicePosition = { coords: { latitude: position.coords.latitude, longitude: position.coords.longitude } };
						map = new google.maps.Map(document.getElementById('map_canvas'), {
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude ),
						zoom: 15
					  });
					  infoWindow = new google.maps.InfoWindow();
					  service = new google.maps.places.PlacesService(map);
					  google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
					};
					
var onError = function(error){ 
						 alert('code: '    + error.code    + '\n' +
	  'message: ' + error.message + '\n');
						$.mobile.changePage($('#homePage'), {}); 
					};

var geoLocationOpt = { maximumAge: 80000, timeout: 60000, enableHighAccuracy: true } ;

$('#refresh').live("click", function() {
   // START: Tracking location with device geolocation
   if(navigator.geolocation)
   {
	navigator.geolocation.getCurrentPosition (onSuccess,onError,geoLocationOpt);            
   }
   else
   {
	 //$('#lnkDialog').click();
   }
   
	return false;
});


function performSearch() {
  var request = {
	bounds: map.getBounds(),
	keyword:  'restaurant',
	radius:'8000'
  };
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status != google.maps.places.PlacesServiceStatus.OK) {
	switch(status)
	{
		case google.maps.places.PlacesServiceStatus.ZERO_RESULTS :
			navigator.notification.alert('No places found');
			return;
		default : 
			alert(status);
			// navigator.notification.alert('Something seems wrong with google
			// maps');
			return;
	}
	
  }
  /* Processing the recieved result set */
  for (var i = 0, result; result = results[i]; i++) {
	var marker = new google.maps.Marker({
	  map: map,
	  position: result.geometry.location
	}).setClickable(true);

	var detailRequest = {
		reference : result.reference
	}
	service.getDetails(detailRequest,detailsCallback);
  }
}

function detailsCallback(place,status){
	if (status == google.maps.places.PlacesServiceStatus.OK) {
    	gResults.push(place);
  	}
}

function fadingMsg (locMsg) {
	$("<div class='ui-overlay-shadow ui-body-e ui-corner-all fading-msg'>" + locMsg + "</div>")
	.css({ "display": "block", "opacity": 0.9, "top": $(window).scrollTop() + 100 })
	.appendTo( $.mobile.pageContainer )
	.delay( 2200 )
	.fadeOut( 1000, function(){
		$(this).remove();
   });
}

// refresh the map
$('#findpubsPage').live("pageshow", function() {
	$('#map_canvas').gmap('refresh');
});



