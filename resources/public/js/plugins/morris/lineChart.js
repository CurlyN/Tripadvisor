 function drawMonth(){

  document.getElementById("graph_name").innerHTML = "Month";
  $('#chartContainer').empty();
// var dd = JSON.parse(getMonthlyData());
  var dd = getMonthlyData();
 console.log(dd);
 console.log(dd[6].count);
 var svg = dimple.newSvg("#chartContainer", 1050, 600);
    var data = [
      { "Data":dd[0].d.substring(5, dd[0].d.length), "Occupation":dd[0].count  },
      { "Data":dd[1].d.substring(5, dd[1].d.length), "Occupation":dd[1].count  },
      { "Data":dd[2].d.substring(5, dd[2].d.length), "Occupation":dd[2].count  },
      { "Data":dd[3].d.substring(5, dd[3].d.length), "Occupation":dd[3].count  },
      { "Data":dd[4].d.substring(5, dd[4].d.length), "Occupation":dd[4].count  },
      { "Data":dd[5].d.substring(5, dd[5].d.length), "Occupation":dd[5].count  },
      { "Data":dd[6].d.substring(5, dd[6].d.length), "Occupation":dd[6].count  },
      { "Data":dd[7].d.substring(5, dd[7].d.length), "Occupation":dd[7].count  },
      { "Data":dd[8].d.substring(5, dd[8].d.length), "Occupation":dd[8].count  },
      { "Data":dd[9].d.substring(5, dd[9].d.length), "Occupation":dd[9].count  },
      { "Data":dd[10].d.substring(5, dd[10].d.length), "Occupation":dd[10].count  },
      { "Data":dd[11].d.substring(5, dd[11].d.length), "Occupation":dd[11].count  },
      { "Data":dd[12].d.substring(5, dd[12].d.length), "Occupation":dd[12].count  },
      { "Data":dd[13].d.substring(5, dd[13].d.length), "Occupation":dd[13].count  },
      { "Data":dd[14].d.substring(5, dd[14].d.length), "Occupation":dd[14].count  },
      { "Data":dd[15].d.substring(5, dd[15].d.length), "Occupation":dd[15].count  },
      { "Data":dd[16].d.substring(5, dd[16].d.length), "Occupation":dd[16].count  },
      { "Data":dd[17].d.substring(5, dd[17].d.length), "Occupation":dd[17].count  },
      { "Data":dd[18].d.substring(5, dd[18].d.length), "Occupation":dd[18].count  },
      { "Data":dd[19].d.substring(5, dd[19].d.length), "Occupation":dd[19].count  },
      { "Data":dd[20].d.substring(5, dd[20].d.length), "Occupation":dd[20].count  },
      { "Data":dd[21].d.substring(5, dd[21].d.length), "Occupation":dd[21].count  },
      { "Data":dd[22].d.substring(5, dd[22].d.length), "Occupation":dd[22].count  },
      { "Data":dd[23].d.substring(5, dd[23].d.length), "Occupation":dd[23].count  },
      { "Data":dd[24].d.substring(5, dd[24].d.length), "Occupation":dd[24].count  },
      { "Data":dd[25].d.substring(5, dd[25].d.length), "Occupation":dd[25].count  },
      { "Data":dd[26].d.substring(5, dd[26].d.length), "Occupation":dd[26].count  },
      { "Data":dd[27].d.substring(5, dd[27].d.length), "Occupation":dd[27].count  },
      { "Data":dd[28].d.substring(5, dd[28].d.length), "Occupation":dd[28].count  },
      { "Data":dd[29].d.substring(5, dd[29].d.length), "Occupation":dd[29].count  },
      { "Data":dd[30].d.substring(5, dd[30].d.length), "Occupation":dd[30].count  }
    ];
    var chart = new dimple.chart(svg, data);
     var x = chart.addCategoryAxis("x", "Data");
    x.addOrderRule("Data");
    chart.addMeasureAxis("y", "Occupation");
    chart.addSeries(null, dimple.plot.line);
    chart.height = 450;
    chart.y = 30;
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
                            url:'http://localhost:3000/mainroom/history/'+start_date+'T00:00:00Z/'+end_date+'T23:59:59Z/86400',
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
  document.getElementById("graph_name").innerHTML = "Week";

  $('#chartContainer').empty();
 //var dd = JSON.parse(getWeeklyData());
 var dd = getWeeklyData();
// console.log(dd);
console.log("6 значение"+dd[6].count);
 var svg = dimple.newSvg("#chartContainer", 1050, 500);
    var data = [
      { "Data":dd[0].d.substring(5, dd[0].d.length), "Occupation":dd[0].count  },
      { "Data":dd[1].d.substring(5, dd[1].d.length), "Occupation":dd[1].count  },
      { "Data":dd[2].d.substring(5, dd[2].d.length), "Occupation":dd[2].count  },
      { "Data":dd[3].d.substring(5, dd[3].d.length), "Occupation":dd[3].count  },
      { "Data":dd[4].d.substring(5, dd[4].d.length), "Occupation":dd[4].count  },
      { "Data":dd[5].d.substring(5, dd[5].d.length), "Occupation":dd[5].count  },
      { "Data":dd[6].d.substring(5, dd[6].d.length), "Occupation":dd[6].count  },
      { "Data":dd[6].d.substring(5, dd[7].d.length), "Occupation":dd[7].count  }
    ];
    var chart = new dimple.chart(svg, data);
     var x = chart.addCategoryAxis("x", "Data");
    x.addOrderRule("Data");
    chart.addMeasureAxis("y", "Occupation");
    chart.addSeries(null, dimple.plot.line);
    chart.height = 450;
    chart.y = 30;
    chart.draw();
}

function getWeeklyData(){


var d = new Date() ;
var year = d.getFullYear();
var day = d.getDate()+1;
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


var url1 = 'http://localhost:3000/mainroom/history/'+start_date+'T00:00:00Z/'+end_date+'T23:59:59Z/86400';
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

drawWeek();