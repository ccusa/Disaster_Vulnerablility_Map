mapboxgl.accessToken = 'pk.eyJ1Ijoicm1jYXJkZXIiLCJhIjoiY2lqM2lwdHdzMDA2MHRwa25sdm44NmU5MyJ9.nQY5yF8l0eYk2jhQ1koy9g';

function addCustomLayers(map) {

  sources.forEach(function(source) {
    let id = source[0];
    let obj = source[1];
    map.addSource(id, obj)
  });

  layers.forEach(function(layer) {
    let obj = layer[0];
    let label = layer[1];
    map.addLayer(obj, label);
  });

}

var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  zoom: 14,
  types: 'region,postcode,district,place',
  country: 'US'
});

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/rmcarder/cizru0urw00252ro740x73cea',
  zoom: 2,
  hash:true,
  center: [-76.92, 38.9072],
  minZoom: 3,
  // We only need to preserve drawing buffer if we implement printing
  // otherwise it is a performance drawback
  // preserveDrawingBuffer: true
  attributionControl: false
});


function addLayerNav(map) {

  var toggleableLayers = [
    { ids: ['tract', 'county'], name: 'Social Vulnerability - Overall'},
    { ids: ['tract-socio','county-socio'], name: 'Socioeconomic Vulnerability'},
    { ids: ['tract-household','county-household'], name: 'Household Composition and Disability Vulnerability'},
    { ids: ['tract-minority','county-minority'], name: 'Minority Status and Language Vulnerability'},
    { ids: ['tract-household','county-housing'], name: 'Housing and Transportation Vulnerability'},
    { ids: ['county-hazard'], name: 'Overall Disaster Risk'},
    { ids: ['county-hurricane'], name: 'Hurricane Risk'},
    { ids: ['county-flood'], name: 'Flood Risk'},
    { ids: ['county-earthquake'], name: 'Earthquake Risk'},
    { ids: ['county-wildfire'], name: 'Wildfire Risk'},
    { ids: ['county-tornado'], name: 'Tornado Risk'},
    { ids: ['county-hail'], name: 'Hail Risk'},
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
        console.log(layerId)

        map.setLayoutProperty(layerId, 'visibility', 'visible');
      });
      // console.log(map.getLayoutProperty(layerId,"type"))

      updateLegend(layer.ids[0])
      updateSidebarTitle(layer.name)
      console.log()
    };

    menu.appendChild(link);
  });
}

//map.addControl(geocoder, 'top-left');

d3.select('#search')
  .node()
  .appendChild(geocoder.onAdd(map));


map.on('load', function() {
  addCustomLayers(map);
  addLayerNav(map);


var lastFIPS=0;
  map.on('mousemove', function (e) {
    var county = map.queryRenderedFeatures(e.point, {
       layers: ['county','county-socio','county-housing','county-household']
    });
    var tract = map.queryRenderedFeatures(e.point, {
      layers: ['tract','tract-socio','tract-household','tract-housing']
    });

    if (county.length > 0 && map.getZoom() < 8.0) {
      map.getSource('highlight').setData({
				"type": "FeatureCollection",
				"features": county
      });
      if (county[0].properties.FIPS !== lastFIPS) {
        // console.log('Select county', county[0].properties.FIPS);
        updateSidebar(county[0].properties);
        lastFIPS = county[0].properties.FIPS;
      }
    }
    else if (tract.length>0 && map.getZoom() >= 8.0) {
      map.getSource('highlight').setData({
				"type": "FeatureCollection",
				"features": tract
      });
      if (tract[0].properties.FIPS !== lastFIPS) {
        // console.log('Select tract', tract[0].properties.FIPS);
        updateSidebar(tract[0].properties);
        lastFIPS = tract[0].properties.FIPS;
      }
    } else {
      map.getCanvas().style.cursor = 'default';
    }
  });
});
