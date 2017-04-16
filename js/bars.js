var options={

};
var barwidth=100
var barheight=14

function Bar(el,prop,y) {
  Bar.options={};
  console.log(prop)
  var bar = this;
  Bar.prop=prop;
  console.log(Bar.options);

  width = d3.scaleLinear()
    .domain([0,1])
    .range([0,100]);

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
  bar.bar=bar.svg
    .append('g')
    .append('rect')
    .attr('class','bar')
    .attr('height',14)
    .attr('width',20);
  //bar.bar
    //.append('text')
    //.text(whatttttt);

    //.attr('x', function (d) { return chart.x(d.lon)-2; })


}
    // data merge:
Bar.prototype = {
  update: function () {
    var bar = this;
    console.log(options[Bar.prop], options.EPL_AGE17);
// Interrupt ongoing transitions:

d3.selectAll('rect')
      .transition(50)
      .attr("width",function(d) {return width(options[Bar.prop])})//x.bandwidth())
      .style('fill',function(d) {return colorScale(options[Bar.prop])});
      //function (d) { return chart.colorScale2(d[app.options.yvar])

}}

new Bar('#overlay-data', 'EPL_AGE17',42),
new Bar('#overlay-data', 'EPL_AGE17',60),
new Bar('#overlay-data', 'EPL_AGE17',80),
new Bar('#overlay-data', 'EPL_MINRTY',100),
new Bar('#overlay-data', 'EPL_AGE17',160),
new Bar('#overlay-data', 'EPL_AGE17',180),
new Bar('#overlay-data', 'EPL_AGE17',200),
new Bar('#overlay-data', 'EPL_AGE17',220),
new Bar('#overlay-data', 'EPL_AGE17',240)
