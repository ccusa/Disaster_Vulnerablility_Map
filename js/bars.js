var barwidth = 100;
var barheight = 14;
var color_range = [
  '#ffffd9',
  '#edf8b1',
  '#c7e9b4',
  '#7fcdbb',
  '#41b6c4',
  '#1d91c0',
  '#225ea8',
  '#253494',
  '#081d58'
];
var width = d3.scaleLinear().domain([0, 1]).range([0, 70]);
var data_bins = [0.11, 0.22, 0.33, 0.44, 0.55, 0.66, 0.77, 0.88, 1];
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
      { title: 'Civilian w/ a Disability', code: 'EPL_DISABL' },
      { title: 'Single-Parent Households', code: 'EPL_SNGPNT' }
    ]
  },
  {
    title: 'Minority Status/Language',
    items: [
      { title: 'Minority', code: 'EPL_MINRTY' },
      { title: 'Speak English "Less than Well"', code: 'EPL_LIMENG' }
    ]
  },
  {
    title: 'Housing and Transportation',
    items: [
      { title: 'Multi-Unit Structures', code: 'EPL_MUNIT' },
      { title: 'Mobile Homes', code: 'EPL_MOBILE' },
      { title: 'Crowding', code: 'EPL_CROWD' },
      { title: 'No Vehicle', code: 'EPL_NOVEH' }
    ]
  }
];

function updateSidebar(options) {
  layout.forEach(function(category) {
    category.items.forEach(function(item) {
      item.value = options[item.code] || options[item.code.substring(0, 7)];
    });
  });

  d3.select('#location').text(options.LOCATIO);
  d3.select('#F_Total-bignumber').text(options.F_TOTAL);
  d3.select('#population').text(function(d) {
    return 'Population ' + d3.format(',')(options.E_TOTPO);
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

  categoryEnter.append('div').append('h4').text(function(category) {
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

  var itemEnter = items.enter().append('div').attr('class', 'item');

  itemEnter.append('div').attr('class', 'item-title').text(function(category) {
    return category.title;
  });

  items = items.merge(itemEnter);

  var img = items.selectAll('img').data(function(data) {
    return data.value > 0.9 ? [data] : [];
  });

  img.exit().remove();

  img
    .enter()
    .append('img')
    .attr('src', 'icons/flag.svg')
    .attr('width', 10)
    .style('vertical-align', 'top')
    .attr('height', 10);

  // Instead of completely omitting data when it isn't available:
  // show Not Available
  var na = items.selectAll('div.na').data(function(data) {
    return typeof data.value === 'number' ? [] : [1];
  });
  na.exit().remove();
  na
    .enter()
    .append('div')
    .style('display', 'inline-block')
    .attr('class', 'na')
    .text('Not available');

  var svg = items.selectAll('g').data(function(data) {
    // Don't show charts for N/A
    return typeof data.value === 'number' ? [data] : [];
  });

  svg.exit().remove();

  var svgEnter = svg
    .enter()
    .append('svg')
    .attr('width', barwidth)
    .style('display', 'inline-block')
    .style('vertical-align', 'top')
    .attr('height', barheight)
    .append('g');

  svgEnter
    .append('rect')
    .attr('class', 'bar')
    .attr('rx', 6)
    .attr('ry', 6)
    .attr('height', 12)
    .attr('width', 0)
    .style('fill', '#fff');

  svgEnter
    .append('text')
    .attr('class', 'bartext')
    .attr('y', 12)
    .style('fill', '#ffffff');

  svgEnter
    .append('svg')
    .attr('class', 'flag')
    .attr('y', 12)
    .style('fill', '#ffffff');

  svg = svg.merge(svgEnter);
  items = items.merge(itemEnter);

  svg
    .select('rect')
    .transition()
    .duration(200)
    .attr('width', function(d) {
      return width(d.value);
    })
    .style('fill', function(d) {
      return colorScale(d.value);
    });

  svg
    .select('text')
    .attr('x', function(d) {
      return width(d.value) + 2;
    })
    .text(function(d) {
      return d3.format('.1f')(d.value);
    });
}

updateSidebar({});
