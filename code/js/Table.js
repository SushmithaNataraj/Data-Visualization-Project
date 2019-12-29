class Table{
    constructor(){

        this.tableHeaders = ["State", "Carbon Monoxide", "Nitrogen Dioxide", "Ozone", "Sulphur Dioxide"];

        this.tableElements = null;

        this.cell = {
            "width": 100,
            "height": 15,
            "buffer": 15
        };

        this.stateFlag = true;
        this.coFlag = false;
        this.no2Flag = false;
        this.ozoneFlag = false;
        this.so2Flag = false;

        this.width = screen.availWidth/2 - 50;
        this.height = this.width-200;
    }

    drawTable(stateDataArray){

        this.tableElements = stateDataArray.filter(function(el){
            return el != null;
        });

        let that = this;
        that.updateTable();

    }
    sortState(){
        let that = this;
        this.tableElements.sort(function(a,b){
            if(that.stateFlag) return d3.ascending(a.state, b.state);
            return d3.descending(a.state, b.state);
        })
        that.stateFlag = !that.stateFlag;
        that.clearTable();
        that.updateTable();
    }

    sortCo(){
        let that = this;
        this.tableElements.sort(function(a,b){
            if(that.coFlag) return d3.ascending(a["CO"], b["CO"]);
            return d3.descending(a["CO"], b["CO"]);
        })
        that.coFlag = !that.coFlag;
        that.clearTable();
        that.updateTable();
    }

    sortNo2(){
        let that = this;
        this.tableElements.sort(function(a,b){
            if(that.no2Flag) return d3.ascending(a["NO2"], b["NO2"]);
            return d3.descending(a["NO2"], b["NO2"]);
        })
        that.no2Flag = !that.no2Flag;
        that.clearTable();
        that.updateTable();
    }

    sortSo2(){
        let that = this;
        this.tableElements.sort(function(a,b){
            if(that.so2Flag) return d3.ascending(a["SO2"], b["SO2"]);
            return d3.descending(a["SO2"], b["SO2"]);
        })
        that.so2Flag = !that.so2Flag;
        that.clearTable();
        that.updateTable();
    }
    sortOzone(){
        let that = this;
        this.tableElements.sort(function(a,b){
            if(that.ozoneFlag) return d3.ascending(a["O3"], b["O3"]);
            return d3.descending(a["O3"], b["O3"]);
        })
        that.ozoneFlag = !that.ozoneFlag;
        that.clearTable();
        that.updateTable();
    }

    updateTable() {
        let that = this;

        //Making the table layout
        let tableLayout = d3.select("#info").select("svg")
            .append("foreignObject")
            .attr("id","fObj")
            .attr("width", this.width)
            .attr("height", 2*this.height)
            .append("xhtml:table")
            .attr("class", "custom-table");

        //Making the table header row
        let tableHeader = tableLayout.append('thead')
        
        tableHeader.append('tr')
            .selectAll('th')
            .data(this.tableHeaders).enter()
            .append('th')
            .attr("width",this.cell.width)
            .attr("height",this.cell.height/2)
            .text(function(d){return d})
            .attr("id",function(d){return d})
        
        tableHeader.append("tr")
            .selectAll('th')
            .data(this.tableHeaders).enter()
            .append('th')
            .attr("width",this.cell.width)
            .attr("height",this.cell.height);

        //Making the other table rows
        let table = tableLayout.append('tbody')
                        .attr("id","tableBody")
                        .selectAll("tr")
                        .data(this.tableElements)

        let tableRows = table.enter()
                            .append('tr')

        table.exit().remove()
        table = tableRows.merge(table)

        //Populating the table rows
        let row_tds = table.selectAll("td").data(function(d){

            let rows = [

                {vis: 'state', value:[d.state]}, 
                {vis: 'co', value:[d.CO.toFixed(2)]},
                {vis: 'no2', value:[d.NO2.toFixed(2)]},
                {vis: 'o3', value:[d.O3.toFixed(2)]},
                {vis: 'so2', value:[d.SO2.toFixed(2)]},
            ]
            return rows

        })
        
        let row_tds_enter = row_tds.enter()
                                    .append("td")
                                    .attr("width",this.cell.width)
                                    .attr("height",this.cell.height)

                                                            
        row_tds.exit().remove()

        row_tds = row_tds.merge(row_tds_enter)


        //Handling the State Column
                let stateColumn = row_tds.filter((d) => {return d.vis == 'state'})

                let svgStateColumn = stateColumn.selectAll("svg").data(function(d){return d3.select(this).data()})

                let svgStateColumn_enter = svgStateColumn.enter() 
                                                            .append('svg')
                                                            .attr('width', this.cell.width)
                                                            .attr('height', this.cell.height)

                svgStateColumn.exit().remove() 

                svgStateColumn = svgStateColumn.merge(svgStateColumn_enter)

                // Adding text to State Column
                let stateText = svgStateColumn.selectAll('text').data(d =>(d.value)) // Add text to selection ##################

                let stateText_enter = stateText.enter() // Text Enter ##################
                                                .append('text')
                                                .attr("x",5) // giving a bit buffer gap between the line and the text in the table ##################
                                                .attr("y",this.cell.height/2) // center of the cell ##################
                                                .attr("transform", "translate(0,4)")
                                                .style("fill", "#EEEEEE");                                
                                
                stateText.exit().remove() // Exit Text ##################

                stateText = stateText.merge(stateText_enter) // Merge Text ##################

                stateText.text(d => d) // Display Text ##################
                        .attr("id","stateText")



        //Handling the CO Column
                let coColumn = row_tds.filter((d) => {return d.vis == 'co'})

                let svgcoColumn = coColumn.selectAll("svg").data(function(d){return d3.select(this).data()})

                let svgcoColumn_enter = svgcoColumn.enter() 
                                                            .append('svg')
                                                            .attr('width', this.cell.width)
                                                            .attr('height', this.cell.height)

                svgcoColumn.exit().remove() 

                svgcoColumn = svgcoColumn.merge(svgcoColumn_enter)

                // Adding text to CO Column
                let coText = svgcoColumn.selectAll('text').data(d =>(d.value)) // Add text to selection ##################

                let coText_enter = coText.enter() // Text Enter ##################
                                                .append('text')
                                                .attr("x",this.cell.width/2 - 20) // giving a bit buffer gap between the line and the text in the table ##################
                                                .attr("y",this.cell.height/2) // center of the cell ##################
                                                .attr("transform", "translate(0,4)")
                                                .style("fill", "#EEEEEE");                                
                coText.exit().remove() // Exit Text ##################

                coText = coText.merge(coText_enter) // Merge Text ##################

                coText.text(d => d) // Display Text ##################
                        .attr("id","coText")


        //Handling the NO2 Column
                let no2Column = row_tds.filter((d) => {return d.vis == 'no2'})

                let svgno2Column = no2Column.selectAll("svg").data(function(d){return d3.select(this).data()})

                let svgno2Column_enter = svgno2Column.enter() 
                                                            .append('svg')
                                                            .attr('width', this.cell.width)
                                                            .attr('height', this.cell.height)

                svgno2Column.exit().remove() 

                svgno2Column = svgno2Column.merge(svgno2Column_enter)

                // Adding text to NO2 Column
                let no2Text = svgno2Column.selectAll('text').data(d =>(d.value)) // Add text to selection ##################

                let no2Text_enter = no2Text.enter() // Text Enter ##################
                                                .append('text')
                                                .attr("x",this.cell.width/2 - 20) // giving a bit buffer gap between the line and the text in the table ##################
                                                .attr("y",this.cell.height/2) // center of the cell ##################
                                                .attr("transform", "translate(0,4)")
                                                .style("fill", "#EEEEEE");                                
                                
                no2Text.exit().remove() // Exit Text ##################

                no2Text = no2Text.merge(no2Text_enter) // Merge Text ##################

                no2Text.text(d => d) // Display Text ##################
                        .attr("id","no2Text")


        //Handling the O3 Column
                let o3Column = row_tds.filter((d) => {return d.vis == 'o3'})

                let svgo3Column = o3Column.selectAll("svg").data(function(d){return d3.select(this).data()})

                let svgo3Column_enter = svgo3Column.enter() 
                                                            .append('svg')
                                                            .attr('width', this.cell.width)
                                                            .attr('height', this.cell.height)

                svgo3Column.exit().remove() 

                svgo3Column = svgo3Column.merge(svgo3Column_enter)

                // Adding text to O3 Column
                let o3Text = svgo3Column.selectAll('text').data(d =>(d.value)) // Add text to selection ##################

                let o3Text_enter = o3Text.enter() // Text Enter ##################
                                                .append('text')
                                                .attr("x",this.cell.width/2 - 20) // giving a bit buffer gap between the line and the text in the table ##################
                                                .attr("y",this.cell.height/2) // center of the cell ##################
                                                .attr("transform", "translate(0,4)")
                                                .style("fill", "#EEEEEE");                                
                                
                o3Text.exit().remove() // Exit Text ##################

                o3Text = o3Text.merge(o3Text_enter) // Merge Text ##################

                o3Text.text(d => d) // Display Text ##################
                        .attr("id","coText")


        //Handling the so2 Column
                let so2Column = row_tds.filter((d) => {return d.vis == 'so2'})

                let svgso2Column = so2Column.selectAll("svg").data(function(d){return d3.select(this).data()})

                let svgso2Column_enter = svgso2Column.enter() 
                                                            .append('svg')
                                                            .attr('width', this.cell.width)
                                                            .attr('height', this.cell.height)

                svgso2Column.exit().remove() 

                svgso2Column = svgso2Column.merge(svgso2Column_enter)

                // Adding text to O3 Column
                let so2Text = svgso2Column.selectAll('text').data(d =>(d.value)) // Add text to selection ##################

                let so2Text_enter = so2Text.enter() // Text Enter ##################
                                                .append('text')
                                                .attr("x",this.cell.width/2 - 20) // giving a bit buffer gap between the line and the text in the table ##################
                                                .attr("y",this.cell.height/2) // center of the cell ##################
                                                .attr("transform", "translate(0,4)")
                                                .style("fill", "#EEEEEE");                                
                                
                so2Text.exit().remove() // Exit Text ##################

                so2Text = so2Text.merge(so2Text_enter) // Merge Text ##################

                so2Text.text(d => d) // Display Text ##################
                        .attr("id","coText")
            

        d3.select("#State").on("click",function(){that.sortState();});
        d3.select("#Carbon\\ Monoxide").on("click",function(){that.sortCo();});
        d3.select("#Sulphur\\ Dioxide").on("click",function(){that.sortSo2();});
        d3.select("#Nitrogen\\ Dioxide").on("click",function(){that.sortNo2();});
        d3.select("#Ozone").on("click",function(){that.sortOzone();});



    }

    clearTable(){

        //code to clear the table
        console.log('table disappear')

        d3.select("#fObj").remove()


    }

}