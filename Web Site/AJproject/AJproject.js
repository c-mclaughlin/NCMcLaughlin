var Publishers;
var Series;




function onLoad() {
	//alert("In onLoad()");
	
	getPublishers(false);
	getSeries(false);
	
}






function insertSeries() {
	var Publisher,
	    SeriesName,
	    ReleaseDate;
	Publisher = JSON.stringify($('#Publishers option:selected').val());
	SeriesName = JSON.stringify($('#Series').val());
	ReleaseDate = JSON.stringify($('#ReleaseDate').val());
	ajax = ajaxinsertSeries("insertSeries", Publisher, SeriesName, ReleaseDate);
	ajax.done(insertSeriesCallback);
	ajax.fail(function() {
		alert("Failure");
	});
}

function ajaxinsertSeries(method, Publisher, SeriesName, ReleaseDate) {
	return $.ajax({
		url : 'AJproject.php',
		type : 'POST',
		data : {
			method : method,
			Publisher : Publisher,
			SeriesName : SeriesName,
			ReleaseDate : ReleaseDate
		}
	});
}

function insertSeriesCallback(response_in) {
	response = JSON.parse(response_in);

	if (!response['success']) {
		$("#results").html("");
		alert("Insert failed on query:" + '\n' + response['querystring']);
		getSeries(false);
		getPublishers(false);
	} else {
		$("results").html(response['querystring'] + '<br>' + response['success'] + '<br>');
		getSeries(false);
		getPublishers(false);
	}
}

function showSeries(Series) {
	//alert("In showSeries()");
	//alert(Series);
	var SeriesList = "";
	$.each(Series, function(key, value) {
		var itemString = "";
		$.each(value, function(key, item) {
			itemString += item + "\t \t";
		});
		SeriesList += itemString + '<br>';
	});
	$("#results").html(SeriesList);
}

function getSeries() {
	//alert("In getSeries()");
	ajax = ajaxgetSeries("getSeries");
	ajax.done(getSeriesCallback);
	ajax.fail(function() {
		alert("Failure");
	});
}

function ajaxgetSeries(method) {
	//alert("In ajaxgetSeries()");
	return $.ajax({
		url : 'AJproject.php',
		type : 'POST',
		data : {
			method : method
		}
	});
}

function getSeriesCallback(response_in) {
	//alert(response_in);
	var response = JSON.parse(response_in);
	Series = response["Series"];
	if (!response['success']) {
		$("#results").html("getSeries() failed");
	} else {
		showSeries(Series);
	}
}

function getPublishers() {
	//alert("In getPublishers()");
	ajax = ajaxgetPublishers("getPublishers");
	ajax.done(getPublishersCallback);
	ajax.fail(function() {
		alert("Failure");
	});
}

function ajaxgetPublishers(method) {
	//alert("In ajaxgetPublishers()");
	return $.ajax({
		url : 'AJproject.php',
		type : 'POST',
		data : {
			method : method
		}
	});
}

function getPublishersCallback(response_in) {
	//alert("In getPublishersCallback()");
	//alert(response_in);
	response = JSON.parse(response_in);
	$Publisher = response["Publisher"];
	//alert($Publisher);
	if (!response['success']) {
		alert('Failed in getPublishersCallback');
		$("#results").html("getPublishers failed");
	} else {
		$('#Publishers').find('option').remove();
		//alert($Publisher);
		$.each($Publisher, function(key, columns) {
			$("#Publishers").append($('<option>', {
				//value : columns[0].toString(),
				text : columns[1].toString()
			}));
		});
	}
}