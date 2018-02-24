angular.module("main").controller("homeController", ["$scope", "$http", function($scope, $http){
	console.log('homeController');
    $scope.activePage = 'home';

    $scope.logsDataSets = {
		logsForHour:    [0,0,0,0,0,0,0,0,0,0,0,0],
		logsForMonth:   [0,0,0,0,0,0,0,0,0,0,0,0],
		logsForCounter: {labels :[] ,data: [] ,total: 0},
	}

	$scope.charts = {
		lineChartLogsTime: {
			labels: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"],
			data: $scope.logsDataSets.logsForHour,
			onClick: function (points, evt) {
				console.log(points, evt);
			},
			datasetOverride: [{ yAxisID: 'y-axis-1'}],
			options: {
				scales: {
					yAxes: [
						{
							id: 'y-axis-1',
							type: 'linear',
							display: true,
							position: 'left'
						}
					]
				},
				legend: {
					display: false
				}
			}
		},

		barChartMonthEvents: {
			labels: ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Oct", "Dec"],
			data: $scope.logsDataSets.logsForMonth,
		},

		pieChartLogsCounter: {
			labels: $scope.logsDataSets.logsForCounter.labels,
			data: $scope.logsDataSets.logsForCounter.data,
			options: {
				cutoutPercentage: 80,
				legend: {
					display: false
				}
			}
		},

		lineChartTotalEvent: {
			labels: $scope.logsDataSets.logsForCounter.labels,
			data: $scope.logsDataSets.logsForCounter.data,
			datasetOverride: [{ yAxisID: 'y-axis-1'}],
			options: {
				scales: {
					yAxes: [
						{
							id: 'y-axis-1',
							type: 'linear',
							display: true,
							position: 'left',
						}
					]
				},
				legend: {
					display: false
				},
			}
		}
	};

	$scope.updateLogsCharts= function () {
		$scope.getLogsForMonth();
		$scope.getLogsForHour();
		$scope.getLogsForCounter();

	};

	$scope.getLogsForMonth = function () {
		console.log('homeController - getLogsForMonth')
		$http({
			method: 'GET',
			url: 'http://localhost:3000/api/logs/getLogsByMonth'
		}).then(function (response){
			console.log(response);
			response.data.logs.forEach(function (element) {
				$scope.logsDataSets.logsForMonth[element._id-1] += element.count;
			});
			console.log($scope.logsDataSets.logsForMonth)
		});
	};

	$scope.getLogsForHour = function () {
		console.log('homeController - getLogsForHour')
		$http({
			method: 'GET',
			url: 'http://localhost:3000/api/logs/getLogsByHour'
		}).then(function (response){
			console.log(response)
			response.data.logs.forEach(function (element) {
				if(element._id % 2 != 0 )
					$scope.logsDataSets.logsForHour[(element._id-1)/2] += element.count;
				else
					$scope.logsDataSets.logsForHour[(element._id)/2] += element.count;

			});
		});
	};

	$scope.getLogsForCounter = function () {
		console.log('homeController - getLogsForCounter')
		$http({
			method: 'GET',
			url: 'http://localhost:3000/api/logs/getLogsByEventId'
		}).then(function (response){
			console.log(response)
			response.data.logs.forEach(function (element) {
				$scope.logsDataSets.logsForCounter.labels.push(element._id);
				$scope.logsDataSets.logsForCounter.data.push(element.count);
				$scope.logsDataSets.logsForCounter.total += element.count;
			})
			console.log($scope.logsDataSets.logsForCounter)
		});
	};

	//$scope.updateLogsCharts();
}]);