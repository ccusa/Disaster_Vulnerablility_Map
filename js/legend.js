
    console.log( "TODO!" );
    function updateLegend(id) {
      layers.forEach(function(layer) {
        if (layer[0].id === id) {
          $('.legend-block').remove()

          layer[0].paint['fill-color'].stops.forEach(function(color) {
            $('#legend').append(
              "<div class='legend-block'>
              <span class='legend-key' style='background-color': "
              + color[1] + ";> </span><span class='legend-number'>"+color[0]+
              "</span></div>"
            )

          })
        }
      })
      console.log(layer)
    }
