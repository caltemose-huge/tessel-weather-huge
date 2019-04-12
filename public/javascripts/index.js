Zepto(function ($) {
  $.getJSON('/api', function (data) {
    drawGraphs(data.records)
  })

  function drawGraphs (records) {
    var trace = {
      x: [],
      y: [],
      mode: 'markers'
    }
    var totalTemp = 0
    for(var i=0; i<records.length; i++) {
      var record = records[i]
      trace.x.push(record.fields.date)
      trace.y.push(record.fields.farenheit)
      totalTemp += Number(record.fields.farenheit)
    }
    var data = [trace]
    var layout = {
      font: {
        family: "Georgia, serif",
        size: 16
      }
    }
    Plotly.newPlot('graph', data, layout, { responsive: true })
    $("#loader").hide()

    var factsHtml = '<p>Average temperature: ' + Number(totalTemp/records.length).toFixed(2) + '</p>'

    $('#facts').html(factsHtml)
  }
})
