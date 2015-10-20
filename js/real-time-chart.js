
var palette = new Rickshaw.Color.Palette( { scheme: 'spectrum2001' } );
var tv = 5000;

var graph = new Rickshaw.Graph({
    element: document.querySelector("#chart"),
    width: 700,
    height: 440,
    renderer: 'line',
    stroke: true,
    preserve: true,
    max: 140,
    series: new Rickshaw.Series.FixedDuration([{
      name: 'Occupied', color: palette.color()
    }], undefined, {
        timeInterval: tv,
        maxDataPoints: 150
    })
});


var y_ticks = new Rickshaw.Graph.Axis.Y( {
  graph: graph,
  orientation: 'left',
  element: document.getElementById('y_axis')
} );

var time = new Rickshaw.Fixtures.Time.Local();
var hours = time.unit('minuts');

var xAxis = new Rickshaw.Graph.Axis.Time({
  graph: graph,
  timeUnit: hours,
  timeFixture: new Rickshaw.Fixtures.Time.Local()
});

var legend = new Rickshaw.Graph.Legend( {
        element: document.querySelector('#legend'),
        graph: graph
} );



$('#xAxis text').css('fill', 'white');

  graph.render();


function addRandomData(chart) {

    var data = {
      Occupied: 45
    };
    console.log(data);
    chart.series.addData(data);
    graph.update();
}


