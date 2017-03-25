mapboxgl.accessToken = 'pk.eyJ1Ijoicm1jYXJkZXIiLCJhIjoiY2lqM2lwdHdzMDA2MHRwa25sdm44NmU5MyJ9.nQY5yF8l0eYk2jhQ1koy9g';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/rmcarder/cizru0urw00252ro740x73cea',
	zoom: 2,
	center: [-76.92, 38.9072],  //center on DC
	minZoom: 3,
	preserveDrawingBuffer: true});



	map.getCanvas().style.cursor = 'default';




//#f0f9e8
//#ccebc5
//#a8ddb5
//#7bccc4
//#4eb3d3
//#2b8cbe
//#08589e