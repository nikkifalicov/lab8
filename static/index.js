let svg = d3
  .select("svg#scatterplot")
  .attr("width", 500)
  .attr("height", 500)
  .style("background", "#eee");

const width = 500;
const height = 500;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const innerwidth = width - margin.left - margin.right;
const innerheight = height - margin.top - margin.bottom;

let plotg = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
let xAxisG = plotg.append("g").attr("transform", `translate(0,${innerheight})`);
let yAxisG = plotg.append("g");

let xScale, yscale;

load_and_plot("blobs.csv");
example_use_of_post();

function update_dataset(dataset, clusters){
  console.log("DATASET", dataset);
  console.log("clusters", clusters);
  load_and_plot(dataset);
}

function load_and_plot(filename) {
  d3.csv(`static/datasets/${filename}.csv`, d3.autoType).then((data) => {
    console.log("data", data);
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", 8)
      .attr("fill", "#333")
      .attr("stroke", "#eee")
      .attr("stroke-width", 1)
      .attr("cx", (d) => d.x * 20 + 50)
      .attr("cy", (d) => d.y * 20 + 250);
  });
}

// utilities
async function post(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST", // Specify the method (POST)
    headers: {
      "Content-Type": "application/json", // Tell the server you're sending JSON
    },
    body: JSON.stringify(data), // Convert JS object to JSON string
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`); // Check for errors
  }
  return await response.json(); // Parse the JSON response
}

function example_use_of_post() {
  post("your_route", {data: "aabbccc"}).then((returned_data) => {
    console.log("server says", returned_data);
  });
}
