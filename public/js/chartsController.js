var chartsController = {
    init : function () {
        this.legendState = true;
        this.lineChartLogsTime = $('#lineChartLogsTime');
        this.lineChartTotalEvent = $('#lineChartTotalEvent');
        this.pieChartLogsCounter = $('#pieChartLogsCounter');
        this.barChartMonthEvents = $('#barChartMonthEvents');

        this.chartsInit()
    },

    chartsInit : function () {
        if ($(window).outerWidth() < 576) {
            this.legendState = false;
        }

        this.getLogsByGroup("EventId", this.logsCounterInit);
        this.getLogsByGroup("EventId", this.totalEventInit);
        this.getLogsByGroup("Month", this.monthEventsInit);
        this.getLogsByGroup("Hour", this.logsTimeInit);
    },

    logsTimeInit : function (logs) {

        model = {};
        model.data = [0,0,0,0,0,0,0,0,0,0,0,0];

        logs.forEach(function(log){
            model.data[Math.round(log._id / 2)] = (log.count);
        });

        var myLineChart = new Chart(this.lineChartLogsTime, {
            type: 'line',
            options: {
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            display: false
                        }
                    }]
                },
                legend: {
                    display: this.legendState
                }
            },
            data: {
                labels: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"],
                datasets: [
                    {
                        label: "Logs Time",
                        fill: true,
                        lineTension: 0,
                        backgroundColor: "transparent",
                        borderColor: '#f15765',
                        pointBorderColor: '#da4c59',
                        pointHoverBackgroundColor: '#da4c59',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        borderWidth: 1,
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBorderColor: "#fff",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 0,
                        data: model.data,
                        spanGaps: false
                    },
                ]
            }
        });
    },

    totalEventInit : function (logs) {
        model = {};
        model.labels = [];
        model.data = [];

        logs.forEach(function(log){
            model.labels.push(log._id.EventId);
            model.data.push(log.count);
        });

        var myLineChart = new Chart(this.lineChartTotalEvent, {
            type: 'line',
            options: {
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: true
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            max: 100,
                            min: 65,
                            stepSize: 2
                        },
                        display: false,
                        gridLines: {
                            display: true
                        }
                    }]
                },
                legend: {
                    display: false
                }
            },
            data: {
                labels: model.labels,
                datasets: [
                    {
                        label: "Num of events",
                        fill: true,
                        lineTension: 0,
                        backgroundColor: "transparent",
                        borderColor: '#6ccef0',
                        pointBorderColor: '#59c2e6',
                        pointHoverBackgroundColor: '#59c2e6',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        borderWidth: 3,
                        pointBackgroundColor: "#59c2e6",
                        pointBorderWidth: 0,
                        pointHoverRadius: 4,
                        pointHoverBorderColor: "#fff",
                        pointHoverBorderWidth: 0,
                        pointRadius: 4,
                        pointHitRadius: 0,
                        data: model.data,
                        spanGaps: false
                    }
                ]
            }
        });

        $('.lineChartTotalEventText').text(eval(model.data.join("+")) + " Events")
    },

    logsCounterInit : function (logs) {
        model = {};
        model.labels = [];
        model.data = [];

        logs.forEach(function(log){
            model.labels.push("Event Id "+log._id.EventId);
            model.data.push(log.count);
        });

        var myPieChart = new Chart(this.pieChartLogsCounter, {
            type: 'doughnut',
            options: {
                cutoutPercentage: 80,
                legend: {
                    display: false
                }
            },
            data: {
                labels: model.labels,
                datasets: [
                    {
                        data: model.data.sort(),
                        borderWidth: [0, 0, 0, 0],
                        backgroundColor: [
                            "#00bfff",
                            "#00ffff",
                            "#00ffbf",
                            "#00ff80",
                            "#00ff40",
                            "#00ff00",
                            "#40ff00",
                            "#80ff00",
                            "#bfff00",
                            "#ffff00",
                            "#ffbf00",
                            "#ff8000",
                            "#ff4000",
                        ],
                        hoverBackgroundColor: [
                            '#44b2d7',
                            "#59c2e6",
                            "#71d1f2",
                            "#96e5ff"
                        ]
                    }]
            }
        });

        $('.pieChartLogsCounterText').text(eval(model.data.join("+")))
    },

    monthEventsInit : function (logs) {

        model = {};
        model.data = [0,0,0,0,0,0,0,0,0,0,0,0];

        logs.forEach(function(log){
            model.data[log._id] = (log.count);
        });

        var barChartHome = new Chart(this.barChartMonthEvents, {
            type: 'bar',
            options:
                {
                    scales:
                        {
                            xAxes: [{
                                display: true
                            }],
                            yAxes: [{
                                display: false
                            }],
                        },
                    legend: {
                        display: false
                    }
                },
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Nov", "Dec"],
                datasets: [
                    {
                        label: "Num of Logs:",
                        backgroundColor: [
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)'
                        ],
                        borderColor: [
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)',
                            'rgb(121, 106, 238)'
                        ],
                        borderWidth: 1,
                        data: model.data
                    }
                ]
            }
        });
    },

    getLogsByGroup: function(query, callback){
        var self = this;
        $.ajax({
            url: "/logs/groupBy",
            type: 'GET',
            data: {
                group: query,
            },
            //dataType: "application/json",
            success: function (res) {
                if (res.errors && res.errors.length > 0) {
                    //request failed
                    console.log("request failed res:", res.errors);
                    return;
                }
                //request success
                callback(res);

            },
            error: function (res) {
                console.log(res);
            }
        });
    }


}