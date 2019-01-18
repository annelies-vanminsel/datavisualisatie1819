var width = 1000;
var height = 1000;

var svg = d3.select("#chart").append("svg")
          .attr("height", height)
          .attr("width", width)
          .append("g")
          .attr("transform", "translate(" + width/2 +"," + height/2 + ")");

var radiusScale = d3.scaleSqrt().domain([1,50]).range([10,80]);


var simulation = d3.forceSimulation().velocityDecay(0.2).force("collide", d3.forceCollide(12).strength(1).iterations(100));

d3.csv("vrouwelijke-voornamen-2015.csv", function(error, datapoints){
  var circles = svg.selectAll(".bubbles")
                    .data(datapoints)
                    .enter().append("circle")
                    .attr("class", "voornaam")
                    .attr("r", function(d) {
                      
                      return radiusScale(d.aantal);
                      
                    })
                    .attr("fill", "pink").style("stroke", "black");
  
  simulation.nodes(datapoints).on('tick', ticked(circles));
  
});







function ticked(circles){
    circles
      .attr("cx", function(d){
                        return d.x;
                      })
      .attr("cy", function(d){
                      return d.y;
                    });
  }


