// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top:20,
    right:40,
    bottom:60,
    left:50

};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper and append an SVG grouo that will hold our chart
// and shift the latter by left and top margin

var svg = d3.select("#scatter")
.append("svg")
.attr("width",svgWidth)
.attr("height",svgHeight);

var chartGroup = svg.append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

// Import Data
d3.csv("./assets/data/data.csv").then(function(stateData){
    console.log(stateData);

    // Step:1 Parse Data/Cast as numbers
    //var povertyMax 
    //var healthMax 
    stateData.forEach(function(data){

        //povertyMax = d3.max([povertyMax,data.poverty])
        //healthMax = d3.max([healthMax,data.healthcare])    
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;

    });
    
    // Step:2 Create Scale functions
    //console.log(povertyMax);
    //console.log(healthMax);
    var xLinearScale = d3.scaleLinear()         
        .domain([8.5,d3.max(stateData,d=>d.poverty)])
        .range([0,width]);

    var yLinearScale = d3.scaleLinear()
        .domain([4,d3.max(stateData,d=>d.healthcare)])
        .range([height,0]);

    // Step:3 Create axis function
    //=============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append axes to the chart
    
    //=========================
    chartGroup.append("g")
        .attr("transform",`translate(0, ${height})`)
        .call(bottomAxis);
        

    chartGroup.append("g")
        .call(leftAxis);

    // Step:5 Create Circles
    chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx",d=>xLinearScale(d.poverty))
        .attr("cy",d=>yLinearScale(d.healthcare))
        .attr("r","15")
        .attr("fill","skyblue")
        .attr("text",d=>d.abbr)
        .attr("opacity",".5")

    // Add state labels to the points
    var circleLabels = chartGroup.selectAll(null).data(stateData).enter().append("text");
    circleLabels
        .attr("x",function(d){return xLinearScale(d.poverty);})
        .attr("y",function(d){return yLinearScale(d.healthcare);})
        .text(function(d){return d.abbr;})
        .attr("text-anchor","middle")
        .attr("font-size","10px")
        .attr("fill","white");

    // Create axes labels
    chartGroup.append("text")
        .attr("transform","rotate(-90)")
        .attr("y",0 - margin.left + 5)
        .attr("x",0- (height / 1.5))
        .attr("dy","1em")
        .attr("class","axisText")
        .text("Lacks Healthcare(%)");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class","axisText")
        .style("text-anchor","middle")
        .text("In Poverty(%)");

}).catch(function(error){
    console.log(error);
});



    
