var heights = [42, 60, 80, 100, 160, 180, 200, 220, 280, 300, 360, 380, 400, 420, 480, 14, 150, 290, 390, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600],
	svg = d3.select('svg');

function overlay(obj){
	var count = 0;
	data_bins =  [0,.2, .4, .6, .8];
    color_range = ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'];
	colorScale2 = d3.scaleLinear()
        .domain(data_bins)
        .range(color_range);
   

	svg.selectAll('rect').remove();
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {  // hasOwnProperty limits to own, nonprototypical properties.
            obj[key] = isNaN(+obj[key]) ? obj[key] : +obj[key]; // + operator converts to number unless result would be NaN
        	if(document.querySelector("#"+key)){
        		if (key.slice(0,3) === "EPL"){
        			document.querySelector("#"+key).textContent = Math.round(obj[key] * 100) + "th*";

            		svg.append('rect')
						.attr('x', 0)
						.attr('y', function(){
							return heights[count];
						})
						.transition(10)
						.attr('width', (130 * obj[key]))
						.attr('height', "1em")
						.attr('fill', function(d){ return colorScale2(obj[key])})
						.attr('class', key)
					count++;
				} else if (key === "LOCATION"){
        			document.querySelector("#"+key).textContent = obj[key].split(",").slice(0,2).join(",");
				} else {
					document.querySelector("#"+key).textContent = obj[key];	
				}
        	}
        }
    };
}

// csv.selectAll('text')
// 	.data(data)
