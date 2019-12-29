
    /**
     * Loads in the us-pollution-data.json
     */


d3.json('https://d3js.org/us-10m.v1.json').then( usMapData => {

    let mapObj = null;
    let helperObj = null;
    let chartObj = null;

    d3.json('data/pollution_data_rolled_up.json').then( pollutionData => {

            //Create Map Object
            chartObj = new LineCharts();
            tableObj = new Table();
            
            mapObj = new Map(usMapData, pollutionData, updatePrimaryChart, updateComparableChart, clearCharts, updateTable, tableClear, drawDropdown);
            mapObj.createMap();

            //Creating all the Helper Elements
            helperObj = new HelperElements(pollutionData, updatePollutant, updateTime, updateComparableChart);

            

    })

    function updateTime(time) {
        mapObj.updateMapForTime(time);   
    }

    function updatePollutant(pollutant) {
        mapObj.updateMapForPollutant(pollutant);
    }

    function updatePrimaryChart(yearWiseStateData) {
        chartObj.drawPrimary(yearWiseStateData);
    }
       
    function updateComparableChart(stateCode) {
        let yearWiseStateData = new Array();

        for(var year = 2000; year <= 2016; year++) {
          let stateDataArray = mapObj.getYearWiseStateData(year, stateCode);
          yearWiseStateData.push(stateDataArray);

        }
        chartObj.drawComparable(yearWiseStateData);
    }

    function clearCharts() {
        chartObj.clearCharts();
    }

    function updateTable(stateDataArray){
        tableObj.drawTable(stateDataArray);
    }

    function tableClear() {
        tableObj.clearTable();
    }

    function drawDropdown(states) {
        helperObj.drawDropdown(states);
    }

});

    


    