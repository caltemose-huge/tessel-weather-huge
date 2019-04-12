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
    var record
    for(var i=0; i<records.length; i++) {
      record = records[i]
      totalTemp += Number(record.fields.farenheit)
    }
    var avg = Number(totalTemp/records.length).toFixed(2)
    for(var i=0; i<records.length; i++) {
      record = records[i]
      if (Math.abs(avg - record.fields.farenheit) < 20) {
        trace.x.push(record.fields.date)
        trace.y.push(record.fields.farenheit)
      }
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
