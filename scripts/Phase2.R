---
  title: "CCUSA Phase 2"
author: "Rich Carder"
date: "July 6, 2020"
---
  

library(dplyr)
library(reshape)
library(stringr)
library(tidyr)
library(lubridate)
library(RJSONIO)
library(maps)
library(rlang)
library(mapdata)
library(geosphere)
library(ggmap)
library(ggplot2)
library(tidyverse)
library(tidyselect)
library(tidycensus)
library(sf)
library(haven)
library(jsonlite)
library(geojsonio)
library(lwgeom)


options(scipen=999)

##Load Shapefiles and Eviction Data
setwd("C:/Users/rcarder/documents/dev/CCUSA Data")

#Shapefiles
counties <- st_read("SVI2018_US_COUNTY")%>%
  dplyr::select(-c(7,9:73))%>%
  dplyr::select(-c(33:51,53:59))%>%
  dplyr::select(!starts_with("SPL"))%>%
  mutate(FIPS=as.character(FIPS))%>%
  mutate(across(8:27,round,3))%>%
  mutate(across(8:27,~ .x *100))%>%
  mutate(across(8:27,~ ifelse(.x >=90,1,0),.names = "mysum{col}")) %>%
  mutate(FNew=rowSums(across(starts_with("mysumEPL"))))%>%
  dplyr::select(-c(1,2,3,4,30:49))

tracts <- st_read("SVI2018_US")%>%
  dplyr::select(-c(8,10:74))%>%
  dplyr::select(-c(34:52,54:60))%>%
  dplyr::select(!starts_with("SPL"))%>%
  mutate(FIPS=as.character(FIPS))%>%
  mutate(across(9:28,round,3))%>%
  mutate(across(9:28,~ .x *100))%>%
  mutate(across(9:28,~ ifelse(.x >=90,1,0),.names = "mysum{col}")) %>%
  mutate(FNew=rowSums(across(starts_with("mysumEPL"))))%>%
  dplyr::select(-c(1,2,3,4,5,31:50))

#Eviction, Diocese, and Hazard Data
countyEviction<-read.csv("counties.csv")%>%
  filter(year==2016)%>%
  mutate(GEOID=str_pad(GEOID, width=5, side="left", pad="0"))%>%
  dplyr::select(1,8,12,23)%>%
  mutate(RenterOccupied=ntile(pct.renter.occupied,1000)/10,
         RentBurden=ntile(rent.burden,1000)/10,
         EvictionRate=ntile(eviction.rate,1000)/10)%>%
  dplyr::select(1,5,6,7)

countyHazard<-read.csv("hazard.csv")%>%
  dplyr::select(2,6:12)%>%
  dplyr::rename("TotalHazard"=2,
                "Earthquake"=3,
                "Tornado"=4,
                "Hail"=5,
                "Hurricane"=6,
                "Flood"=7,
                "Wildfire"=8)%>%
  mutate(FIPS=str_pad(FIPS, width=5, side="left", pad="0"))

countyDiocese<-read.csv("diocese.csv")%>%
  dplyr::select(7,12)%>%
  mutate(FIPS=str_pad(FIPS, width=5, side="left", pad="0"))

tractEviction<-read.csv("tracts.csv")%>%
  filter(year==2016)%>%
  mutate(GEOID=str_pad(GEOID, width=11, side="left", pad="0"))%>%
  dplyr::select(1,8,12,23)%>%
  mutate(RenterOccupied=ntile(pct.renter.occupied,1000)/10,
         RentBurden=ntile(rent.burden,1000)/10,
         EvictionRate=ntile(eviction.rate,1000)/10)%>%
  dplyr::select(1,5,6,7)




#Join Eviction and Hazard Data to SVI County
countiesdata<-st_drop_geometry(counties)
counties
countiesdata[countiesdata==-99900]<-0
countiesdata[countiesdata==-999]<-0
CountiesMaster<-counties%>%
  dplyr::select(1)%>%
  left_join(countiesdata, by="FIPS")%>%
  left_join(countyHazard, by="FIPS")%>%
  left_join(countyEviction,by=c("FIPS"="GEOID"))%>%
  left_join(countyDiocese, by="FIPS")
CountiesMaster[is.na(CountiesMaster)]<-0

#Join Eviction Data to SVI Tract
tractdata<-st_drop_geometry(tracts)
tractdata[tractdata==-99900]<-0
tractdata[tractdata==-999]<-0
tractsMaster<-tracts%>%
  dplyr::select(1)%>%
  mutate(FIP2=str_sub(FIPS,1,5))%>%
  left_join(tractdata, by="FIPS")%>%
  left_join(tractEviction,by=c("FIPS"="GEOID"))%>%
  left_join(countyDiocese, by=c("FIP2"="FIPS"))
tractsMaster[is.na(tractsMaster)]<-0

#Convert Coordinate System to Mapbox native CRS
CountiesMaster<-st_transform(CountiesMaster, crs=3857,proj4string="+proj=longlat +datum=WGS84 +no_defs")
tractsMaster<-st_transform(tractsMaster, crs=3857,proj4string="+proj=longlat +datum=WGS84 +no_defs")

#Write Shapefiles
shp_out <- st_write(CountiesMaster, "Counties.shp")
shp_out_tract <- st_write(tractsMaster, "Tracts.shp")


