(function(){
	
    d3.tsv("../sample-data.tsv", function(data) {
            data.forEach(function(obj) { 
                for (var key in obj) {   

                    if (obj.hasOwnProperty(key)) {  // hasOwnProperty limits to own, nonprototypical properties.
                        obj[key] = isNaN(+obj[key]) ? obj[key] : +obj[key]; // + operator converts to number unless result would be NaN
                    	if(document.querySelector("#"+key)){
                    		document.querySelector("#"+key).textContent = obj[key];
                    	}
                    }
                };
                console.log(data);
                

            });
        });
    

    // csv.selectAll('text')
    // 	.data(data)
}())