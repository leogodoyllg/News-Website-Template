var app = angular.module("app", []);
app.controller("mainCtrl", function($scope) {
	var init = function() {
		
		$scope.data = [  ]
		var ws = new WebSocket("ws://127.0.0.1:8080/websocket");
		ws.onopen = function() {
			ws.send("send data");
		};
		ws.onmessage = function(evt) {
			var data =JSON.parse(evt.data)
			//$scope.data = []
			for(var i in data){
				var elem = data[i]
				var name=  i.split("|")[0]
				var exist= false, foundIndrx = null
				angular.forEach($scope.data, function(val,index){
					if(!val.hasOwnProperty(name)){
						
					}
					else{
						exist = true;
						foundIndrx = index;
						
					}
				});//forech
				if(exist){
					$scope.data[foundIndrx][name]= []
				}
				else{
					foundIndrx = $scope.data.length
					$scope.data.push({});
				}
				$scope.data[foundIndrx][name]= [];
				for(var k in elem){
					var obj = elem[parseInt(k)]
					
					$scope.data[foundIndrx][name].push(obj)
				}
				
			}
		};
	}
	init();
})