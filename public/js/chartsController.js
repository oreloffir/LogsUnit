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
			this.this.legendState = false;
		}

		this.logsTimeInit()
		this.totalEventInit()
		this.logsCounterInit()
		this.monthEventsInit()
	},

	logsTimeInit : function () {
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
						data: [10, 5, 4, 10, 15, 40, 55, 50, 60, 54, 35, 15],
						spanGaps: false
					},
				]
			}
		});
	},

	totalEventInit : function () {
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
							max: 50,
							min: 0,
							stepSize: 2.5
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
				labels: [
					"6416",
					"4719",
					"4648",
					"4776"
				],
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
						data: [30, 5, 10, 6],
						spanGaps: false
					}
				]
			}
		});
	},

	logsCounterInit : function () {
		var myPieChart = new Chart(this.pieChartLogsCounter, {
			type: 'doughnut',
			options: {
				cutoutPercentage: 80,
				legend: {
					display: false
				}
			},
			data: {
				labels: [
					"Event Id 6416",
					"Event Id 4719",
					"Event Id 4648",
					"Event Id 4776"
				],
				datasets: [
					{
						data: [300, 50, 100, 60],
						borderWidth: [0, 0, 0, 0],
						backgroundColor: [
							'#44b2d7',
							"#59c2e6",
							"#71d1f2",
							"#96e5ff"
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
	},

	monthEventsInit : function () {
		var barChartHome = new Chart(this.barChartMonthEvents, {
			type: 'bar',
			options:
				{
					scales:
						{
							xAxes: [{
								display: false
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
				labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"],
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
						data: [35, 49, 55, 68, 81, 95, 85, 40, 30, 27, 22, 15]
					}
				]
			}
		});
	},


}