# disaster-vulnerable-map


## Turn SVIS data into Vector Tiles

https://www.mapbox.com/help/large-data-tippecanoe/


1. Download shapefile

2. Turn shapefile into GeoJSON

```
ogr2ogr -f GeoJSON svi2014_us.geojson SVI2014_US.shp
```

3. Turn GeoJSON file into SHP file


```
tippecanoe -o svi2014_us.mbtiles svi2014_us.geojson -Z 10 -z 12
```
