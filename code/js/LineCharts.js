class LineCharts {
    
    constructor() {

    }



    drawPrimary(yearWiseStateData) {

        this.drawText(yearWiseStateData);
        this.drawChart(yearWiseStateData, 'CO', 1000);
        this.drawChart(yearWiseStateData, 'SO2', 2000);
        this.drawChart(yearWiseStateData, 'NO2', 3000);
        this.drawChart(yearWiseStateData, 'O3', 4000);

    }
    

    
    drawComparable(yearWiseStateData) {

        this.drawLine(yearWiseStateData, 'CO', 1000);
        this.drawLine(yearWiseStateData, 'SO2', 2000);
        this.drawLine(yearWiseStateData, 'NO2', 3000);
        this.drawLine(yearWiseStateData, 'O3', 4000);

    }



    clearCharts() {

        this.clearText();
        this.clearDropdown();
        this.clearChart('CO');
        this.clearChart('SO2');
        this.clearChart('NO2');
        this.clearChart('O3');

    }



    drawChart(data, prop, duration) {

        let chartSVG = d3.select('#chart-svg');

        //Container for the gradients
        var defs = chartSVG.append("defs");

        //Filter for the outside glow
        var filter = defs.append("filter")
            .attr("id","glow");
        filter.append("feGaussianBlur")
            .attr("stdDeviation","1.2")
            .attr("result","coloredBlur");
        var feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
            .attr("in","coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in","SourceGraphic");

        let screenWidth = screen.availWidth;

        let iScale = d3.scaleLinear().domain([0, data.length]).range([0, screenWidth/4 - 60]); 

        // let propScale = d3.scaleLinear().domain([0, d3.max(data, (d) => {if(d) return d[prop]})]).range([190,0]); 

        let yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => {if(d) return d[prop]})]).range([190, 0]);
        let xScale = d3.scaleLinear().domain([2000, 2016]).range([0, screenWidth/4 - 70]);

        let lineGenerator = d3
            .line()
            .x((d, i) => iScale(i))
            .y(d => {if(d) return yScale(d[prop])});


        let g = chartSVG.select('#'+prop+'-group');

        let axis = g.selectAll('.axis');

        axis.remove();

        
        let path = g.selectAll('path').data(data);
       
        let pathEnter = path.enter().append('path');

        path.exit().remove();

        path = path.merge(pathEnter);

        path.attr('opacity', 0);
    
        let pathA = lineGenerator(data);
            
        path.attr("d", pathA)
            .transition()
            .duration(duration)
            .attr('opacity', 1)
            .attr('class', 'path ' +prop+'-path')
            .style("filter", "url(#glow)");

        const yAxisGroup = g.append('g').classed('axis', true);

        const yAxisScale = d3.axisLeft(yScale).tickSizeOuter(0);
        const xAxisScale = d3.axisBottom(xScale).tickSizeOuter(0).tickFormat(d3.format("d"));

        yAxisGroup.call(yAxisScale);
        
        const xAxisGroup = g.append('g').classed('axis', true).attr('id', 'x-axis');
    
        xAxisGroup.attr("transform", "translate(0, 190)").call(xAxisScale);

    }


    clearChart(prop) {
        
        let chartSVG = d3.select('#chart-svg');
        let g = chartSVG.select('#'+prop+'-group');

        let path = g.selectAll('path');
        let axis = g.selectAll('.axis');

        path.remove();

        axis.remove();

    }

    drawText(yearWiseStateData) {
        this.clearText();
        let state = yearWiseStateData[0];
        if(state) state = state.state;
        let chartSVG = d3.select('#chart-svg');
        let g = chartSVG.select('#text-group');
        g.append('text').text('Here\'s how '+state+' been doing over the years!').attr('class', 'attribute-value');
        let g2 = chartSVG.select('#text-group2');
        g2.append('text').text('Compare with another state:').attr('class', 'attribute-value');
    }

    clearText() {
        let chartSVG = d3.select('#chart-svg');
        let g = chartSVG.select('#text-group');
        g.selectAll('text').remove();
        g = chartSVG.select('#text-group2');
        g.selectAll('text').remove();
    }


    clearDropdown() {
        let chartSVG = d3.select('#chart-svg');
        let g = chartSVG.select('#dropdown-group');
        g.selectAll('g').remove();
    }

    drawLine(data, prop, duration) {

        let chartSVG = d3.select('#chart-svg');

        //Container for the gradients
        var defs = chartSVG.append("defs");

        //Filter for the outside glow
        var filter = defs.append("filter")
            .attr("id","glow");
        filter.append("feGaussianBlur")
            .attr("stdDeviation","1.2")
            .attr("result","coloredBlur");
        var feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
            .attr("in","coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in","SourceGraphic");

        let screenWidth = screen.availWidth;

        let iScale = d3.scaleLinear().domain([0, data.length]).range([0, screenWidth/4 - 60]); 

        let yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => {if(d) return d[prop]})]).range([190, 0]);

        let lineGenerator = d3
            .line()
            .x((d, i) => iScale(i))
            .y(d => {if(d) return yScale(d[prop])});


        let g = chartSVG.select('#'+prop+'-group');
        
        let path = g.selectAll('#compare').data(data);
       
        let pathEnter = path.enter().append('path');

        path.exit().remove();

        path = path.merge(pathEnter);

        path.attr('opacity', 0);
    
        let pathA = lineGenerator(data);
            
        path.attr("d", pathA)
            .transition()
            .duration(duration)
            .attr('opacity', 1)
            .attr('id', 'compare')
            .attr('class', 'path compare-path');
//            .style("filter", "url(#glow)");

    }


}