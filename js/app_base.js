
'use strict';

/* App Module */
var app = angular.module("myApp", []); 

app.controller("CsvCtrl", ["$scope", "$q", function($scope,$q) {
 // ...  the rest of the code
 
 // Upload and read CSV function
 $scope.submitForm = function(form) {
 var filename = document.getElementById("bulkDirectFile");
 $.session.set("films","");
 if (filename.value.length < 1 ){
 ($scope.warning = "Please upload a file");
 } else {
	 $scope.title = "Confirm file";
	 var file = filename.files[0];
	 var fileSize = 0;
	 if (filename.files[0]) {
		var reader = new FileReader();
		 reader.onload = function (e) {	
			$("#json").html('');
			$.session.set("films","");
			 var obj;
			 var Table = document.getElementById('Table');
			 var file = document.getElementById("bulkDirectFile").files[0];
			 $('.loading').show();
			 var allResults = [];
			 
			 Papa.parse(file, {
			 download: true,
			 header: true,
			 skipEmptyLines: true,
			 error: function(err, file, inputElem, reason) { },
			 complete: function(results) {
			 allResults.push(results.data);
			 
			 obj = results.data;
			 for (var i = 0; i < results.data.length; i++) {
				 if (i % 4 == 0 && i != 0)
					{
						$("#json").append("<div class='clearfix visible-xs-block'></div>");
					}
						$("#json").append("<div class='col-sm-6 col-md-3 clearfix'><div class='thumbnail'><img src='https://image.tmdb.org/t/p/w500_and_h282_face"+obj[i].poster_path+"' alt='Park'><div class='caption'><h3>"+obj[i].original_title+"</h3><p>"+obj[i].vote_average+"</p></div></div></div>");
				}
				
				$.session.set("films",JSON.stringify(obj));
				}
			});
		}
		 reader.readAsText(filename.files[0]);
	}
	 return false;
 }
}


$scope.myFunc = function() {
    var data = JSON.parse($.session.get("films"));
	var search = $("#search").val();
	var count = 0;
	$("#json").html('');
	for (var i = 0; i < data.length; i++) {
		 if (data[i].original_title.toLowerCase().includes(search.toLowerCase()))     
		{
			if (count % 4 == 0 && count != 0)
				{
					$("#json").append("<div class='clearfix visible-xs-block'></div>");
				}
		$("#json").append("<div class='col-sm-6 col-md-3'><div class='thumbnail'><img src='https://image.tmdb.org/t/p/w500_and_h282_face"+data[i].poster_path+"' alt='Park'><div class='caption'><h3>"+data[i].original_title+"</h3><p>"+data[i].vote_average+"</p></div></div></div>");
		count = count + 1;
		}	
	 }
	 count = 0;
      };
$scope.search = function() {
	var data = JSON.parse($.session.get("films"));
	var search = $("#search").val();
	var count = 0;
	$("#json").html('');
	for (var i = 0; i < data.length; i++) {
		 if (data[i].original_title.toLowerCase().indexOf(search.toLowerCase()) == 0)
		{
			if (count % 4 == 0 && count != 0)
				{
					$("#json").append("<div class='clearfix visible-xs-block'></div>");
				}
		$("#json").append("<div class='col-sm-6 col-md-3'><div class='thumbnail'><img src='https://image.tmdb.org/t/p/w500_and_h282_face"+data[i].poster_path+"' alt='Park'><div class='caption'><h3>"+data[i].original_title+"</h3><p>"+data[i].vote_average+"</p></div></div></div>");
		count = count + 1;
		}	
	 }
	 count = 0;
	}
}]); 