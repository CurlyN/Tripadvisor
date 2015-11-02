var globalTemperature ;

function addDonutPlacesOccupied(){

BaseConfig=jQuery.ajax({
                            async:false,
                            url:'http://localhost:3000/mainroom/occupancy-and-temperature',
					        dataType: 'json',
                            done: function(results) {
                                JSON.parse(results);
                                return results;
                            },
                            fail: function( jqXHR, textStatus, errorThrown ) {
                                console.log( 'Could not get posts, server response: ' + textStatus + ': ' + errorThrown );
                            }
                            }).responseJSON;
console.log(BaseConfig.o);
if (BaseConfig.o == undefined){
    console.log("Ocupancy nan")
return 0;
}
else {
    console.log("Ocupancy not nan");
    return BaseConfig.o;
}
}


function addDonutPlacesFree(){
    var res = 50-addDonutPlacesOccupied();
   // console.log(res);
	return res;
}

function addDonutMeeting1(){
     var day = addZero(new Date().getDate());
    var month = addZero(new Date().getMonth()+1);
    var year = new Date().getFullYear();
    var hour = addZero(new Date().getHours());
    var minute = addZero(new Date().getMinutes());
    var second = addZero(new Date().getSeconds() - 5);
    var url2 = 'https://opensensors.io/api/1.0/users/gizmo/messages-by-topic?topic=/orgs/wd/testing/occupancy&api-key=c2dffcde-5e55-413a-aff4-b5daaf58bd02&start-date='+year+'-'+month+'-'+day+'T'+hour+':'+minute+':'+second;
    console.log(url2);
    BaseConfig=jQuery.ajax({
                            async:false,
                            url:url2,
                            dataType: 'json',
                            done: function(results) {
                                JSON.parse(results);
                                return results;
                            },
                            fail: function( jqXHR, textStatus, errorThrown ) {
                                console.log( 'Could not get posts, server response: ' + textStatus + ': ' + errorThrown );
                            }
                            }).responseJSON;
    var ocupant;
    //console.log(BaseConfig.messages[0].payload.text);
    if ( BaseConfig.messages[0] == undefined){
        ocupant = 0;
    } else {
    var value = BaseConfig.messages[0].payload.text.split('"');
    ocupant = value[6].substring(1,value[6].length-1);
    }
	return ocupant;
}

function addDonutMeeting2(){
    var day = addZero(new Date().getDate());
    var month = addZero(new Date().getMonth()+1);
    var year = new Date().getFullYear();
    var hour = addZero(new Date().getHours());
    var minute = addZero(new Date().getMinutes());
    var second = addZero(new Date().getSeconds() - 5);
    var url2 = 'https://opensensors.io/api/1.0/users/gizmo/messages-by-topic?topic=/orgs/wd/testing/occupancy&api-key=c2dffcde-5e55-413a-aff4-b5daaf58bd02&start-date='+year+'-'+month+'-'+day+'T'+hour+':'+minute+':'+second;
    console.log(url2);
	BaseConfig=jQuery.ajax({
                            async:false,
                            url:url2,
                            dataType: 'json',
                            done: function(results) {
                                JSON.parse(results);
                                return results;
                            },
                            fail: function( jqXHR, textStatus, errorThrown ) {
                                console.log( 'Could not get posts, server response: ' + textStatus + ': ' + errorThrown );
                            }
                            }).responseJSON;
    var ocupant;
    //console.log(BaseConfig.messages[0].payload.text);
    if ( BaseConfig.messages[0] == undefined){
        ocupant = 0;
    } else {
    var value = BaseConfig.messages[0].payload.text.split('"');
    ocupant = value[6].substring(1,value[6].length-1);
    }
    return ocupant;
}

function addTemp(){

	BaseConfig=jQuery.ajax({
                            async:false,
                            url:'http://localhost:3000/mainroom/occupancy-and-temperature',
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
if (BaseConfig.o == undefined){
    console.log("Temperature nan");
    if (globalTemperature ==undefined) {globalTemperature =29;}
return globalTemperature;
}
else {
    console.log("Temperature not nan");
    globalTemperature = BaseConfig.t
    return BaseConfig.t;
}
}

 var mainRoom = Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Occupied desks",
            value: addDonutPlacesOccupied()
        }, {
            label: " Free desks \n ",
            value: addDonutPlacesFree()
        }],
        resize: true
    });


   /*var  roomTemp = Morris.Donut({
        element: 'morris-donut-chart-temp',
        data: [{
            label: "Temperature",
            value: addTemp()
        }],
        resize: true
    });*/
document.getElementById("temperature_result").innerHTML = addTemp()+"   &deg;С";

document.getElementById("meeting_room2_result").innerHTML = addDonutMeeting2();
document.getElementById("meeting_room1_result").innerHTML = addDonutMeeting1();

function updateDonut(){
  
    mainRoom.setData([{
            label: "Occupied desks",
            value: addDonutPlacesOccupied()
        }, {
            label: " Free desks \n ",
            value: addDonutPlacesFree()
        }]);

    document.getElementById("meeting_room2_result").innerHTML = addDonutMeeting2();
    document.getElementById("meeting_room1_result").innerHTML = addDonutMeeting1();

    console.log("changing main room");

    document.getElementById("temperature_result").innerHTML = addTemp()+"   &deg;С";
    
}

setInterval(updateDonut,60000);

function addZero(d){
  if (d / 10 < 1){

    d = "0"+d;
  }

  return d;
}