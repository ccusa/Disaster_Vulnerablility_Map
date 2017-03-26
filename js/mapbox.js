mapboxgl.accessToken = 'pk.eyJ1Ijoicm1jYXJkZXIiLCJhIjoiY2lqM2lwdHdzMDA2MHRwa25sdm44NmU5MyJ9.nQY5yF8l0eYk2jhQ1koy9g';

var options={
	tract:' ',
}

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/rmcarder/cizru0urw00252ro740x73cea',
	zoom: 2,
	hash:true,
	center: [-76.92, 38.9072],
	minZoom: 3,
	preserveDrawingBuffer: true});

map.on('load', function() {

map.addSource("maps", {
"type": "vector",
"url": "mapbox://lukasmartinelli.9xh49yog,lukasmartinelli.bn7gihoi"
});

map.addLayer({
    "id": "county",
    "type": "fill",
    "source": "maps",
    "source-layer":"SVI_County",
    "maxzoom": 20,
    paint: {
            'fill-color': {
                property: 'F_TOTAL',
                type: 'categorical',
                stops: [
                    [1, '#f0f9e8'],
                    [2, '#ccebc5'],
                    [3, '#a8ddb5'],
                    [4, '#7bccc4'],
                    [5, '#4eb3d3'],
                    [6, '#2b8cbe'],
                    [7, '#08589e'],
                    [9, '#08589e'],
                    [10, '#08589e'],
                    [11, '#08589e'],
                    [12, '#08589e'],
                    [13, '#08589e']]
            },
            'fill-opacity': {
            	stops:[[0,0.5],[8,0.5],[10,0]]
            }
        }

},"airport-label"
);

map.addLayer({
    "id": "tract",
    "type": "fill",
    "source": "maps",
    "source-layer":"SVI_Tract",
    "minzoom": 0,
    paint: {
            'fill-color': {
                property: 'F_TOTAL',
                type: 'categorical',
                stops: [
                    [1, '#f0f9e8'],
                    [2, '#ccebc5'],
                    [3, '#a8ddb5'],
                    [4, '#7bccc4'],
                    [5, '#4eb3d3'],
                    [6, '#2b8cbe'],
                    [7, '#08589e'],
                    [9, '#08589e'],
                    [10, '#08589e'],
                    [11, '#08589e'],
                    [12, '#08589e'],
                    [13, '#08589e']]
            },
            'fill-opacity': {
            	stops:[[0,0],[8,0],[10,0.5]]
            }
        }

},"county"
);

map.addLayer({
    "id": "county-socio",
    "type": "fill",
    "source": "maps",
    "source-layer":"SVI_County",
    "maxzoom": 20,
    paint: {
            'fill-color': {
                property: 'F_THEME1',
                type: 'categorical',
                stops: [
                    [1, '#f0f9e8'],
                    [2, '#bae4bc'],
                    [3, '#7bccc4'],
                    [4, '#2b8cbe']]
            },
            'fill-opacity': {
            	stops:[[0,0.5],[8,0.5],[10,0]]
            }
        }

},"airport-label"
);

map.addLayer({
    "id": "tract-socio",
    "type": "fill",
    "source": "maps",
    "source-layer":"SVI_Tract",
    "minzoom": 0,
    paint: {
            'fill-color': {
                property: 'F_THEME1',
                type: 'categorical',
                stops: [
                    [1, '#f0f9e8'],
                    [2, '#bae4bc'],
                    [3, '#7bccc4'],
                    [4, '#2b8cbe']]
            },
            'fill-opacity': {
            	stops:[[0,0],[8,0],[10,0.5]]
            }
        }

},"county"
);

map.addLayer({
    "id": "county-household",
    "type": "fill",
    "source": "maps",
    "source-layer":"SVI_County",
    "maxzoom": 20,
    paint: {
            'fill-color': {
                property: 'F_THEME2',
                type: 'categorical',
                stops: [
                    [1, '#f0f9e8'],
                    [2, '#bae4bc'],
                    [3, '#7bccc4'],
                    [4, '#2b8cbe']]
            },
            'fill-opacity': {
            	stops:[[0,0.5],[8,0.5],[10,0]]
            }
        }

},"airport-label"
);

map.addLayer({
    "id": "tract-household",
    "type": "fill",
    "source": "maps",
    "source-layer":"SVI_Tract",
    "minzoom": 0,
    paint: {
            'fill-color': {
                property: 'F_THEME2',
                type: 'categorical',
                stops: [
                    [1, '#f0f9e8'],
                    [2, '#bae4bc'],
                    [3, '#7bccc4'],
                    [4, '#2b8cbe']]
            },
            'fill-opacity': {
            	stops:[[0,0],[8,0],[10,0.5]]
            }
        }

},"county"
);

map.addLayer({
    "id": "county-housing",
    "type": "fill",
    "source": "maps",
    "source-layer":"SVI_County",
    "maxzoom": 20,
    paint: {
            'fill-color': {
                property: 'F_THEME4',
                type: 'categorical',
                stops: [
                    [1, '#f0f9e8'],
                    [2, '#bae4bc'],
                    [3, '#7bccc4'],
                    [4, '#2b8cbe']]
            },
            'fill-opacity': {
            	stops:[[0,0.5],[8,0.5],[10,0]]
            }
        }

},"airport-label"
);

map.addLayer({
    "id": "tract-housing",
    "type": "fill",
    "source": "maps",
    "source-layer":"SVI_Tract",
    "minzoom": 0,
    paint: {
            'fill-color': {
                property: 'F_THEME4',
                type: 'categorical',
                stops: [
                    [1, '#f0f9e8'],
                    [2, '#bae4bc'],
                    [3, '#7bccc4'],
                    [4, '#2b8cbe']]
            },
            'fill-opacity': {
            	stops:[[0,0],[8,0],[10,0.5]]
            }
        }

},"county"
);

map.addLayer({
    "id": "county-hazard",
    "type": "fill",
    "source": "maps",
    "source-layer":"SVI_County",
    "maxzoom": 20,
    paint: {
            'fill-color': {
                property: 'T_N_H_R',
                stops: [
                    [45, '#ffffcc'],
                    [90, '#ffeda0'],
                    [135, '#fed976'],
                    [180, '#feb24c'],
                    [225, '#fd8d3c'],
                    [270, '#fc4e2a'],
                    [315, '#e31a1c'],
                    [360, '#b10026']]
            },
            'fill-opacity': 0.5
        }

},"airport-label"
);



var toggleableLayerIds = [ 'Social Vulnerability - Overall',
							'Socioeconomic Status',
							'Household Composition & Disability',
							'Housing & Transportation',
							'Total Natural Hazard Risk',
							'Earthquake Risk',
							'Tornado Risk',
							'Hail Risk',
							'Hurricane Risk',
							'Flood Risk',
							'Wildfire Risk'
							];

    var toggleableLayers = [
      { ids: ['tract', 'county'], name: 'Social Vulnerability - Overall'},
      { ids: ['tract-socio','county-socio'], name: 'Socioeconomic Vulnerability'},
      { ids: ['tract-household','county-household'], name: 'Household Composition and Disability Vulnerability'},
      { ids: ['tract-household','county-housing'], name: 'Housing and Transportation Vulnerability'},
      { ids: ['county-hazard'], name: 'Hazard Risk'}
    ];

    var menu = document.getElementById('menu');

    function hideAllLayers() {
			toggleableLayers.forEach(function(layer, i) {
				var link = menu.children[i];
				link.className = '';
				layer.ids.forEach(function(layerId) {
          map.setLayoutProperty(layerId, 'visibility', 'none');
				});
			});
    }

    toggleableLayers.forEach(function(layer) {
        var link = document.createElement('a');
        link.href = '#';
        link.className = '';
        link.textContent = layer.name;

        link.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            hideAllLayers();
            this.className = 'active';
						layer.ids.forEach(function(layerId) {
              map.setLayoutProperty(layerId, 'visibility', 'visible');
						});
        };

        menu.appendChild(link);
    });

map.on('mousemove', function (e) {
			if (map.getzoom<8){
					var county = map.queryRenderedFeatures(e.point, {
			      layers: ['county']
			  });
			 console.log(county[0].properties.COUNTY);

			} else{
			  var tract = map.queryRenderedFeatures(e.point, {
			      layers: ['tract']			    
			  });
			  overlay(tract[0].properties.FIPS);
			}
		
			    
			});

	map.getCanvas().style.cursor = 'default';



});


//#f0f9e8 0-2
//#ccebc5 3-4 etc..
//#a8ddb5
//#7bccc4
//#4eb3d3
//#2b8cbe
//#08589e
