function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}
// Deliverable 1: Create a Horizontal Bar Chart
// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sampleData = data.samples;
    // console.log(samples)
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = sampleData.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    // var yticks = otu_ids.slice(0,10).map(otu_ids).reverse();
    // var yticks = otu_ids.slice(0,10);
    // var sorted = yticks.map(yticks => yticks.reverse());
    // var yticks = otu_ids.slice(0, 10).map(otu_ids => `OTU ${otu_ids}`).reverse();
    // var yticks = sample_values.slice(0,10);
    var yticks = otu_ids.map(ID => ID).slice(0,10).reverse();
    // 8. Create the trace for the bar chart. 
    // var barData = [
    //   {
    //     x: sample_values.slice(0,10).reverse(),
    //     y: yticks,
    //     text: otu_labels.slice(0,10).reverse(),
    //     type: "bar"
    //   }
      
    // ];
    var xticks = sample_values.slice(0,10).reverse();
    var labels = otu_labels.slice(0,10).reverse();
    var barData = [
      {
        x: xticks,
        y: yticks,
        type: "bar",
        orientation: "h",
        text: labels
      }
    ];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Belly Button Top 10 Cultures Found Data",
     
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', barData, barLayout);
  // });
// }

// Deliverable 2: Creat a Bubble Chart
// Bar and Bubble charts
// Create the buildCharts function.
//  function buildCharts(sample) {
//   // Use d3.json to load and retrieve the samples.json file 
//   d3.json("samples.json").then((data) => {
//     // var metadata = data.metadata;
//     // Create a variable that holds the samples array. 
//     var samples = data.samples;
//     console.log(samples)
//     // Create a variable that filters the samples for the object with the desired sample number.
//     var filtersamples = samples.filter(sampleObj => sampleObj.id == sample);
//     // Create a variable that holds the first sample in the array.

//     var result = filtersamples[0];
//     // Create variables that hold the otu_ids, otu_labels, and sample_values.
//     var otu_ids = result.otu_ids;
//     var otu_labels = result.otu_labels;
//     var sample_values = result.sample_values;

    // Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    // so the otu_ids with the most bacteria are last. 

    // var yticks = 
    // var yticks = otu_ids.slice(0,10).map(otu_ids).reverse();
    // // Create the trace for the bar chart. 
    // var barData = [
    
      
    // ];
    // Create the layout for the bar chart. 
    // var barLayout = {
     
    // };
    // // Use Plotly to plot the data with the layout. 

    // 1. Create the trace for the bubble chart.
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        hovertext: [otu_ids, labels],
        mode:  `markers`,
        marker: {
          color: otu_ids,
          size: sample_values,
          colorscale: 'Blackbody'
          },
      }
   
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Number of Bacteria Cultures per Sample",
        xaxis: sample_values,
        text: labels,
        hovermode: "Closest",
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
  //  });
//  }

// Deliverable 3: Create a Gauge Chart
// // Create the buildChart function.
//  function buildCharts(sample) {
//   // Use d3.json to load the samples.json file 
//    d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    console.log("float value" +parseFloat(result.wfreq));
//      console.log(data);

    // Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.

    // Create a variable that holds the first sample in the array.
  

    // 2. Create a variable that holds the first sample in the metadata array.
    

    // Create variables that hold the otu_ids, otu_labels, and sample_values.


    // 3. Create a variable that holds the washing frequency.
   

    // Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    // var yticks = 

    // Create the trace for the bar chart. 
    // var barData = [
      
    // ];
    // Create the layout for the bar chart. 
    // var barLayout = {
      
    // };

    // Use Plotly to plot the data with the layout. 

    // Create the trace for the bubble chart.
    // var bubbleData = [
   
    // ];

    // Create the layout for the bubble chart.
    // var bubbleLayout = {
      
    // };

    // D2: 3. Use Plotly to plot the data with the layout.
   
    
    // 4. Create the trace for the gauge chart.
    // var wfreq = data.wfreq
    var gaugeData = [
      {
        domain: {x: [0,1], y: [0,1]},
        // value: wfreq,
        value: parseFloat(result.wfreq),
        type: "indicator",
        mode: "gauge+number",
        title: { text: "Belly Button Cleaning Frequency"},
        gauge: {
          axis: { range: [null, 10]},
          bar: { color: "red"},
          steps: [
            { range: [0,2], color: "black"},
            { range: [2,4], color: "green"},
            { range: [4,6], color: "yellowgreen"},
            { range: [6,8], color: "yellow"},
            { range: [8,10], color: "lightblue"},
          ],
          pointer: {
            length: 0.5,
            strokewidth: 0.1,
            color: '#000000'
          },
        }
      }
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     font: {
       color: '#000000'
     },
     width: 500,
     height: 500,
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
   });
 }
