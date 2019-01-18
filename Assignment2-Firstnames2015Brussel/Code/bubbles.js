/*
  * BRON: 
  * https://www.youtube.com/watch?v=lPr60pexvEM
  * https://www.youtube.com/watch?v=NTS7uXOxQeM
*/
(function() {
  var width = 2000, height = 1500;
  
  var svg = d3.select("#chart").append("svg")
              .attr("height", height)
              .attr("width", width)
              .append("g")
              .attr("transform", "translate(0,0)");
  
  var forceX = d3.forceX(width/2).strength(0.05);
  var forceY = d3.forceY(height/2).strength(0.05);
  var forceCollide = d3.forceCollide(function(d){
                        return radiusScale(d.aantal)+1;
                      });
  
  var sortX = d3.forceX(function(d) {
      if(d.voornaam.startsWith('A') || d.voornaam.startsWith('H') || d.voornaam.startsWith('O') || d.voornaam.startsWith('V')){
                        return 150;
                      } else if(d.voornaam.startsWith('B') || d.voornaam.startsWith('I') || d.voornaam.startsWith('P') || d.voornaam.startsWith('W') ){
                        console.log('b');
                        return 400;
                      } else if(d.voornaam.startsWith('C') || d.voornaam.startsWith('J') || d.voornaam.startsWith('Q') || d.voornaam.startsWith('X')){
                        return 700;
                      } else if(d.voornaam.startsWith('D') || d.voornaam.startsWith('K') || d.voornaam.startsWith('R') || d.voornaam.startsWith('Y')){
                        return 1000;
                      }else if(d.voornaam.startsWith('E') || d.voornaam.startsWith('L') || d.voornaam.startsWith('S')||d.voornaam.startsWith('Z')){
                        return 1300;
                      }
                      else if(d.voornaam.startsWith('F') || d.voornaam.startsWith('M') || d.voornaam.startsWith('T')){
                        return 1600;
                      }
                  else if(d.voornaam.startsWith('G') || d.voornaam.startsWith('N') || d.voornaam.startsWith('U')){
                        return 1900;
                      }else {
                        return 1000;
                      }
    }).strength(0.07);
  
  var sortY = d3.forceY(function(d) {
      if(d.voornaam.startsWith('A') || d.voornaam.startsWith('B') || d.voornaam.startsWith('C') || d.voornaam.startsWith('D') || d.voornaam.startsWith('E') || d.voornaam.startsWith('F') || d.voornaam.startsWith('G')){
                        return 150;
                      }else if(d.voornaam.startsWith('H') || d.voornaam.startsWith('I') || d.voornaam.startsWith('J') || d.voornaam.startsWith('K') || d.voornaam.startsWith('L') || d.voornaam.startsWith('M') || d.voornaam.startsWith('N')){
                        return 450;
                      }
    else if(d.voornaam.startsWith('O') || d.voornaam.startsWith('P') || d.voornaam.startsWith('Q') || d.voornaam.startsWith('R') || d.voornaam.startsWith('S') || d.voornaam.startsWith('T') || d.voornaam.startsWith('U')){
                        return 750;
                      } else if(d.voornaam.startsWith('V') || d.voornaam.startsWith('W') || d.voornaam.startsWith('X') || d.voornaam.startsWith('Y') || d.voornaam.startsWith('Z')){
                        return 1000;
                      }
                     else {
                        return 1300;
                      }
    }).strength(0.05);
  
  var radiusScale = d3.scaleSqrt().domain([1,45]).range([5,45 ]);
  
  var simulation = d3.forceSimulation()
      .force("x", forceX)
      .force("y", forceY) //zorgen voor de centered position van alle bubbles
      .force("collide", forceCollide); //zorgt ervoor dat de bubbles elkaar niet overlappen
  
  d3.queue().defer(d3.csv, "vrouwelijke-voornamen-2015.csv").await(ready);

  
  //Teken de bubbles  
  function ready (error, datapoints){
    var circles = svg.selectAll(".bubbles")
                    .data(datapoints)
                    .enter().append("circle")
                    .attr("class", "voornaam")
                    .attr("r", function(d){
                      console.log(d.aantal);
                      return radiusScale(d.aantal);
                    })
                    .attr("fill", function(d){
                      if(d.aantal <= 5 ){
                        return "#F9C80E";
                      } else if(d.aantal > 5 && d.aantal <= 10){
                        return "#822E81";
                      } else if(d.aantal > 10 && d.aantal <= 20){
                        return "#2292A4";
                      } else if(d.aantal > 20 && d.aantal <= 30){
                        return "#C33C54";
                      }else if(d.aantal > 30){
                        return "#00B295";
                      }
                      
                    }).style("stroke", "black");
    
    d3.select("#sort").on("click", function () {
        simulation.force("x", sortX).force("y", sortY)
        .alphaTarget(0.5)
        .restart();
    });
    
    d3.select("#combine").on("click", function () {
      simulation
        .force("x", forceX)
        .force("y", forceY)
      .alphaTarget(0.5).restart();
    });
    
    simulation.nodes(datapoints).on('tick', ticked);
    
    function ticked(){
      circles
        .attr("cx", function(d){
                          return d.x;
                        })
        .attr("cy", function(d){
                        return d.y;
                      });
    }
    
  }
  


  




})();