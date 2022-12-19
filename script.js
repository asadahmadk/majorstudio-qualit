/*global d3*/
var data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

var svg = d3.select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = Math.min(width, height) / 2,
    viewbox = svg.attr("viewBox", '100, -225, 1050,1350'),

    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var colorFirstRing = d3.scaleOrdinal(['#e5243b',
    '#DDA63A',
    '#4C9F38',
    '#C5192D',
    '#FF3A21',
    '#26BDE2',
    '#FCC30B',
    '#A21942',
    '#FD6925',
    '#DD1367',
    '#FD9D24',
    '#BF8B2E',
    '#3F7E44',
    '#0A97D9',
    '#56C02B',
    '#00689D',
    '#19486A']);

var colorSecondRing = d3.scaleOrdinal(['#e5243b',
    '#DDA63A',
    '#4C9F38',
    '#C5192D',
    '#FF3A21',
    '#26BDE2',
    '#FCC30B',
    '#A21942',
    '#FFFFFF',
    '#DD1367',
    '#FD9D24',
    '#BF8B2E',
    '#3F7E44',
    '#0A97D9',
    '#56C02B',
    '#FFFFFF',
    '#FFFFFF00']);
var colorThirdRing = d3.scaleOrdinal(['#FFFFFF00',
    '#FFFFFF',
    '#4C9F38',
    '#C5192D',
    '#FFFFFF',
    '#FFFFFF',
    '#FFFFFF',
    '#A21942',
    '#FFFFFF',
    '#FFFFFF',
    '#FD9D24',
    '#BF8B2E',
    '#FFFFFF',
    '#FFFFFF',
    '#FFFFFF',
    '#FFFFFF',
    '#FFFFFF00']);
// Generate the pie
var pie = d3.pie();

// Generate the arcs
var arc = d3.arc()
    .innerRadius(150)
    .outerRadius(280);

//Generate groups
var arcs = g.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc")

//Draw arc paths
arcs.append("path")
    .attr("fill", function (d, i) {
        return colorFirstRing(i);
    })
    .attr("d", arc);

// Generate the second pie
// Generate the arcs
var arc = d3.arc()
    .innerRadius(285)
    .outerRadius(415);

//Generate groups
var arcs = g.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc")

//Draw arc paths
arcs.append("path")
    .attr("fill", function (d, i) {
        return colorSecondRing(i);
    })
    .attr("d", arc);

// Generate the third  pie
// Generate the arcs
var arc = d3.arc()
    .innerRadius(420)
    .outerRadius(710);

//Generate groups
var arcs = g.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc")

//Draw arc paths
arcs.append("path")
    .attr("fill", function (d, i) {
        return colorThirdRing(i);
    })
    .attr("d", arc);


const tooltip = d3.select("#tooltip");

function onMouseEnter(event, datum) {
    const classy = d3.select(this).attr("g");
    //console.log(event);}

    //console.log(this);
    //Find same classed items
    d3.selectAll(`.${classy}`)
        .style("stroke", "white")
    //.style("stroke-width", "2"); j

    //Return all items' data and write into html tables
    let table = [];
    let values = [];
    let html = "";
    for (let d of g) {
        if (d[0] === datum.g) {
            for (let d1 of d[1]) {
                table.push(d1.svg);
                values.push(d1.value);
                html += `
              </tr><tr><td>${d1.svg}</td><td>${d1.value}%</td></tr>`;
            }
        }
    }
    console.log(html);

    tooltip
        .select("#tooltip-goal")
        .text(datum.g)
        .style("font-weight", "700")
        .style("color", datum.Color);

    tooltip
        .select("#tooltip-g")
        .html(
            `<table><tr>
            <th>Region</th>
            <th>Score</th>
            </tr>${html}</table>`
        )
        .style("font-weight", "700");
    // .style("font-size", "16px");

    //Format tooltip position
    const x = event.pageX;
    const y = event.pageY;

    // console.log(event.pageX);
    tooltip.style(
        "transform",

        `translate(` + `calc(-6% + ${x}px),` + `calc(10% + ${y}px)` + `)`
    );

    tooltip.style("opacity", 1);
}

function onMouseLeave(event) {
    //remove tooltip
    const classy = d3.select(this).attr("class");
    d3.selectAll(`.${classy}`).style("stroke", "none");
    tooltip.style("opacity", 0);
}
/*
        //select highlighted id
        const highlighted = d3.selectAll(
          `#${this.id
            .replace(/[^\w\s\']|_/g, "")
            // .split(" ")
            .join("")}`
        );
        //set highlighted style and class
        highlighted
          .attr("class", "highlight")
          .style("stroke", "white")
          .style("stroke-width", "2");
        //remove highlighted style
        setTimeout(function () {
          d3.selectAll(".highlight").style("stroke", "none");
        }, 3000);
    */