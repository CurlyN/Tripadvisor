 function drawMonth(){
// var dd = JSON.parse(getMonthlyData());
	var dd = getMonthlyData();
 console.log(dd);
 var svg = dimple.newSvg("#chartContainer", 950, 600);
    var data = [
      { "Data":dd[0].d, "Occupation":dd[0].o  },
      { "Data":dd[1].d, "Occupation":dd[1].o  },
      { "Data":dd[2].d, "Occupation":dd[2].o  },
      { "Data":dd[3].d, "Occupation":dd[3].o  },
      { "Data":dd[4].d, "Occupation":dd[4].o  },
      { "Data":dd[5].d, "Occupation":dd[5].o  },
      { "Data":dd[6].d, "Occupation":dd[6].o  },
      { "Data":dd[7].d, "Occupation":dd[7].o  },
      { "Data":dd[8].d, "Occupation":dd[8].o  },
      { "Data":dd[9].d, "Occupation":dd[9].o  },
      { "Data":dd[10].d, "Occupation":dd[10].o  },
      { "Data":dd[11].d, "Occupation":dd[11].o  },
      { "Data":dd[12].d, "Occupation":dd[12].o  },
      { "Data":dd[13].d, "Occupation":dd[13].o  },
      { "Data":dd[14].d, "Occupation":dd[14].o  },
      { "Data":dd[15].d, "Occupation":dd[15].o  },
      { "Data":dd[16].d, "Occupation":dd[16].o  },
      { "Data":dd[17].d, "Occupation":dd[17].o  },
      { "Data":dd[18].d, "Occupation":dd[18].o  },
      { "Data":dd[19].d, "Occupation":dd[19].o  },
      { "Data":dd[20].d, "Occupation":dd[20].o  },
      { "Data":dd[21].d, "Occupation":dd[21].o  },
      { "Data":dd[22].d, "Occupation":dd[22].o  },
      { "Data":dd[23].d, "Occupation":dd[23].o  },
      { "Data":dd[24].d, "Occupation":dd[24].o  },
      { "Data":dd[25].d, "Occupation":dd[25].o  },
      { "Data":dd[26].d, "Occupation":dd[26].o  },
      { "Data":dd[27].d, "Occupation":dd[27].o  },
      { "Data":dd[28].d, "Occupation":dd[28].o  },
      { "Data":dd[29].d, "Occupation":dd[29].o  },
      { "Data":dd[30].d, "Occupation":dd[30].o  }
    ];
    var chart = new dimple.chart(svg, data);
   	 var x = chart.addCategoryAxis("x", "Data");
    x.addOrderRule("Data");
    chart.addMeasureAxis("y", "Occupation");
    chart.addSeries(null, dimple.plot.bar);
    chart.draw();
}
function addZero(d){
	if (d / 10 < 1){

	  d = "0"+d;
	}

	return d;
}
function getMonthlyData(){
var d = new Date() ;
var year = d.getFullYear();
var day = d.getDate();
var past_month = d.getMonth();
var current_month = past_month+1;
past_month = addZero(past_month);
current_month = addZero(current_month);
day = addZero(day);

var start_date = year+"-"+past_month+"-"+day;
var end_date = year+"-"+current_month+"-"+day;

BaseConfig=jQuery.ajax({
                            async:false,
                            url:'http://localhost:8081/mainroom/history/start='+start_date+'&end='+end_date+'&step=86400',
					        dataType: 'json',
                            done: function(results) {
                                JSON.parse(results);
                                return results;
                            },
                            fail: function( jqXHR, textStatus, errorThrown ) {
                                console.log( 'Could not get posts, server response: ' + textStatus + ': ' + errorThrown );
                            }
                            }).responseJSON;
console.log(BaseConfig)
return BaseConfig;
}



 function drawWeek(){
 //var dd = JSON.parse(getWeeklyData());
 var dd = getWeeklyData();
// console.log(dd);
 var svg = dimple.newSvg("#chartContainer", 950, 600);
    var data = [
      { "Data":dd[0].d, "Occupation":dd[0].o  },
      { "Data":dd[1].d, "Occupation":dd[1].o  },
      { "Data":dd[2].d, "Occupation":dd[2].o  },
      { "Data":dd[3].d, "Occupation":dd[3].o  },
      { "Data":dd[4].d, "Occupation":dd[4].o  },
      { "Data":dd[5].d, "Occupation":dd[5].o  },
      { "Data":dd[6].d, "Occupation":dd[6].o  },
      { "Data":dd[7].d, "Occupation":dd[7].o  }
    ];
    var chart = new dimple.chart(svg, data);
   	 var x = chart.addCategoryAxis("x", "Data");
    x.addOrderRule("Data");
    chart.addMeasureAxis("y", "Occupation");
    chart.addSeries(null, dimple.plot.bar);
    chart.draw();
}

function getWeeklyData(){
var d = new Date() ;
var year = d.getFullYear();
var day = d.getDate();
var last_week1 = 31 + (day-7);
var last_week2 = day-7;
var past_month = d.getMonth();
var current_month = past_month+1;
var start_date;
var end_date;

past_month = addZero(past_month);
current_month = addZero(current_month);
day = addZero(day);

if (day<7){
start_date = year+"-"+past_month+"-"+last_week1;
end_date = year+"-"+current_month+"-"+day;
}else{
start_date = year+"-"+current_month+"-"+last_week2;
end_date = year+"-"+current_month+"-"+day;
}


var url1 = 'http://localhost:8081/mainroom/history/start='+start_date+'&end='+end_date+'&step=86400';
console.log(url1);
BaseConfig=jQuery.ajax({
                            async:false,
                            url: url1,
					        dataType: 'json',
                            done: function(results) {
                                JSON.parse(results);
                                return results;
                            },
                            fail: function( jqXHR, textStatus, errorThrown ) {
                                console.log( 'Could not get posts, server response: ' + textStatus + ': ' + errorThrown );
                            }
                            }).responseJSON;

console.log(BaseConfig);
return BaseConfig;
}