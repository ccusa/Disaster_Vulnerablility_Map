mapboxgl.accessToken = 'pk.eyJ1IjoiZGF0YWtpbmRkYyIsImEiOiJjaWppcmZtMHcwMnZ2dHlsdDlzenN0MnRqIn0.FsB8WZ_HKhb3mPa1MPXxdw';

const toggleableLayerIds = [
  'Social Vulnerability - Overall',
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
const toggleableLayersSocial = [
  { ids: ['tract', 'county'], name: ['Social Vulnerability - Overall']},
  { ids: ['tract-socio','county-socio'], name: ['Socioeconomic Vulnerability']},
  { ids: ['tract-household','county-household'], name: ['Household Composition and Disability Vulnerability']},
  { ids: ['tract-minority','county-minority'], name: ['Minority Status and Language Vulnerability']},
  { ids: ['tract-household','county-housing'], name: ['Housing and Transportation Vulnerability']},
];

const toggleableLayersHazard = [
  { ids: ['county-hazard'], name: ['Overall Hazard Risk']},
  { ids: ['county-hurricane'], name: ['Hurricane Risk'], icon: ['icons/hurricane.svg']},
  { ids: ['county-flood'], name: ['Flood Risk'], icon: ['icons/flood.svg']},
  { ids: ['county-earthquake'], name: ['Earthquake Risk'], icon: ['icons/earthquake.svg']},
  { ids: ['county-wildfire'], name: ['Wildfire Risk'], icon: ['icons/wildfire.svg']},
  { ids: ['county-tornado'], name: ['Tornado Risk'], icon: ['icons/tornado.svg']},
  { ids: ['county-hail'], name: ['Hail Risk'], icon: ['icons/hail.svg']},
];

function addCustomLayers(map) {

  mapSources.forEach(function(source) {
    let id = source[0];
    let obj = source[1];
    map.addSource(id, obj)
  });

  mapLayers.forEach(function(layer) {
    let obj = layer[0];
    let label = layer[1];
    map.addLayer(obj, label);
  });

}


function hideAllLayers() {
  toggleableLayersSocial.forEach(function(layer, i) {
    var link = menusocial.children[i];
    link.className = '';
    layer.ids.forEach(function(layerId) {
      map.setLayoutProperty(layerId, 'visibility', 'none');
    });
  });
  toggleableLayersHazard.forEach(function(layer, i) {
    var link = menuhazard.children[i];
    link.className = '';
    layer.ids.forEach(function(layerId) {
      map.setLayoutProperty(layerId, 'visibility', 'none');
    });
  });
}

function setOnLinkClickHandler(link, layer) {
  link.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    hideAllLayers();
    this.className = 'active';
    layer.ids.forEach(function(layerId) {
      map.setLayoutProperty(layerId, 'visibility', 'visible');
    });

    updateLegend(layer.ids[0],layer.name[0])

  };
}

function takeSnapshot() {
  newTab = window.open(printLink, 'Image');
  newTab.focus();
}

function loadPrintLink(map) {

  let el = $("#print-link");
  el.text('Print Current View');
  el.css("pointer-events", "all");
  el.css("cursor", "pointer");

  el.click(function() {
    printLink = map.getCanvas().toDataURL("image/png");
    takeSnapshot()
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
  style: 'mapbox://styles/datakinddc/cin4w64ct0005abkuk6wxrak1',
  zoom: 2,
  hash:true,
  center: [-110.93, 38.49],
  minZoom: 3.5,
  // We only need to preserve drawing buffer if we implement printing
  // otherwise it is a performance drawback
  preserveDrawingBuffer: true,
  attributionControl: false
});

function addLayerNav(map) {

  var menusocial = document.getElementById('menusocial');
  var menuhazard = document.getElementById('menuhazard');

  toggleableLayersSocial.forEach(function(layer) {
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = layer.name;

    setOnLinkClickHandler(link, layer);

    menusocial.appendChild(link);
  });

  toggleableLayersHazard.forEach(function(layer) {
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = layer.name;

    setOnLinkClickHandler(link, layer);

    menuhazard.appendChild(link);
  });
}

//map.addControl(geocoder, 'top-left');

d3.select('#search')
.node()
.appendChild(geocoder.onAdd(map));


map.on('load', function() {
  addCustomLayers(map);
  addLayerNav(map);
  loadPrintLink(map);


  var lastFIPS=0;
  var click='FALSE';

  map.on('click', function (e){
      if(click==='TRUE'){
        click='FALSE'
      }else{click='TRUE'};
      console.log(click);
  } );

  
  map.on('mousemove', function (e) {
    if(click==='FALSE'){
    var county = map.queryRenderedFeatures(e.point, {
      layers: ['county','county-socio','county-housing','county-household','county-minority',
      'county-hazard','county-hurricane','county-flood', 'county-earthquake','county-wildfire',
      'county-tornado','county-hail']
    });
    var tract = map.queryRenderedFeatures(e.point, {
      layers: ['tract','tract-socio','tract-household','tract-housing','tract-minority']
    });

    if (tract.length>0){
      tract.map(function(e2){
        e2.properties.Earthquake = 0;
        e2.properties.Hail = 0;
        e2.properties.Flood = 0;
        e2.properties.Hurricane = 0;
        e2.properties.Tornado = 0;
        e2.properties.Diocese = 0;
        return e2;
      });
      if (county.length > 0){
        tract.map(function(e2){
          e2.properties.Earthquake = county[0].properties.Earthquake;
          e2.properties.Hail = county[0].properties.Hail;
          e2.properties.Flood = county[0].properties.Flood;
          e2.properties.Hurricane = county[0].properties.Hurricane;
          e2.properties.Tornado = county[0].properties.Tornado;
          e2.properties.Diocese = county[0].properties.Diocese;
          return e2;
        });
      }
    }

    if (county.length > 0 && map.getZoom() < 8.0) {
      map.getSource('highlight').setData({
        "type": "FeatureCollection",
        "features": county
      });
      if (county[0].properties.FIPS !== lastFIPS) {
        updateSidebar(county[0].properties);
        updateDonuts(county[0].properties);
        lastFIPS = county[0].properties.FIPS;
      }

    }
    else if (tract.length>0 && map.getZoom() >= 8.0) {
      map.getSource('highlight').setData({
        "type": "FeatureCollection",
        "features": tract
      });
      if (tract[0].properties.FIPS !== lastFIPS) {
        updateSidebar(tract[0].properties);
        updateDonuts(tract[0].properties);
        lastFIPS = tract[0].properties.FIPS;
      }
    } else {
      map.getCanvas().style.cursor = 'default';
    }
  };
});
});

