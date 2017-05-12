mapboxgl.accessToken = 'pk.eyJ1Ijoicm1jYXJkZXIiLCJhIjoiY2lqM2lwdHdzMDA2MHRwa25sdm44NmU5MyJ9.nQY5yF8l0eYk2jhQ1koy9g';

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
  { ids: ['tract', 'county'], name: 'Social Vulnerability - Overall'},
  { ids: ['tract-socio','county-socio'], name: 'Socioeconomic Vulnerability'},
  { ids: ['tract-household','county-household'], name: 'Household Composition and Disability Vulnerability'},
  { ids: ['tract-minority','county-minority'], name: 'Minority Status and Language Vulnerability'},
  { ids: ['tract-household','county-housing'], name: 'Housing and Transportation Vulnerability'},
];

const toggleableLayersHazard = [
  { ids: ['county-hazard'], name: 'Overall Hazard Risk'},
  { ids: ['county-hurricane'], name: 'Hurricane Risk'},
  { ids: ['county-flood'], name: 'Flood Risk'},
  { ids: ['county-earthquake'], name: 'Earthquake Risk'},
  { ids: ['county-wildfire'], name: 'Wildfire Risk'},
  { ids: ['county-tornado'], name: 'Tornado Risk'},
  { ids: ['county-hail'], name: 'Hail Risk'},
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

    updateLegend(layer.ids[0])
    updateSidebarTitle(layer.name)
  };
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

// Disable default box zooming.
map.boxZoom.disable();

// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false
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
  var canvas = map.getCanvasContainer();

  addCustomLayers(map);
  addLayerNav(map);
  // renderBoxQuery(map);



// Variable to hold the starting xy coordinates
// when `mousedown` occured.
var start;

// Variable to hold the current xy coordinates
// when `mousemove` or `mouseup` occurs.
var current;

// Variable for the draw box element.
var box;
canvas.addEventListener('mousedown', mouseDown, true);

// Return the xy coordinates of the mouse position
function mousePos(e) {
    var rect = canvas.getBoundingClientRect();
    return new mapboxgl.Point(
        e.clientX - rect.left - canvas.clientLeft,
        e.clientY - rect.top - canvas.clientTop
    );
}

function mouseDown(e) {
    // Continue the rest of the function if the shiftkey is pressed.
    if (!(e.shiftKey && e.button === 0)) return;

    // Disable default drag zooming when the shift key is held down.
    map.dragPan.disable();

    // Call functions for the following events
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('keydown', onKeyDown);

    // Capture the first xy coordinates
    start = mousePos(e);
}

function onMouseMove(e) {
    // Capture the ongoing xy coordinates
    current = mousePos(e);

    // Append the box element if it doesnt exist
    if (!box) {
        box = document.createElement('div');
        box.classList.add('boxdraw');
        canvas.appendChild(box);
    }

    var minX = Math.min(start.x, current.x),
        maxX = Math.max(start.x, current.x),
        minY = Math.min(start.y, current.y),
        maxY = Math.max(start.y, current.y);

    // Adjust width and xy position of the box element ongoing
    var pos = 'translate(' + minX + 'px,' + minY + 'px)';
    box.style.transform = pos;
    box.style.WebkitTransform = pos;
    box.style.width = maxX - minX + 'px';
    box.style.height = maxY - minY + 'px';
}

function onMouseUp(e) {
    // Capture xy coordinates
    finish([start, mousePos(e)]);
}

function onKeyDown(e) {
    // If the ESC key is pressed
    if (e.keyCode === 27) finish();
}

function finish(bbox) {
  console.log('finished')
    // Remove these events now that finish has been called.
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('mouseup', onMouseUp);

    if (box) {

        box.parentNode.removeChild(box);
        box = null;
    }

    // If bbox exists. use this value as the argument for `queryRenderedFeatures`
    if (bbox) {
      console.log(bbox)

      var features = map.queryRenderedFeatures(bbox, {
         layers: ['county','county-socio','county-housing','county-household']
      });
        // var features = map.queryRenderedFeatures(bbox, {
        //   layers: ['tract', 'county', 'tract-socio','county-socio','tract-household','county-household','tract-minority','county-minority','tract-household','county-housing',
        //   'county-hazard','county-hurricane','county-flood','county-earthquake','county-wildfire','county-tornado','county-hail']
        //
        // });
        console.log(features)
        if (features.length >= 1000) {
            return window.alert('Select a smaller number of features');
        }

        // Run through the selected features and set a filter
        // to match features with unique FIPS codes to activate
        // the `counties-highlighted` layer.
        var filter = features.reduce(function(memo, feature) {
            memo.push(feature.properties.FIPS);
            return memo;
        }, ['in', 'FIPS']);

        map.getSource('highlight').setData({
          "type": "FeatureCollection",
          "features": features
        });
        //todo update sidebar by comparing entire selection vs u.s

        // console.log(filter)
        // map.setFilter("highlight", filter);
    }

    map.dragPan.enable();
}

// add layer parameter

// TODO: https://www.mapbox.com/mapbox-gl-js/example/using-box-queryrenderedfeatures/
// check layers and setfilter function
map.on('mousemove', function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers:
      ['highlight'] });
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    // features is empty when moving around, layers highlight not saved.
    console.log(features)
    if (!features.length) {
      console.log('removing popup')

        popup.remove();
        return;
    }
    console.log(features)
    var feature = features[0];
    console.log(feature.properties.Diocese)

    popup.setLngLat(e.lngLat)
        .setText(feature.properties.Diocese)
        .addTo(map);
});

// var lastFIPS=0;
//   map.on('mousemove', function (e) {
    // var county = map.queryRenderedFeatures(e.point, {
    //    layers: ['county','county-socio','county-housing','county-household']
    // });
//     var tract = map.queryRenderedFeatures(e.point, {
//       layers: ['tract','tract-socio','tract-household','tract-housing']
//     });
//
//     if (county.length > 0 && map.getZoom() < 8.0) {
      // map.getSource('highlight').setData({
			// 	"type": "FeatureCollection",
			// 	"features": county
      // });
//       if (county[0].properties.FIPS !== lastFIPS) {
//         // console.log('Select county', county[0].properties.FIPS);
//         updateSidebar(county[0].properties);
//         lastFIPS = county[0].properties.FIPS;
//       }
//     }
//     else if (tract.length>0 && map.getZoom() >= 8.0) {
//       map.getSource('highlight').setData({
// 				"type": "FeatureCollection",
// 				"features": tract
//       });
//       if (tract[0].properties.FIPS !== lastFIPS) {
//         // console.log('Select tract', tract[0].properties.FIPS);
//         updateSidebar(tract[0].properties);
//         lastFIPS = tract[0].properties.FIPS;
//       }
//     } else {
//       map.getCanvas().style.cursor = 'default';
//     }
//   });
});
