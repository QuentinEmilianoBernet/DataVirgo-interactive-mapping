$(function () {
            $("#map").tooltip({
              track: true,
            });
            $("#map").mouseover(function () {
              $("#map").tooltip("disable");
            });
          });
          
            var map = L.map('map', {
            zoom: 5,
            center : [46.9111446396763,5.453353955768824],
    
            timeDimension: true,
            timeDimensionOptions: {
                times: "1330-01-01/1550-01-01/P1Y"
            },
                timeDimensionControl: true,
                timeDimensionControlOptions: {
                    title: "Time",
                    timeSliderDragUpdate: true,
                    loopButton: true,
                    minSpeed: 5,
                    maxSpeed: 10,
                    autoPlay: true,
                    timeZones: ["Local", "UTC"]
                
            },
            playerOptions: {
            loop: true,
            startOver: true,
            }
        });

            L.tileLayer(
                    "https://api.mapbox.com/styles/v1/quentinbernet/ckzdh81ub002214l8qpbem9li/tiles/256/{z}/{x}/{y}?access_token=sk.eyJ1IjoicXVlbnRpbmJlcm5ldCIsImEiOiJja3luMmZvOG4xNnlnMm51Zmhua3owbG54In0.Qt7_5fjL0iPgLXYboLzrGA",
                    {"attribution": "Quentin Bernet, 2022."}
                ).addTo(map);
                
                L.control.scale().addTo(map)
                
                // Create additional Control placeholders
                function addControlPlaceholders(map) {
                    var corners = map._controlCorners,
                        l = 'leaflet-',
                        container = map._controlContainer;

                    function createCorner(vSide, hSide) {
                        var className = l + vSide + ' ' + l + hSide;

                        corners[vSide + hSide] = L.DomUtil.create('div', className, container);
                    }

                    createCorner('verticalcenter', 'right');
                }
                addControlPlaceholders(map);

// Change the position of the Zoom Control to a newly created placeholder.
map.zoomControl.setPosition('verticalcenterright');
                
            var myIcon = L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/787/787450.png',
                iconSize: [15, 16],
                iconAnchor: [7, 16]
            });
            
            var blur1 = L.icon({
                iconUrl: 'https://datavirgo.huma-num.fr/js/blue-dot.png',
                iconSize: [50, 40],
                iconAnchor: [25, 20]
            });
            
            var blur2 = L.icon({
                iconUrl: 'https://datavirgo.huma-num.fr/js/blue-dot.png',
                iconSize: [120, 96],
                iconAnchor: [60, 48]
            });
            
            var blur3 = L.icon({
                iconUrl: 'https://datavirgo.huma-num.fr/js/blue-dot.png',
                iconSize: [150, 120],
                iconAnchor: [75, 60]
            });
            
            var blur4 = L.icon({
                iconUrl: 'https://datavirgo.huma-num.fr/js/blue-dot.png',
                iconSize: [180, 144],
                iconAnchor: [90, 72]
            });

        var searchLayer = new L.LayerGroup().addTo(map);	//layer contain searched elements
        var sliderLayer = new L.LayerGroup().addTo(map);	//layer contain slider elements

        var polyLayer = new L.LayerGroup().addTo(map);
        
        var legend = L.control({ position: "bottomright" });
        
        var oms = new OverlappingMarkerSpiderfier(map);


        legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend");
            div.innerHTML += "<h4>Diffusion de la Vierge d'Humilité en Europe</h4>";
            div.innerHTML += '<i id="i1" style="background: #000000"></i><span>Occurrence localisée</span><br>';
            div.innerHTML += '<i style=" background: #3522e0"></i><span>Occurrence estimée et aire de diffusion</span><br>';
            div.innerHTML += '<i id="i3" style="background: palegoldenrod"></i><span>Filiations connues ou supposées</span><br>';




          return div;
        };

        legend.addTo(map);

        
        var Vierge_allaitante = new L.LayerGroup();
            Vierge_de_l_Apocalypse = new L.LayerGroup();
            Vierge_et_Dieu = new L.LayerGroup();
            Vierge_et_anges = new L.LayerGroup();
            Vierge_au_parapet = new L.LayerGroup();
            Vierge_dévoilée = new L.LayerGroup();
            Vierge_couronnée = new L.LayerGroup();
            Vierge_intérieure = new L.LayerGroup();
            Vierge_extérieure = new L.LayerGroup();
            Vierge_droite = new L.LayerGroup();
            Vierge_gauche = new L.LayerGroup();
            Vierge_face = new L.LayerGroup();
            Vierge_au_coussin = new L.LayerGroup();
            SainteFamille = new L.LayerGroup();
            StAnneTrinitaire = new L.LayerGroup();
            HortusClausus = new L.LayerGroup();
        
        styleHighLight = {
        radius: 1,
        fillColor: "mediumblue",
        fillOpacity: 0.5,
        color: "darkslateblue",
        weight: 2,
        opacity: 1
        }
        
        resetStyle = {
        color: "none",
        weight: 0,
        opacity: 0
            }

        
        
         ////////////populate map with markers from sample data
        for(i in data) {
            var title = data[i].title,	//value searched
                loc = data[i].loc,		//position found
                label = data[i].label,
                degré = data[i].degré
                allaitante = data[i].allaitante
                Apocalypse = data[i].Apocalypse
                parapet = data[i].parapet
                Dieu = data[i].Dieu
                Anges = data[i].Anges
                Voile = data[i].Voile
                Coussin = data[i].Coussin
                Couronne = data[i].Couronne
                Direction = data[i].Direction
                Localisation = data[i].Localisation
                date_deb = data[i].date_deb
                date_fin = data[i].date_fin
                start = Date.parse(data[i].start)
                end = Date.parse(data[i].end)
                Saints = data[i].Saints
                Index = data[i].Id
                Origin = data[i].Origin
                img = data[i].img
                imgg = data[i].img
                Filiations = data[i].Filiations
                
                
            var CustomIcon = L.icon({
                iconUrl: 'http://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Location_dot_blue.svg/1024px-Location_dot_blue.svg.png',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });

            var polyline = "poly"


        if (loc==[0.0,0.0]) {
                data.splice(i, 1)};
                
        if (degré<2) {
            
            var circle = new L.marker (new L.latLng(loc), {
                            title:title, opacity: 0.3, icon: blur1, icon2: blur1,
                            properties:{date_deb:date_deb, date_fin:date_fin, start:start, end:end, label:label, img:img, Index:Index, Origin:Origin, loc:loc}});
            var marker = new L.marker (new L.latLng(loc), {title:title, opacity: 0.9, icon: myIcon, properties:{date_deb:date_deb, date_fin:date_fin, start:start, end:end, label:label, Index:Index, Origin:Origin, loc:loc}});
                        searchLayer.addLayer(marker);
                        sliderLayer.addLayer(marker);

                marker.bindPopup(img+"</br>"+label+"</br>")
              circle.bindPopup(img+"</br>"+label+"</br>")

                        searchLayer.addLayer(circle);
                        sliderLayer.addLayer(circle);
                        oms.addMarker(circle);
                        
            
            if (Origin != "nan" || Filiations!= "Aucune") {   
                    circle.bindPopup(img+"</br>"+label+"</br>"+"</br>"+`<button class="suggestion" onclick="sliderLayer.eachLayer(function (layer) {if (layer.options.properties.Index=='${Origin}') {layer.addTo(map);layer.openPopup();} else if (layer.options.properties.Origin=='${Index}' && '${Origin}' == 'nan') {layer.addTo(map);layer.openPopup();} else if (layer.options.properties.Origin=='${Index}' && '${Origin}' == 'nan' && layer.options.properties.Filiations == 'Aucune') {layer.addTo(map);layer.openPopup();}})" onmouseover="sliderLayer.eachLayer(function (layer) {if (layer.options.properties.Index=='${Origin}' || layer.options.properties.Origin=='${Index}') {var lieu2 = layer.options.properties.loc; L.circleMarker(latlng= new L.latLng(lieu2), {radius:3, stroke:0.1, opacity:0.1, color:'blue', fill:false, fillColor:'none'}).addTo(polyLayer);}})" onmouseout="polyLayer.clearLayers();">`+" Voir aussi </button>");
                }

            if (Origin != "nan" || Filiations!= "Aucune") {      
                    marker.bindPopup(img+"</br>"+label+"</br>"+"</br>"+`<button class="suggestion" onclick="sliderLayer.eachLayer(function (layer) {if (layer.options.properties.Index=='${Origin}') {layer.addTo(map);layer.openPopup();} else if (layer.options.properties.Origin=='${Index}' && '${Origin}' == 'nan') {layer.addTo(map);layer.openPopup();} else if (layer.options.properties.Origin=='${Index}' && '${Origin}' == 'nan' && layer.options.properties.Filiations == 'Aucune') {layer.addTo(map);layer.openPopup();}})" onmouseover="sliderLayer.eachLayer(function (layer) {if (layer.options.properties.Index=='${Origin}' || layer.options.properties.Origin=='${Index}') {var lieu2 = layer.options.properties.loc; L.circleMarker(latlng= new L.latLng(lieu2), {radius:3, stroke:0.1, opacity:0.1, color:'blue', fill:false, fillColor:'none'}).addTo(polyLayer);}})" onmouseout="polyLayer.clearLayers();">`+" Voir aussi </button>");
                }
                        
                        marker.on('click', function (e) {
                        this.openPopup();
                    });
                        marker.on('dblclick', function (e) {
                        this.closePopup();
                    });
                    
                        circle.on('click', function (e) {
                        this.openPopup();
                    });
                        circle.on('dblclick', function (e) {
                        this.closePopup();
                    });

                    marker.on('mouseover', function (e) {
                        console.log(e);
                    sliderLayer.eachLayer(function (layer) {
                        var lieu1 = e.target.options.properties.loc;
                        if (layer.options.properties.Index==e.target.options.properties.Origin || layer.options.properties.Origin==e.target.options.properties.Index) {
                        var lieu2 = layer.options.properties.loc;
                        console.log(lieu1);
                        console.log(lieu2);
                        var endroits = [lieu1,lieu2];
                        L.polyline(endroits, {color: 'palegoldenrod'}).addTo(polyLayer);
                        L.circleMarker(latlng= new L.latLng(lieu2), {radius:5, stroke:1, opacity:0.1, color:'none', fill:true, fillColor:'blue'}).addTo(polyLayer);
                        }

                    ;})
                });
                
                marker.on('mouseout', function (e) {
                    polyLayer.clearLayers();
                });

                    
                    circle.on('mouseover', function (e) {
                        console.log(e);
                    sliderLayer.eachLayer(function (layer) {
                        if (layer.options.properties.Index==e.target.options.properties.Origin || layer.options.properties.Origin==e.target.options.properties.Index) {
                        var lieu1 = e.target.options.properties.loc;
                        var lieu2 = layer.options.properties.loc;
                        console.log(lieu1);
                        console.log(lieu2);
                        var endroits = [lieu1,lieu2];
                        L.polyline(endroits, {color: 'palegoldenrod'}).addTo(polyLayer);
                        L.circleMarker(latlng= new L.latLng(lieu2), {radius:5, stroke:1, opacity:0.1, color:'none', fill:true, fillColor:'blue'}).addTo(polyLayer);
                        }

                    ;})
                })
                
                circle.on('mouseout', function (e) {
                    polyLayer.clearLayers();
                    console.clear();});

                        
                        var iconn = "blur"+String(degré)
                         
                        var popup = new L.Popup({closeButton: false, offset: new L.Point(2, -2)});
                        
                        oms.addListener('dblclick', function(marker) {
                            popup.setContent(marker.desc);
                            popup.setLatLng(marker.getLatLng());
                            map.openPopup(popup);
                            });
                    

                            oms.addListener('spiderfy', function(markers) {
                            for (var i = 0, len = markers.length; i < len; i ++) markers[i].setIcon(CustomIcon);
                            map.closePopup();
                            });
                            oms.addListener('unspiderfy', function(markers) {
                            for (var i = 0, len = markers.length; i < len; i ++) markers[i].setIcon(markers[i].options.icon2);
                            });

                    if (Localisation=='Ext'&&Saints=='False'&&parapet=='True'&&date_fin>1400)
                            {HortusClausus.addLayer(circle)};

                
                    if (Localisation=='Ext'&&Saints=='False'&&parapet=='True'&&date_fin>1400)
                            {HortusClausus.addLayer(marker)};
                        
                    switch (allaitante) {
                        case 'True':
                            Vierge_allaitante.addLayer(circle);
                            Vierge_allaitante.addLayer(marker);
                            break;
                };
                    switch (Apocalypse) {
                        case 'True':
                            Vierge_de_l_Apocalypse.addLayer(circle);
                            Vierge_de_l_Apocalypse.addLayer(marker);
                            break;
                };
                    switch (parapet) {
                        case 'True':
                            Vierge_au_parapet.addLayer(circle);
                            Vierge_au_parapet.addLayer(marker);
                            break;
                };
                    switch (Dieu) {
                        case 'True':
                            Vierge_et_Dieu.addLayer(circle);
                            Vierge_et_Dieu.addLayer(marker);
                            break;
                };
                    switch (Anges) {
                        case 'True':
                            Vierge_et_anges.addLayer(circle);
                            Vierge_et_anges.addLayer(marker);
                            break;
                };
                    switch (Voile) {
                        case 'False':
                            Vierge_dévoilée.addLayer(circle);
                            Vierge_dévoilée.addLayer(marker);
                            break;
                };
                    switch (Couronne) {
                        case 'True':
                            Vierge_couronnée.addLayer(circle);
                            Vierge_couronnée.addLayer(marker);
                            break;
                };
                    switch (Coussin) {
                        case 'True':
                            Vierge_au_coussin.addLayer(circle);
                            Vierge_au_coussin.addLayer(marker);
                            break;
                };
                    switch (Localisation) {
                        case 'Ext':
                            Vierge_extérieure.addLayer(circle);
                            Vierge_extérieure.addLayer(marker);
                            break;
                        case 'Int':
                            Vierge_intérieure.addLayer(circle);
                            Vierge_intérieure.addLayer(marker);
                            break;
                };
                    switch (Direction) {
                        case 'Gauche':
                            Vierge_gauche.addLayer(circle);
                            Vierge_gauche.addLayer(marker);
                            break;
                        case 'Droite':
                            Vierge_droite.addLayer(circle);
                            Vierge_droite.addLayer(marker);
                            break;
                        case 'Face':
                            Vierge_face.addLayer(circle);
                            Vierge_face.addLayer(marker);
                            break;
                };
                switch (Saints) {
                    case 'Joseph':
                        SainteFamille.addLayer(marker);
                        SainteFamille.addLayer(circle);
                        break;
                    case 'Anne':
                        StAnneTrinitaire.addLayer(marker);
                        StAnneTrinitaire.addLayer(circle);
                        break;
            };}
                 else if (degré <3) {
                    var circle2 = new L.marker (new L.latLng(loc), {
                        title:title, opacity: 0.2, icon: blur2, icon2: blur2,
                        properties:{date_deb:date_deb, date_fin:date_fin, start:start, end:end, label:label, img:img, Index:Index, Origin:Origin, loc:loc}});

                        circle2.bindPopup(img+"</br>"+label);

                        searchLayer.addLayer(circle2);
                        sliderLayer.addLayer(circle2);
                        oms.addMarker(circle2);

                    
                        if (Origin != "nan" || Filiations!= "Aucune") {
                        circle2.bindPopup(img+"</br>"+label+"</br>"+"</br>"+`<button class="suggestion" onclick="sliderLayer.eachLayer(function (layer) {if (layer.options.properties.Index=='${Origin}') {layer.addTo(map);layer.openPopup();} else if (layer.options.properties.Origin=='${Index}' && '${Origin}' == 'nan') {layer.addTo(map);layer.openPopup();} else if (layer.options.properties.Origin=='${Index}' && '${Origin}' == 'nan' && layer.options.properties.Filiations == 'Aucune') {layer.addTo(map);layer.openPopup();}})" onmouseover="sliderLayer.eachLayer(function (layer) {if (layer.options.properties.Index=='${Origin}' || layer.options.properties.Origin=='${Index}') {var lieu2 = layer.options.properties.loc; L.circleMarker(latlng= new L.latLng(lieu2), {radius:3, stroke:0.1, opacity:0.1, color:'blue', fill:false, fillColor:'none'}).addTo(polyLayer);}})" onmouseout="polyLayer.clearLayers();">`+" Voir aussi </button>");
                    };

                        circle2.on('click', function (e) {
                        this.openPopup();
                    });
                        circle2.on('dblclick', function (e) {
                        this.closePopup();
                    });

                    

                    circle2.on('mouseover', function (e) {
                        console.log(e);
                    sliderLayer.eachLayer(function (layer) {
                        if (layer.options.properties.Index==e.target.options.properties.Origin || layer.options.properties.Origin==e.target.options.properties.Index) {
                        var lieu1 = e.target.options.properties.loc;
                        var lieu2 = layer.options.properties.loc;
                        console.log(lieu1);
                        console.log(lieu2);
                        var endroits = [lieu1,lieu2];
                        L.polyline(endroits, {color: 'palegoldenrod'}).addTo(polyLayer);
                        L.circleMarker(latlng= new L.latLng(lieu2), {radius:5, stroke:1, opacity:0.1, color:'none', fill:true, fillColor:'blue'}).addTo(polyLayer);
                        }

                    ;})
                })
                
                circle2.on('mouseout', function (e) {
                    polyLayer.clearLayers();
                    console.clear();});


                         
                        var popup = new L.Popup({closeButton: false, offset: new L.Point(0.8, -2)});
                        
                        oms.addListener('dblclick', function(marker) {
                            popup.setContent(marker.desc);
                            popup.setLatLng(marker.getLatLng());
                            map.openPopup(popup);
                            });
                        
                        
                    

                            oms.addListener('spiderfy', function(markers) {
                            for (var i = 0, len = markers.length; i < len; i ++) markers[i].setIcon(CustomIcon);
                            map.closePopup();
                            });
                            oms.addListener('unspiderfy', function(markers) {
                            for (var i = 0, len = markers.length; i < len; i ++) markers[i].setIcon(markers[i].options.icon2);
                            });

                              // for debugging/exploratory use in console
                            window.map = map;
                            window.oms = oms;

                    if (Localisation=='Ext'&&Saints=='False'&&parapet=='True'&&date_fin>1400)
                            {HortusClausus.addLayer(circle2)};
                        
                    switch (allaitante) {
                        case 'True':
                            Vierge_allaitante.addLayer(circle2);
                            break;
                };
                    switch (Apocalypse) {
                        case 'True':
                            Vierge_de_l_Apocalypse.addLayer(circle2);
                            break;
                };
                    switch (parapet) {
                        case 'True':
                            Vierge_au_parapet.addLayer(circle2);
                            break;
                };
                    switch (Dieu) {
                        case 'True':
                            Vierge_et_Dieu.addLayer(circle2);
                            break;
                };
                    switch (Anges) {
                        case 'True':
                            Vierge_et_anges.addLayer(circle2);
                            break;
                };
                    switch (Voile) {
                        case 'False':
                            Vierge_dévoilée.addLayer(circle2);
                            break;
                };
                    switch (Couronne) {
                        case 'True':
                            Vierge_couronnée.addLayer(circle2);
                            break;
                };
                    switch (Coussin) {
                        case 'True':
                            Vierge_au_coussin.addLayer(circle2);
                            break;
                };
                    switch (Localisation) {
                        case 'Ext':
                            Vierge_extérieure.addLayer(circle2);
                            break;
                        case 'Int':
                            Vierge_intérieure.addLayer(circle2);
                            break;
                        default:
                        var hihi = "hihi";
                };
                    switch (Direction) {
                        case 'Gauche':
                            Vierge_gauche.addLayer(circle2);
                            break;
                        case 'Droite':
                            Vierge_droite.addLayer(circle2);
                            break;
                        case 'Face':
                            Vierge_face.addLayer(circle2);
                            break;
                        default:
                        var hihi = "hihi";
                };
                switch (Saints) {
                    case 'Joseph':
                        SainteFamille.addLayer(circle2);
                        break;
                    case 'Anne':
                        StAnneTrinitaire.addLayer(circle2);
                        break;
            };}
                 else if (degré <4) {
                    
                    var circle2 = new L.marker (new L.latLng(loc), {
                            title:title, opacity: 0.18, icon: blur3, icon2: blur3,
                            properties:{date_deb:date_deb, date_fin:date_fin, start:start, end:end, label:label, img:img, Index:Index, Origin:Origin, loc:loc}});

                                circle2.bindPopup(img+"</br>"+label);

                        searchLayer.addLayer(circle2);
                        sliderLayer.addLayer(circle2);
                        oms.addMarker(circle2);

                    if (Origin != "nan" || Filiations!= "Aucune") {
                                circle2.bindPopup(img+"</br>"+label+"</br>"+"</br>"+`<button class="suggestion" onclick="sliderLayer.eachLayer(function (layer) {if (layer.options.properties.Index=='${Origin}') {layer.addTo(map);layer.openPopup();} else if (layer.options.properties.Origin=='${Index}' && '${Origin}' == 'nan') {layer.addTo(map);layer.openPopup();} else if (layer.options.properties.Origin=='${Index}' && '${Origin}' == 'nan' && layer.options.properties.Filiations == 'Aucune') {layer.addTo(map);layer.openPopup();}})" onmouseover="sliderLayer.eachLayer(function (layer) {if (layer.options.properties.Index=='${Origin}' || layer.options.properties.Origin=='${Index}') {var lieu2 = layer.options.properties.loc; L.circleMarker(latlng= new L.latLng(lieu2), {radius:3, stroke:0.1, opacity:0.1, color:'blue', fill:false, fillColor:'none'}).addTo(polyLayer);}})" onmouseout="polyLayer.clearLayers();">`+" Voir aussi </button>");
                            };
                        
                        circle2.on('click', function (e) {
                        this.openPopup();
                    });
                        circle2.on('dblclick', function (e) {
                        this.closePopup();
                    });



                    circle2.on('mouseover', function (e) {
                        console.log(e);
                    sliderLayer.eachLayer(function (layer) {
                        if (layer.options.properties.Index==e.target.options.properties.Origin || layer.options.properties.Origin==e.target.options.properties.Index) {
                        var lieu1 = e.target.options.properties.loc;
                        var lieu2 = layer.options.properties.loc;
                        console.log(lieu1);
                        console.log(lieu2);
                        var endroits = [lieu1,lieu2];
                        L.polyline(endroits, {color: 'palegoldenrod'}).addTo(polyLayer);
                        L.circleMarker(latlng= new L.latLng(lieu2), {radius:5, stroke:1, opacity:0.1, color:'none', fill:true, fillColor:'blue'}).addTo(polyLayer);
                        }

                    ;})
                })
                
                circle2.on('mouseout', function (e) {
                    polyLayer.clearLayers();
                    console.clear();});

                        
                        
                         
                        var popup = new L.Popup({closeButton: false, offset: new L.Point(0.5, -24)});
                        oms.addListener('dblclick', function(marker) {
                            popup.setContent(marker.desc);
                            popup.setLatLng(marker.getLatLng());
                            map.openPopup(popup);
                            });

                            oms.addListener('spiderfy', function(markers) {
                            for (var i = 0, len = markers.length; i < len; i ++) markers[i].setIcon(CustomIcon);
                            map.closePopup();
                            });
                            oms.addListener('unspiderfy', function(markers) {
                            for (var i = 0, len = markers.length; i < len; i ++) markers[i].setIcon(markers[i].options.icon2);
                            });

                     if (Localisation=='Ext'&&Saints=='False'&&parapet=='True'&&date_fin>1400)
                                    {HortusClausus.addLayer(circle2)};
                        
                     switch (allaitante) {
                        case 'True':
                            Vierge_allaitante.addLayer(circle2);
                            break;
                };
                    switch (Apocalypse) {
                        case 'True':
                            Vierge_de_l_Apocalypse.addLayer(circle2);
                            break;
                };
                    switch (parapet) {
                        case 'True':
                            Vierge_au_parapet.addLayer(circle2);
                            break;
                };
                    switch (Dieu) {
                        case 'True':
                            Vierge_et_Dieu.addLayer(circle2);
                            break;
                };
                    switch (Anges) {
                        case 'True':
                            Vierge_et_anges.addLayer(circle2);
                            break;
                };
                    switch (Voile) {
                        case 'False':
                            Vierge_dévoilée.addLayer(circle2);
                            break;
                };
                    switch (Couronne) {
                        case 'True':
                            Vierge_couronnée.addLayer(circle2);
                            break;
                };
                    switch (Coussin) {
                        case 'True':
                            Vierge_au_coussin.addLayer(circle2);
                            break;
                };
                    switch (Localisation) {
                        case 'Ext':
                            Vierge_extérieure.addLayer(circle2);
                            break;
                        case 'Int':
                            Vierge_intérieure.addLayer(circle2);
                            break;
                        default:
                        var hihi = "hihi";
                };
                    switch (Direction) {
                        case 'Gauche':
                            Vierge_gauche.addLayer(circle2);
                            break;
                        case 'Droite':
                            Vierge_droite.addLayer(circle2);
                            break;
                        case 'Face':
                            Vierge_face.addLayer(circle2);
                            break;
                };
                switch (Saints) {
                    case 'Joseph':
                        SainteFamille.addLayer(circle2);
                        break;
                    case 'Anne':
                        StAnneTrinitaire.addLayer(circle2);
                        break;
            };}
                
                else {

                    var circle2 = new L.marker (new L.latLng(loc), {
                            title:title, opacity:0.16, icon: blur4, icon2: blur4,
                            properties:{date_deb:date_deb, date_fin:date_fin, start:start, end:end, label:label, img:img, Index:Index, Origin:Origin, loc:loc}});

                        circle2.bindPopup(img+"</br>"+label);
                        
                        searchLayer.addLayer(circle2);
                        sliderLayer.addLayer(circle2);
                        oms.addMarker(circle2);

                        if (Origin != "nan" || Filiations!= "Aucune") {
                                circle2.bindPopup(img+"</br>"+label+"</br>"+"</br>"+`<button class="suggestion" onclick="sliderLayer.eachLayer(function (layer) {if (layer.options.properties.Index=='${Origin}') {layer.addTo(map);layer.openPopup();} else if (layer.options.properties.Origin=='${Index}' && '${Origin}' == 'nan') {layer.addTo(map);layer.openPopup();} else if (layer.options.properties.Origin=='${Index}' && '${Origin}' == 'nan' && layer.options.properties.Filiations == 'Aucune') {layer.addTo(map);layer.openPopup();}})" onmouseover="sliderLayer.eachLayer(function (layer) {if (layer.options.properties.Index=='${Origin}' || layer.options.properties.Origin=='${Index}') {var lieu2 = layer.options.properties.loc; L.circleMarker(latlng= new L.latLng(lieu2), {radius:3, stroke:0.1, opacity:0.1, color:'blue', fill:false, fillColor:'none'}).addTo(polyLayer);}})" onmouseout="polyLayer.clearLayers();">`+" Voir aussi </button>");
                            };
                        
                        circle2.on('click', function (e) {
                        this.openPopup();
                    });
                        circle2.on('dblclick', function (e) {
                        this.closePopup();
                    });

                    
                    circle2.on('mouseover', function (e) {
                        console.log(e);
                    sliderLayer.eachLayer(function (layer) {
                        if (layer.options.properties.Index==e.target.options.properties.Origin || layer.options.properties.Origin==e.target.options.properties.Index) {
                        var lieu1 = e.target.options.properties.loc;
                        var lieu2 = layer.options.properties.loc;
                        console.log(lieu1);
                        console.log(lieu2);
                        var endroits = [lieu1,lieu2];
                        L.polyline(endroits, {color: 'palegoldenrod'}).addTo(polyLayer);
                        L.circleMarker(latlng= new L.latLng(lieu2), {radius:5, stroke:1, opacity:0.1, color:'none', fill:true, fillColor:'blue'}).addTo(polyLayer);
                    
                        }

                    ;})
                })
                
                circle2.on('mouseout', function (e) {
                    polyLayer.clearLayers();
                });
                         
                        var popup = new L.Popup({closeButton: false, offset: new L.Point(0.5, -24)});
                        oms.addListener('dblclick', function(marker) {
                            popup.setContent(marker.desc);
                            popup.setLatLng(marker.getLatLng());
                            map.openPopup(popup);
                            });

                            oms.addListener('spiderfy', function(markers) {
                            for (var i = 0, len = markers.length; i < len; i ++) markers[i].setIcon(CustomIcon);
                            map.closePopup();
                            });
                            oms.addListener('unspiderfy', function(markers) {
                            for (var i = 0, len = markers.length; i < len; i ++) markers[i].setIcon(markers[i].options.icon2);
                            });
                    
                    if (Localisation=='Ext'&&Saints=='False'&&parapet=='True'&&date_fin>1400)
                            {HortusClausus.addLayer(circle2)};
                        
                     switch (allaitante) {
                        case 'True':
                            Vierge_allaitante.addLayer(circle2);
                            break;
                };
                    switch (Apocalypse) {
                        case 'True':
                            Vierge_de_l_Apocalypse.addLayer(circle2);
                            break;
                };
                    switch (parapet) {
                        case 'True':
                            Vierge_au_parapet.addLayer(circle2);
                            break;
                };
                    switch (Dieu) {
                        case 'True':
                            Vierge_et_Dieu.addLayer(circle2);
                            break;
                };
                    switch (Anges) {
                        case 'True':
                            Vierge_et_anges.addLayer(circle2);
                            break;
                };
                    switch (Voile) {
                        case 'False':
                            Vierge_dévoilée.addLayer(circle2);
                            break;
                };
                    switch (Couronne) {
                        case 'True':
                            Vierge_couronnée.addLayer(circle2);
                            break;
                };
                    switch (Coussin) {
                        case 'True':
                            Vierge_au_coussin.addLayer(circle2);
                            break;
                };
                    switch (Localisation) {
                        case 'Ext':
                            Vierge_extérieure.addLayer(circle2);
                            break;
                        case 'Int':
                            Vierge_intérieure.addLayer(circle2);
                            break;
                        default:
                        var hihi = "hihi";
                };
                    switch (Direction) {
                        case 'Gauche':
                            Vierge_gauche.addLayer(circle2);
                            break;
                        case 'Droite':
                            Vierge_droite.addLayer(circle2);
                            break;
                        case 'Face':
                            Vierge_face.addLayer(circle2);
                            break;
                };
                switch (Saints) {
                    case 'Joseph':
                        SainteFamille.addLayer(circle2);
                        break;
                    case 'Anne':
                        StAnneTrinitaire.addLayer(circle2);
                        break;
            };
                }
                }

        
        
        
        
        
        var filtres = {"Toutes":sliderLayer,
        "Vierge de l'Apocalypse":Vierge_de_l_Apocalypse,
        "Vierge allaitante":Vierge_allaitante,
        "Vierge au parapet":Vierge_au_parapet,
        "Vierge avec Dieu le père ou Saint-Esprit":Vierge_et_Dieu,
        "Vierge avec Anges":Vierge_et_anges,
        "Vierge dévoilée":Vierge_dévoilée,
        "Vierge couronnée":Vierge_couronnée,
        "Vierge au coussin":Vierge_au_coussin,
        "Vierge tournée vers la droite":Vierge_droite,
        "Vierge tournée vers la gauche":Vierge_gauche,
        "Vierge de face":Vierge_face,
        "Scène intérieure":Vierge_intérieure,
        "Scène extérieure":Vierge_extérieure,
        "Sainte famille (et affiliées)":SainteFamille,
        "Sainte Anne trinitaire":StAnneTrinitaire,
        "Hortus Clausus":HortusClausus}
        
        
        // FONCTIONS

        
        L.control.layers(null, filtres).addTo(map);
        

        var controlSearch = new L.Control.Search({
        
            position:'topleft',		
            layer: searchLayer,
            zoom: 6,
            initial: false,
            textPlaceholder: 'Rechercher une œuvre...',
            textErr: 'Pas de résultats',
            marker: false,
            collapsed: false,
            "marker.animate": true,
            buildTip: function(text, val) {         // Customize result list
                var p = val.layer.options.properties;
                var list = p.label;
                return '<a>'+list+'</a>';
            }
        });
        
        map.addControl(controlSearch);
        
        controlSearch.on('search:locationfound', function(e) {
        
        e.layer.addTo(map);
        console.log(e.layer)
        e.layer.openPopup();

        map.removeLayer(Vierge_de_l_Apocalypse);
        map.removeLayer(Vierge_allaitante);
        map.removeLayer(Vierge_au_parapet);
        map.removeLayer(Vierge_et_Dieu);
        map.removeLayer(Vierge_et_anges);
        map.removeLayer(Vierge_dévoilée);
        map.removeLayer(Vierge_couronnée);
        map.removeLayer(Vierge_au_coussin);
        map.removeLayer(Vierge_droite);
        map.removeLayer(Vierge_gauche);
        map.removeLayer(Vierge_face);
        map.removeLayer(Vierge_intérieure);
        map.removeLayer(Vierge_extérieure);
        p = e.layer.options.properties;                 
        result = p.label;
        document.getElementById("searchtext25").value = result;
        
        });


        var slider = document.getElementById('slider');
        
        
           noUiSlider.create(slider, {
                start: [1330,1330],
                color: 'midnightblue',
                behaviour:'drag-slide',
                connect: true,
                tooltips: [wNumb({decimals:0}),wNumb({decimals:0})],
                step:5,
                range: {
                    'min': 1330,
                    'max': 1550,
                }
            }).on('slide', function(e) {
                console.log(e)
                
                map.removeLayer(searchLayer)
                
                
                Vierge_allaitante.eachLayer(function (layer) {

                 if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    Vierge_allaitante.addLayer(layer);}
                 else {map.removeLayer(layer)}})
                 
                
                Vierge_de_l_Apocalypse.eachLayer(function (layer) {

                 if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    Vierge_de_l_Apocalypse.addLayer(layer);}
                 else {map.removeLayer(layer)}})
                
                Vierge_au_parapet.eachLayer(function (layer) {

                 if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    Vierge_au_parapet.addLayer(layer);}
                 else {map.removeLayer(layer)}})
                
                Vierge_et_Dieu.eachLayer(function (layer) {

                 if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    Vierge_et_Dieu.addLayer(layer);}
                 else {map.removeLayer(layer)}})
                
                Vierge_et_anges.eachLayer(function (layer) {

                 if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    Vierge_et_anges.addLayer(layer);}
                 else {map.removeLayer(layer)}})
                
                Vierge_dévoilée.eachLayer(function (layer) {

                 if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    Vierge_dévoilée.addLayer(layer);}
                 else {map.removeLayer(layer)}})
                
                Vierge_couronnée.eachLayer(function (layer) {

                 if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    Vierge_couronnée.addLayer(layer);}
                 else {map.removeLayer(layer)}})
                
                
                Vierge_au_coussin.eachLayer(function (layer) {

                 if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    Vierge_au_coussin.addLayer(layer);}
                 else {map.removeLayer(layer)}})
                
                
                Vierge_gauche.eachLayer(function (layer) {

                 if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    Vierge_gauche.addLayer(layer);}
                 else {map.removeLayer(layer)}})
                
                
                Vierge_droite.eachLayer(function (layer) {

                 if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    Vierge_droite.addLayer(layer);}
                 else {map.removeLayer(layer)}})
                
                
                Vierge_face.eachLayer(function (layer) {

                 if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    Vierge_face.addLayer(layer);}
                 else {map.removeLayer(layer)}})
                
                
                Vierge_intérieure.eachLayer(function (layer) {

                 if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    Vierge_intérieure.addLayer(layer);}
                 else {map.removeLayer(layer)}})
                
                
                sliderLayer.eachLayer(function (layer) {

                 if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    sliderLayer.addLayer(layer);}
                 else {map.removeLayer(layer)}})
                
                
                Vierge_extérieure.eachLayer(function (layer) {

                 if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    Vierge_extérieure.addLayer(layer);}
                 else {map.removeLayer(layer)}})
                
                
                 SainteFamille.eachLayer(function (layer) {
 
                  if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    SainteFamille.addLayer(layer);}
                  else {map.removeLayer(layer)}})
                
                
                  StAnneTrinitaire.eachLayer(function (layer) {
  
                   if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                    StAnneTrinitaire.addLayer(layer);}
                   else {map.removeLayer(layer)}})
                
                
                   HortusClausus.eachLayer(function (layer) {
   
                    if(layer.options.properties.date_deb>=parseFloat(e[0])&&layer.options.properties.date_fin<=parseFloat(e[1])) {
                        HortusClausus.addLayer(layer);}
                    else {map.removeLayer(layer)}})
                
                 
            })
            
            TimeControl = map.timeDimension
            
            
        TimeControl.on('timeload', function(e) {
        console.log(e)
        
        var date = new Date(e.time)
            year = date.getFullYear()
            year1 = String(year);

        sliderLayer.eachLayer(function (layer) {

        if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
        sliderLayer.addLayer(layer);}
        else  {
        map.removeLayer(layer);}
        
        });
                
        Vierge_allaitante.eachLayer(function (layer) {

            if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
               Vierge_allaitante.addLayer(layer);}
            else {map.removeLayer(layer)}});
            
           
           Vierge_de_l_Apocalypse.eachLayer(function (layer) {

            if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
               Vierge_de_l_Apocalypse.addLayer(layer);}
            else {map.removeLayer(layer)}});
           
           Vierge_au_parapet.eachLayer(function (layer) {

            if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
               Vierge_au_parapet.addLayer(layer);}
            else {map.removeLayer(layer)}});
           
           Vierge_et_Dieu.eachLayer(function (layer) {

            if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
               Vierge_et_Dieu.addLayer(layer);}
            else {map.removeLayer(layer)}});
           
           Vierge_et_anges.eachLayer(function (layer) {

            if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
               Vierge_et_anges.addLayer(layer);}
            else {map.removeLayer(layer)}});
           
           Vierge_dévoilée.eachLayer(function (layer) {

            if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
               Vierge_dévoilée.addLayer(layer);}
            else {map.removeLayer(layer)}});
           
           Vierge_couronnée.eachLayer(function (layer) {

            if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
               Vierge_couronnée.addLayer(layer);}
            else {map.removeLayer(layer)}});
           
           
           Vierge_au_coussin.eachLayer(function (layer) {

            if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
               Vierge_au_coussin.addLayer(layer);}
            else {map.removeLayer(layer)}});
           
           
           Vierge_gauche.eachLayer(function (layer) {

            if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
               Vierge_gauche.addLayer(layer);}
            else {map.removeLayer(layer)}});
           
           
           Vierge_droite.eachLayer(function (layer) {

            if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
               Vierge_droite.addLayer(layer);}
            else {map.removeLayer(layer)}});
           
           
           Vierge_face.eachLayer(function (layer) {

            if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
               Vierge_face.addLayer(layer);}
            else {map.removeLayer(layer)}});
           
           
           Vierge_intérieure.eachLayer(function (layer) {

            if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
               Vierge_intérieure.addLayer(layer);}
            else {map.removeLayer(layer)}});
           
           
           Vierge_extérieure.eachLayer(function (layer) {

            if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
               Vierge_extérieure.addLayer(layer);}
            else {map.removeLayer(layer)}})
           
           
            SainteFamille.eachLayer(function (layer) {

                if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
               SainteFamille.addLayer(layer);}
             else {map.removeLayer(layer)}})
           
           
             StAnneTrinitaire.eachLayer(function (layer) {

                if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
               StAnneTrinitaire.addLayer(layer);}
              else {map.removeLayer(layer)}})
           
           
              HortusClausus.eachLayer(function (layer) {

                if(layer.options.properties.start<=e.time&&parseFloat(layer.options.properties.end+333000000000)>=e.time) {
                   HortusClausus.addLayer(layer);}
               else {map.removeLayer(layer)}})
        
        
        });
