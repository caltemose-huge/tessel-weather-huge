Zepto(function ($) {
  $.getJSON('/api', function (data) {
      drawGraphs(data.records)
  })

  function drawGraphs (records) {
      var trace = {
          x: [],
          y: [],
          type: 'scatter'
      }
      for(var i=0; i<records.length; i++) {
          var record = records[i]
          trace.x.push(record.fields.date)
          trace.y.push(record.fields.farenheit)
      }
      var data = [trace]
      Plotly.newPlot('graph', data, { responsive: true })
      $("#loader").hide()
  }
})
