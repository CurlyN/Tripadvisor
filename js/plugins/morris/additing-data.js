function addDonutPlacesOccupied(){

BaseConfig=jQuery.ajax({
                            async:false,
                            url:'http://localhost:8081/mainroom/occupancy-and-temperature',
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

return BaseConfig.o;
}


function addDonutPlacesFree(){

	return 1-addDonutPlacesOccupied();
}

function addDonutMeeting1(){

	return 0;
}

function addDonutMeeting2(){

	return 0;
}

function addAreaChart(){

	return 40;
}