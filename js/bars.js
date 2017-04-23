var barwidth=100
var barheight=14

function Bar(el,prop,y) {
  var bar = this;
  this.prop=prop;

  width = d3.scaleLinear()
    .domain([0,1])
    .range([0,70]);

  data_bins =  [.11, .22, .33,.44,.55,.66,.77,.88,1];
    color_range = ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'];
    colorScale = d3.scaleLinear()
        .domain(data_bins)
        .range(color_range);

  bar.svg = d3.select(el)
    .append('svg')
    .attr('x',0)
    .attr('y',y)
    .attr('width', barwidth)
    .attr('height', barheight)
  bar.svg
    .append('g');
  bar.svg
    .append('rect')
    .attr('class','bar')
    .attr('rx',5)
      .attr('ry',5)
    .attr('id',this.prop)
    .attr('height',14)
    .attr('width',0)
    .style('fill','#fff');
  bar.svg
    .append('text')
    .attr('class','bartext')
    .attr('id',this.prop+'text')
    .attr('y',12)
    .text(Bar.prop)
    .style('fill','#ffffff');
  bar.svg
    .append('div')
    .attr('class','flag')
    .attr('id',this.prop+'flag')
    .attr('y',12)
    .html('naaooooo')
    .style('fill','#ffffff');
}

Bar.prototype.update = function (options) {
  var self = this;

  d3.select('#'+this.prop)
        .transition(5000)
        .attr("width",function(d) { return width(options[self.prop])})//x.bandwidth())
        .style('fill',function(d) {return colorScale(options[self.prop])});

  d3.select('#'+this.prop+'text')
        .transition(5000)
        .attr("x",function(d) {
          return width(options[self.prop])+2
        })//x.bandwidth())
        .text(function(d) {return d3.format(".1f")(options[self.prop]*100)});
  if(options[self.prop]>.9){
    d3.select('#'+this.prop+'flag')
     .transition(5000)
        .attr("x",function(d) {
          return width(options[self.prop])+6
        })//x.bandwidth())
        .html('naaoooo');
}}

var bars = [
  new Bar('#overlay-data', 'EPL_POV',42),
  new Bar('#overlay-data', 'EPL_UNEMP',60),
  new Bar('#overlay-data', 'EPL_PCI',80),
  new Bar('#overlay-data', 'EPL_NOHSDP',100),
  new Bar('#overlay-data', 'EPL_AGE65',160),
  new Bar('#overlay-data', 'EPL_AGE17',180),
  new Bar('#overlay-data', 'EPL_DISABL',200),
  new Bar('#overlay-data', 'EPL_SNGPNT',220),
  new Bar('#overlay-data', 'EPL_MINRTY',280),
  new Bar('#overlay-data', 'EPL_LIMENG',300),
  new Bar('#overlay-data', 'EPL_MUNIT',360),
  new Bar('#overlay-data', 'EPL_MOBILE',380),
  new Bar('#overlay-data', 'EPL_CROWD',400),
  new Bar('#overlay-data', 'EPL_NOVEH',420)
];

function updateBars(options) {
  bars.forEach(function(bar) {
    bar.update(options);
  })
}

function updateText(options){
  d3.select('#location')
    .select("text").remove();

 d3.select('#location')
    .append('text')
    .text(options.LOCATION);

d3.select('#population')
    .select("text").remove();

 d3.select('#population')
    .append('text')
    .text(d3.format(",")(options.E_TOTPOP));

}