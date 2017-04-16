var options={
  
};
var barwidth=100
var barheight=14

function Bar(el,prop,y) {
  Bar.options={};
  var bar = this;
  Bar.prop=prop;

  width = d3.scaleLinear()
    .domain([0,1])
    .range([0,70]);

  data_bins =  [0,.2, .4, .6, .8];
    color_range = ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'];
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
    .append('g')
    .attr('class','bar')
  bar.svg
    .append('rect')
    .attr('height',14)
    .attr('width',20);
bar.svg
  .append('text')
  .attr('y',14)
  .text(Bar.prop);

    //.attr('x', function (d) { return chart.x(d.lon)-2; })


}
    // data merge:
Bar.prototype = {
  update: function (prop) {
    var bar = this;
    console.log(options[Bar.prop]);
// Interrupt ongoing transitions:

d3.selectAll('rect')
      .transition(50)
      .attr("width",function(d) {return width(options[Bar.prop])})//x.bandwidth())
      .style('fill',function(d) {return colorScale(options[Bar.prop])});

d3.selectAll('text')
      .transition(50)
      .attr("x",function(d) {return width(options[Bar.prop])+2})//x.bandwidth())
      .text(function(d) {return d3.format(".1f")(options[Bar.prop]*100)});
      //function (d) { return chart.colorScale2(d[app.options.yvar])

}}

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


//var heights = [42, 60, 80, 100, 160, 180, 200, 220, 280, 300, 360, 380, 400, 420, 480, 14, 150, 290, 390, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600],