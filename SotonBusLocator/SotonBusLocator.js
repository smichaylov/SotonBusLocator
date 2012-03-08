Ext.regApplication({
    name: 'SotonBusLocator',
	defaultUrl: 'Home/index',
    launch: function()
    {
        this.viewport = new SotonBusLocator.views.Viewport();
		
		this.viewport.query('#searchBtn')[0].setHandler(function(){
			Ext.ControllerManager.get('Search').index();
		});
		
		var helpOverlay = new Ext.Toolbar({
            dock: 'top'
        });
        
        var overlay = new Ext.Panel({
            floating: true,
            modal: true,
            centered: false,
            width: Ext.is.Phone ? 260 : 400,
            height: Ext.is.Phone ? 220 : 400,
            styleHtmlContent: true,
            dockedItems: helpOverlay,
            scroll: 'vertical',
            contentEl: 'lipsum',
            cls: 'htmlcontent'
        });
        
        var showCenteredOverlay = function(btn, event) {
            overlay.setCentered(true);
            helpOverlay.setTitle('Help and Information');
            overlay.show();
        };
		
		this.viewport.query('#helpBtn')[0].setHandler(function(){
			showCenteredOverlay();
		});
		
		/*
		var map = new Ext.Map({
			mapOptions: {
				zoom: 5,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: new google.maps.LatLng(50.91001479538914, -1.4043831825256348),
			}
		});
		*/

		var image = new google.maps.MarkerImage(
			'../res/images/point.png',
			new google.maps.Size(32, 31),
			new google.maps.Point(0,0),
			new google.maps.Point(16, 31)
		);

		var shadow = new google.maps.MarkerImage(
			'../res/images/shadow.png',
			new google.maps.Size(64, 52),
			new google.maps.Point(0,0),
			new google.maps.Point(-5, 42)
		);
		
		var map = new Ext.Map({
            mapOptions : {
                zoom : 17,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                        style: google.maps.NavigationControlStyle.WALKING
                }
            },
			
			geo: geog = new Ext.util.GeoLocation({
      			autoUpdate:true,
      			allowHighAccuracy: false,
				listeners:{
					locationupdate: function(geo) {
						  center = new google.maps.LatLng(geo.latitude, geo.longitude);
					},
					locationerror: function(geo){
						alert('Geolocation Error');          
					}
				}	
    		}),
			
			useCurrentLocation: true,

            plugins : [
                new Ext.plugin.GMap.Tracker({
                        trackSuspended : false,
                        highAccuracy   : false,
                        marker : new google.maps.Marker({
                            position: new google.maps.LatLng(geog.latitude, geog.longitude),			
                            title : 'You are here',
                            //shadow: '../res/images/point.png',
                            //icon  : '../res/images/shadow.png'
                          })
                })
            ],
			
			listeners : {
			
                maprender : function(comp, map){
					
					var directionsService = new google.maps.DirectionsService();
					var directionsDisplay = new google.maps.DirectionsRenderer();
					directionsDisplay.setMap(map);
					var origin;
					var current;
					var markers = [];
					
					var query = 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>'+
								'PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>'+
								'SELECT ?label ?lat ?long WHERE {'+
									'GRAPH <http://id.southampton.ac.uk/dataset/bus-stops/latest> {'+
										'?Description rdfs:label ?label ;'+	
													  'geo:lat ?lat ;'+ 
													  'geo:long ?long .'+
									'}'+
								'}';

					var queryUrl = 'http://sparql.data.southampton.ac.uk/?query='+encodeURIComponent(query);
					queryUrl += "&output=json";	
					
					$.ajax({ 
					  dataType: "jsonp",
					  url: queryUrl,
					  success: function(data) {                
							var bindings = data.results.bindings;
							for (var i in bindings) {
								var busData = data.results.bindings[i];
								var label = busData["label"]["value"];
								var lat = busData["lat"]["value"];  
								var lon = busData["long"]["value"];
								
								var latlon = new google.maps.LatLng(lat,lon);
								marker = new google.maps.Marker({
									position:latlon,
									map:map,
									icon: 'http://labs.google.com/ridefinder/images/mm_20_blue.png',
									title:label
								});	
								
								markers.push(marker);
								
								google.maps.event.addListener(marker, 'click', function(event){															
									var request = {
										origin: new google.maps.LatLng(geog.latitude, geog.longitude),
										destination: event.latLng,
										travelMode: google.maps.DirectionsTravelMode.WALKING
									};
									directionsService.route(request, function(response, status) {
										if (status == google.maps.DirectionsStatus.OK) {
											directionsDisplay.setDirections(response);
										  }
									});
								});
							}                                  
						}
					});                      
                }
            }

        });

		panel = new Ext.Panel({
			fullscreen: true,
			layout: 'card',
			cardSwitchAnimation: 'slide',
			items: [map],
		});

		// Google Map -------------------------------------------------------------------------------------------------------------
		/*var position = new google.maps.LatLng(50.91001479538914, -1.4043831825256348), 

		image = new google.maps.MarkerImage(
			'../images/point.png',
			new google.maps.Size(32, 31),
			new google.maps.Point(0,0),
			new google.maps.Point(16, 31)
		),

		shadow = new google.maps.MarkerImage(
			'../images/shadow.png',
			new google.maps.Size(64, 52),
			new google.maps.Point(0,0),
			new google.maps.Point(-5, 42)
		),
		
		map = new Ext.Map({
            mapOptions : {
                zoom : 17,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                        style: google.maps.NavigationControlStyle.WALKING
                }
            },
			
			geo: geog = new Ext.util.GeoLocation({
      			autoUpdate:true,
      			allowHighAccuracy: false,
				listeners:{
					locationupdate: function(geo) {
						  center = new google.maps.LatLng(geo.latitude, geo.longitude);
					},
					locationerror: function(geo){
						alert('Geolocation Error');          
					}
				}	
    		}),
    		
			useCurrentLocation: true,

            plugins : [
                new Ext.plugin.GMap.Tracker({
                        trackSuspended : false,
                        highAccuracy   : false,
                        marker : new google.maps.Marker({
                            position: new google.maps.LatLng(geog.latitude, geog.longitude),			
                            title : 'You are here',
                            shadow: shadow,
                            icon  : image
                          })
                })
            ],
			
			listeners : {
			
                maprender : function(comp, map){
					
					var directionsService = new google.maps.DirectionsService();
					var directionsDisplay = new google.maps.DirectionsRenderer();
					directionsDisplay.setMap(map);
					var origin;
					var current;
					var markers = [];
					
					var query = 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>'+
								'PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>'+
								'SELECT ?label ?lat ?long WHERE {'+
									'GRAPH <http://id.southampton.ac.uk/dataset/bus-stops/latest> {'+
										'?Description rdfs:label ?label ;'+	
													  'geo:lat ?lat ;'+ 
													  'geo:long ?long .'+
									'}'+
								'}';

					var queryUrl = 'http://sparql.data.southampton.ac.uk/?query='+encodeURIComponent(query);
					queryUrl += "&output=json";	
					
					$.ajax({ 
					  dataType: "jsonp",
					  url: queryUrl,
					  success: function(data) {                
							var bindings = data.results.bindings;
							for (var i in bindings) {
								var busData = data.results.bindings[i];
								var label = busData["label"]["value"];
								var lat = busData["lat"]["value"];  
								var lon = busData["long"]["value"];
								
								var latlon = new google.maps.LatLng(lat,lon);
								marker = new google.maps.Marker({
									position:latlon,
									map:map,
									icon: 'http://labs.google.com/ridefinder/images/mm_20_blue.png',
									title:label
								});	
								
								markers.push(marker);
								
								google.maps.event.addListener(marker, 'click', function(event){															
									var request = {
										origin: new google.maps.LatLng(geog.latitude, geog.longitude),
										destination: event.latLng,
										travelMode: google.maps.DirectionsTravelMode.WALKING
									};
									directionsService.route(request, function(response, status) {
										if (status == google.maps.DirectionsStatus.OK) {
											directionsDisplay.setDirections(response);
										  }
									});
								});
							}                                  
						}
					});                      
                }
            }
		
        });
		*/
    }
});