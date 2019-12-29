class dropDown {
    constructor(label, value){
        this.label = label
        this.value = value
    }
}

class HelperElements {

/**
 * This class draws all the helper
 * elements needed by the NYSM interface.
 * List of helper elements:
 * 1. Time Slider.
 * 2. Time Period Toggle.
 * 3. State Dropdown.
 * 4. Info Box.
 */
    constructor(pollutionData, updatePollutant, updateTime, updateComparableChart) {
        
        // // Making a list of options for drop down
        // this.pollutantList = ["Carbon Monoxide", "Sulphur Dioxide","Nitrous Oxide","Ozone"]
        
        //Making Pollution Data a class variable
        this.pollutionData = pollutionData;

        this.updatePollutant = updatePollutant;

        this.updateTime = updateTime;

        this.currentyear = 2004;

        this.updateComparableChart = updateComparableChart;

        // Calling Helper Methods
        this.drawTimeSlider();
    //  this.drawToggle();
        this.addButtonListeners();

        this.stopValue = false;

    }
    

    addButtonListeners() {
        let that = this;
        d3.select('#coButton').on("click", () => this.updatePollutant("Carbon Monoxide"));
        d3.select('#soButton').on("click", () => this.updatePollutant("Sulphur Dioxide"));
        d3.select('#noButton').on("click", () => this.updatePollutant("Nitrous Oxide"));
        d3.select('#o3Button').on("click", () => this.updatePollutant("Ozone"));
        d3.select('#playButton').on("click", function(){
            return that.play();
        })
        d3.select('#stopButton').on("click", function(){
            return that.stop();
        })
    }

    play(){
        let that = this;
        
        // console.log("Play button clicked");

        d3.select('#info-svg').selectAll("text").remove();

        let i = this.currentyear;
        let j = 2017;
        function f() {

            // console.log('i',i)
            
            if(that.stopValue == true){
                that.stopValue = false;
                return
            }

            that.clearSlider();
            that.currentyear = i;
            that.drawTimeSlider();
            that.updateTime(i);
            i++;
            if( i < j ){
                setTimeout( f, 1000 );
            }
        }
        f();
        that.stopValue = false;
    }

    stop(){
        this.stopValue = true;
    }


    /**
     * draws the time slider and
     * throws related events.
     */
    drawTimeSlider() {

        let that = this;

        // Making a scale for slider
        let timeScale = d3.scaleLinear().domain([2000, 2016]).range([30, 730]); 

        d3.select("#SliderView")
            .append('div').classed('slider-wrap', true)
            .append('input').classed('slider', true)
            .attr('type', 'range')
            .attr('min', 2000)
            .attr('max', 2016)
            .attr('value', this.currentyear)
            .attr('id', 'time-slider')
            .style('width', '730px');

        let sliderLabel = d3.select('.slider-wrap')
            .append('div').classed('slider-label', true)
            .append('svg');

        let sliderText = sliderLabel.append('text').text(this.currentyear);

        sliderText.attr('x', timeScale(this.currentyear));
        sliderText.attr('y', 25);

        let timeSlider = d3.select('#time-slider');

        timeSlider.on('input', function() {
            let time = this.value;
            that.currentyear = parseInt(time);
            d3.select('#info-svg').selectAll("text").remove();
            that.updateTime(time);
            
            //Changing the year label under the slider
            let new_active_year = timeSlider.node().value
            this.currentyear = new_active_year
            sliderText.html(new_active_year)
            sliderText.attr('x',timeScale(this.currentyear));
        });
    }

    clearSlider(){
        d3.select("#SliderView").select(".slider-wrap").remove()
    }

    /**
     * draws the time period toggle 
     * and throws related events.
     */
    drawToggle() {
        let svgBtn = d3.select('#buttons').append("div").classed('toggle-btn', true);

        // Toggle Button
        svgBtn.append('span').text("MONTH  ");

        
        svgBtn.append('span').append("label")
            .attr("id", "labelID")
            .attr("class", "switch")
            .append("input")
            .attr("type", "checkbox")
            .attr("id", "toggleSwitch")

        d3.select("#labelID").append("span")
            .attr("class", "tBtnSlider round")


        svgBtn.append("span").text("   YEAR")
    }

    /*
     * draws the dropdown for 
     * pollutants and throws related events.
     */
    drawDropdown(states) {

        let members = new Array();
        let len = states.length

        for(var opt = 0; opt < len-1; opt++) {
            var stateName = states[opt].state
            var obj = states[opt]
            let option = new dropDown(stateName, obj)
            members.push(option);  
          }

        let svg = d3.select("#dropdown-group")
                
        // select.append("rect")
        //     .attr("x", 10)
        //     .attr("y",  10 )
        //     .attr("width", 300)
        //     .attr("height", 30)
        
        // select.append("text")
        //         .attr("x", 15)
        //         .attr("y",30 )
        //         .text(states[0].state)

        // var options = select.selectAll("")
        //         .data(buttonNames)
        //         .enter()
        //         .append("g");

        // for (var i = 0; i < states.length; i++) {
        //     var opt = option_select.append("option")
        //     .attr("value", states[i].state)
        //     .text(states[i].state);
        // }

        var config = {
            width: 200,
            container: svg,
            members,
            fontSize: 14,
            color: "#333",
            fontFamily: "calibri",
            x: 20,
            y: 45,
            // changeHandler: function(option) {
            //   // "this" refers to the option group
            //   // Change handler code goes here
            //   document.getElementById("selectedInput").value = option.label;
            // }
          };
        
          svgDropDown(config);
        
          var that = this;
          /**  svg-dropdown.js - svg dropdown library  */
        
          function svgDropDown(options) {
            if (typeof options !== 'object' || options === null || !options.container) {
              console.error(new Error("Container not provided"));
              return;
            }
            const defaultOptions = {
              width: 200,
              members: [],
              fontSize: 12,
              color: "#333",
              fontFamily: "Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif",
              x: 0,
              y: 0,
            //   changeHandler: function() {}
            };
        
            options = { ...defaultOptions,
              ...options
            };
        
            options.optionHeight = options.fontSize * 2;
            options.height = options.fontSize + 8;
            options.padding = 5;
            options.hoverColor = "#0c56f5";
            options.hoverTextColor = "#fff";
            options.bgColor = "#fff";
            options.width = options.width - 2;
        
            const g = options.container
              .append("svg")
              .attr("x", options.x)
              .attr("y", options.y)
              .attr("shape-rendering", "crispEdges")
              .append("g")
              .attr("viewBox", "0,0,198,22")
              .attr("transform", "translate(1,1)")
              .attr("font-family", options.fontFamily);
        
            let selectedOption =
              options.members.length === 0 ? {
                label: "",
                value: ""
              } :
              options.members[0];
        
            /** Rendering Select Field */
            const selectField = g.append("g");
        
            // background
            selectField
              .append("rect")
              .attr("width", options.width)
              .attr("height", options.height)
              .attr("class", "option select-field")
              .attr("fill", options.bgColor)
              .style("stroke", "#a0a0a0")
              .style("stroke-width", "1");
        
            // text
            const activeText = selectField
              .append("text")
              .text(selectedOption.label)
              .attr("x", options.padding)
              .attr("y", options.height / 2 + options.fontSize / 3)
              .attr("font-size", options.fontSize)
              .attr("fill", options.color);
        
            // arrow symbol at the end of the select box
            selectField
              .append("text")
              .text("▼")
              .attr("x", options.width - options.fontSize - options.padding)
              .attr("y", options.height / 2 + (options.fontSize - 2) / 3)
              .attr("font-size", options.fontSize - 2)
              .attr("fill", options.color);
        
            // transparent surface to capture actions
            selectField
              .append("rect")
              .attr("width", options.width)
              .attr("height", options.height)
              .style("fill", "transparent")
              .on("click", handleSelectClick);
        
            /** rendering options */
            const optionGroup = g
              .append("g")
              .attr("transform", `translate(0, ${options.height})`)
              .attr("opacity", 0); //.attr("display", "none"); Issue in IE/Firefox: Unable to calculate textLength when display is none.
        
            // Rendering options group
            const optionEnter = optionGroup
              .selectAll("g")
              .data(options.members)
              .enter()
              .append("g")
              .on("click", handleOptionClick);
        
            // Rendering background
            optionEnter
              .append("rect")
              .attr("width", options.width)
              .attr("height", options.optionHeight)
              .attr("y", function(d, i) {
                return i * options.optionHeight;
              })
              .attr("class", "option")
              .style("stroke", options.hoverColor)
              .style("stroke-dasharray", (d, i) => {
                let stroke = [
                  0,
                  options.width,
                  options.optionHeight,
                  options.width,
                  options.optionHeight
                ];
                if (i === 0) {
                  stroke = [
                    options.width + options.optionHeight,
                    options.width,
                    options.optionHeight
                  ];
                } else if (i === options.members.length - 1) {
                  stroke = [0, options.width, options.optionHeight * 2 + options.width];
                }
                return stroke.join(" ");
              })
              .style("stroke-width", 1)
              .style("fill", options.bgColor);
        
            // Rendering option text
            optionEnter
              .append("text")
              .attr("x", options.padding)
              .attr("y", function(d, i) {
                return (
                  i * options.optionHeight +
                  options.optionHeight / 2 +
                  options.fontSize / 3
                );
              })
              .text(function(d) {
                return d.label;
              })
              .attr("font-size", options.fontSize)
              .attr("fill", options.color)
              .each(wrap);
        
            // Rendering option surface to take care of events
            optionEnter
              .append("rect")
              .attr("width", options.width)
              .attr("height", options.optionHeight)
              .attr("y", function(d, i) {
                return i * options.optionHeight;
              })
              .style("fill", "transparent")
              .on("mouseover", handleMouseOver)
              .on("mouseout", handleMouseOut);
        
            //once the textLength gets calculated, change opacity to 1 and display to none
            optionGroup.attr("display", "none").attr("opacity", 1);
        
            d3.select("body").on("click", function() {
              optionGroup.attr("display", "none");
            });
        
            // Utility Methods
            function handleMouseOver() {
              d3.select(d3.event.target.parentNode)
                .select(".option")
                .style("fill", options.hoverColor);
        
              d3.select(d3.event.target.parentNode)
                .select("text")
                .style("fill", options.hoverTextColor);
            }
        
            function handleMouseOut() {
              d3.select(d3.event.target.parentNode)
                .select(".option")
                .style("fill", options.bgColor);
        
              d3.select(d3.event.target.parentNode)
                .select("text")
                .style("fill", options.color);
            }
        
            function handleOptionClick(d) {
              d3.event.stopPropagation();
              selectedOption = d;
              activeText.text(selectedOption.label).each(wrap);
            //   typeof options.changeHandler === 'function' && options.changeHandler.call(this, d);
              optionGroup.attr("display", "none");
              
              //this is the selected option
              //write code here to draw plots
              var selectedState = selectedOption.value
              that.updateComparableChart(selectedState.stateCode);
              

            }
        
            function handleSelectClick() {
              d3.event.stopPropagation();
              const visibility = optionGroup.attr("display") === "block" ? "none" : "block";
              optionGroup.attr("display", visibility);
            }
        
            // wraps words
            function wrap() {
              const width = options.width;
              const padding = options.padding;
              const self = d3.select(this);
              let textLength = self.node().getComputedTextLength();
              let text = self.text();
              const textArr = text.split(/\s+/);
              let lastWord = "";
              while (textLength > width - 2 * padding && text.length > 0) {
                lastWord = textArr.pop();
                text = textArr.join(" ");
                self.text(text);
                textLength = self.node().getComputedTextLength();
              }
              self.text(text + " " + lastWord);
        
              // providing ellipsis to last word in the text
              if (lastWord) {
                textLength = self.node().getComputedTextLength();
                text = self.text();
                while (textLength > width - 2 * padding && text.length > 0) {
                  text = text.slice(0, -1);
                  self.text(text + "...");
                  textLength = self.node().getComputedTextLength();
                }
              }
            }
          }
        

       
    }
}
