var barwidth = 130;
var barheight = 12;
var color_range =['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'];
var width = d3.scaleLinear().domain([0, 100]).range([0, barwidth]);
var data_bins = [11, 22, 33, 44, 55, 66, 77, 88, 105];
var colorScale = d3.scaleLinear().domain(data_bins).range(color_range);

var container = d3.select('#overlay-ses');

//<img src="icons/flag.svg" onerror="this.src='icon/flag.png'" style="width:12px;height:12px;">

var layout = [
  {
    title: 'Socioeconomic Status',
    items: [
      { title: 'Below poverty', code: 'EPL_POV' },
      { title: 'Unemployed', code: 'EPL_UNEMP' },
      { title: 'Income', code: 'EPL_PCI' },
      { title: 'No High School Diploma', code: 'EPL_NOHSDP' }
    ]
  },
  {
    title: 'Household Composition',
    items: [
      { title: 'Aged 65 or Over', code: 'EPL_AGE6' },
      { title: 'Aged 17 or Younger', code: 'EPL_AGE1' },
      { title: 'Disability Aged 5+', code: 'EPL_DIS' },
      { title: 'Single-Parent Households', code: 'EPL_SNGPNT' }
    ]
  },
  {
    title: 'Minority Status/Language',
    items: [
      { title: 'Minority', code: 'EPL_MINRTY' },
      { title: 'Speaks English "Less than Well"', code: 'EPL_LIMENG' }
    ]
  },
  {
    title: 'Housing and Transportation',
    items: [
      { title: 'Multi-Unit Structures', code: 'EPL_MUNIT' },
      { title: 'Mobile Homes', code: 'EPL_MOBILE' },
      { title: 'Crowding', code: 'EPL_CROWD' },
      { title: 'No Vehicle', code: 'EPL_NOVEH' },
      { title: 'Group Quarters', code: 'EPL_GRO' }
    ]
  }
];

//function updateSidebarTitle(title) {
 // $('#overlay-title').text(title)}

function updateSidebar(options) {
  console.log(options);
  layout.forEach(function(category) {
    category.items.forEach(function(item) {
      item.value = options[item.code] || options[item.code.substring(0, 7)];
    });
  });

  d3.select('#location').text(options.LOCATIO);
  d3.select('#F_Total-bignumber').text(options.FNew);
  d3.select('#population').text(function(d) {
    return 'Population ' + d3.format(',')(options.E_TOTPO);
  });
  d3.select('#diocese').text(function(d) {
    return 'Catholic Diocese: ' + options.Diocese;
  });

  var categories = container
    .selectAll('div.category')
    .data(layout, function(d) {
      return d.title;
    });

  var categoryEnter = categories
    .enter()
    .append('div')
    .attr('class', 'category');

  categoryEnter.append('div').append('h6').text(function(category) {
    return category.title;
  });

  var items = categories.merge(categoryEnter).selectAll('div.item').data(
    function(data) {
      return data.items;
    },
    function(data) {
      return data.title;
    }
  );

  var itemEnter = items.enter().append('div').attr('class', 'item cf');

  itemEnter.append('div').attr('class', 'item-title fl w-40').text(function(category) {
    return category.title;
  });




  var img = items.selectAll('div.flag-col').data(function(data) {
    return data.value > 90 ? [data] : [];
  });

  img.exit().remove();

  img
    .enter()
    .append('div')
    .attr('class', 'flag-col fl w-10 center')
    .append('img')
    .attr('src', 'icons/flag.svg')
    .attr('width', 12)
    .style('vertical-align', 'top')
    .style('padding-left', '3px')
    .attr('height', 12);



  itemEnter.append('div').attr('class', 'item-number fl w-10');
  items = items.merge(itemEnter);

  var svg = items.selectAll('g').data(function(data) {
    return [data];
  });

  svg.selectAll(".point").remove();


  var svgEnter = svg
    .enter()
    .append('div')
    .attr('class', 'fl w-40')
    .append('svg')
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 130 8")
   // .attr('width', barwidth + 2)
    .style('vertical-align', 'top')
   // .attr('height', barheight + 2)
    .append('g')
    .attr('transform', 'translate(2, 2)');

  svgEnter
    .append('rect')
    .attr('class', 'bar-background')
    .attr('rx', 0)
    .attr('ry', 0)
    .attr('height', 10)
    .attr('width', width(100))
    .style('stroke', 'none')
    .style('fill', '#ccc');

  svgEnter
    .append('rect')
    .attr('class', 'bar')
    .attr('rx', 0)
    .attr('ry', 0)
    .attr('height', 10)
    .attr('width', 0)
    .style('fill', '#fff');



  svgEnter
    .append('svg')
    .attr('class', 'flag')
    .attr('y', 12)
    .style('fill', '#ffffff');

  svg = svg.merge(svgEnter);
  items = items.merge(itemEnter);

  svg
    .select('rect.bar')
    .transition()
    .duration(300)
    .attr('width', function(d) {
      return d.value !== undefined ?
        width(d.value) : width(1);
    })
    .style('fill', function(d) {
      return d.value !== undefined ?
        colorScale(d.value) : '#ccc';
    });

  items
    .select('div.item-number')
    .text(function(d) {
      return d.value === undefined ?
        'N/A' : d3.format('.1f')(d.value);
    });
}

updateSidebar({});
