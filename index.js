const data = [
    { name: "news", parent: "" },

    { name: "tech", parent: "news" },
    { name: "sport", parent: "news" },
    { name: "music", parent: "news" },

    { name: "ai", parent: "tech", amount: 7 },
    { name: "coding", parent: "tech", amount: 5 },
    { name: "tablets", parent: "tech", amount: 4 },
    { name: "laptops", parent: "tech", amount: 6 },
    { name: "d3", parent: "tech", amount: 3 },
    { name: "gaming", parent: "tech", amount: 3 },

    { name: "football", parent: "sport", amount: 6 },
    { name: "hockey", parent: "sport", amount: 3 },
    { name: "baseball", parent: "sport", amount: 5 },
    { name: "tennis", parent: "sport", amount: 6 },
    { name: "f1", parent: "sport", amount: 1 },

    { name: "house", parent: "music", amount: 3 },
    { name: "rock", parent: "music", amount: 2 },
    { name: "punk", parent: "music", amount: 5 },
    { name: "jazz", parent: "music", amount: 2 },
    { name: "pop", parent: "music", amount: 3 },
    { name: "classical", parent: "music", amount: 5 },
];

// create svg
const svg = d3
    .select(".canvas")
    .append("svg")
    .attr("width", 1060)
    .attr("height", 800);

// create a graph group
const graph = svg.append("g").attr("transform", "translate(50,50)");

// create a stratifay
const stratify = d3
    .stratify()
    .id((d) => d.name)
    .parentId((d) => d.parent);

// we use sum to determinate the value which we gonna use in pack generator (a 3d function), to determinate how big should be.
const rootNode = stratify(data).sum((d) => d.amount);

// pack generator
const pack = d3.pack().size([960, 700]).padding(5);

// console.log(pack(rootNode)); - 3d generate a r, x and y property for all of the data

// create an array of data
const bubbleData = pack(rootNode).descendants();

const color = d3.scaleOrdinal(["#d1c4e9", "#b39ddb", "#9575cd"]);

// join data anda add group for each node
const nodes = graph
    .selectAll("g")
    .data(bubbleData)
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

// append a circle to the each group
nodes
    .append("circle")
    .attr("r", (d) => d.r)
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .attr("fill", (d) => color(d.depth));

// append text to the small circle without any children
nodes
    .filter((d) => !d.children)
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "0.3em")
    .attr("fill", "white")
    .style("font-size", (d) => d.value * 5)
    .text((d) => d.data.name);
