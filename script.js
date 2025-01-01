// Define layers
        const layers = [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
                title: 'Base Map',
                visible: true
            }),
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://localhost:8080/geoserver/Roserwin/wms',
                    params: {'LAYERS': 'Roserwin:flood_1_Very Low'},
                    serverType: 'geoserver'
                }),
                title: 'Flood - Very Low',
                visible: true
            }),
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://localhost:8080/geoserver/Roserwin/wms',
                    params: {'LAYERS': 'Roserwin:flood_2_Low'},
                    serverType: 'geoserver'
                }),
                title: 'Flood - Low',
                visible: true
            }),
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://localhost:8080/geoserver/Roserwin/wms',
                    params: {'LAYERS': 'Roserwin:flood_3_High'},
                    serverType: 'geoserver'
                }),
                title: 'Flood - High',
                visible: true
            }),
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://localhost:8080/geoserver/Roserwin/wms',
                    params: {'LAYERS': 'Roserwin:flood_4_Very High'},
                    serverType: 'geoserver'
                }),
                title: 'Flood - Very High',
                visible: true
            }),
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://localhost:8080/geoserver/Roserwin/wms',
                    params: {'LAYERS': 'Roserwin:landslide_1_Very Low'},
                    serverType: 'geoserver'
                }),
                title: 'Landslide - Very Low',
                visible: true
            }),
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://localhost:8080/geoserver/Roserwin/wms',
                    params: {'LAYERS': 'Roserwin:landslide_2_Low'},
                    serverType: 'geoserver'
                }),
                title: 'Landslide - Low',
                visible: true
            }),
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://localhost:8080/geoserver/Roserwin/wms',
                    params: {'LAYERS': 'Roserwin:landslide_3_High'},
                    serverType: 'geoserver'
                }),
                title: 'Landslide - High',
                visible: true
            }),
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://localhost:8080/geoserver/Roserwin/wms',
                    params: {'LAYERS': 'Roserwin:landslide_4_Very High'},
                    serverType: 'geoserver'
                }),
                title: 'Landslide - Very High',
                visible: true
            }),
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://localhost:8080/geoserver/Roserwin/wms',
                    params: {'LAYERS': 'Roserwin:Ormoc_City_Highways'},
                    serverType: 'geoserver'
                }),
                title: 'Roads',
                visible: true
            }),
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://localhost:8080/geoserver/Roserwin/wms',
                    params: {'LAYERS': 'Roserwin:Waterway_Ormoc_City'},
                    serverType: 'geoserver'
                }),
                title: 'Waterways',
                visible: true
            }),
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://localhost:8080/geoserver/Roserwin/wms',
                    params: {'LAYERS': 'Roserwin:Buildings_Ormoc_City'},
                    serverType: 'geoserver'
                }),
                title: 'Buildings',
                visible: true
			}),
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://localhost:8080/geoserver/Roserwin/wms',
                    params: {'LAYERS': 'Roserwin:Ormoc_City_BDRY'},
                    serverType: 'geoserver'
                }),
                title: 'Boundary',
                visible: true
            })
        ];

        // Initialize map
        var map = new ol.Map({
            target: 'map',
            layers: layers,
            view: new ol.View({
                center: ol.proj.fromLonLat([124.6193, 11.0384]),
                zoom: 12.8
            })
        });
		
		// Add Geocoder
        const geocoder = new Geocoder('nominatim', {
            provider: 'osm',
            targetType: 'text-input',
            lang: 'en',
            placeholder: 'Search for a location...',
            limit: 5,
            keepOpen: true
        });
        map.addControl(geocoder);

        // Add event listeners to toggle layers
        document.querySelectorAll('.controls input[type="checkbox"]').forEach((checkbox, index) => {
            checkbox.addEventListener('change', function() {
                layers[index + 1].setVisible(this.checked);
            });
        });

        // Add zoom control
        map.addControl(new ol.control.Zoom());

        // Add mouse position control
        var mousePositionControl = new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),
            projection: 'EPSG:4326',
            undefinedHTML: '&nbsp;'
        });
        map.addControl(mousePositionControl);

        // Update coordinates dynamically
        map.on('pointermove', function(event) {
            var coordinates = ol.proj.toLonLat(event.coordinate);
            document.getElementById('coordinates').innerText = 
                `Lon: ${coordinates[0].toFixed(4)}, Lat: ${coordinates[1].toFixed(4)}`;
        });

        // Add scale bar
        var scaleLineControl = new ol.control.ScaleLine({
            units: 'metric',
            bar: true,
            steps: 4,
            text: true
        });
        map.addControl(scaleLineControl);
		