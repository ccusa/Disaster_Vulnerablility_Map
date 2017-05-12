
    function updateLegend(id) {
      layers.forEach(function(layer) {
        if (layer[0].id === id) {
          $('.legend-block').remove()

          let stopLength = layer[0].paint['fill-color'].stops.length - 1

          layer[0].paint['fill-color'].stops.forEach(function(stop, idx) {
            let number = stop[0];
            let color = stop[1];

            if (idx == stopLength ) {
              number = stop[0] + '+'
              maxLayer = true;
            }

            let div = "<div class='legend-block'><span class='legend-key' style='background-color: "
                + color + "';> </span><span class='legend-number'>"+number+
                "</span></div>"

            $('#legend').append(div)

          })
        }
      })
    }
