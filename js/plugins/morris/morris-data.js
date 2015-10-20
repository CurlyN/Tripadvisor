// Morris.js Charts sample data for SB Admin template

$(function() {

    // Donut Chart
    Morris.Donut({
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

    // Meeting room 1
    Morris.Donut({
        element: 'morris-donut-chart-meeting-rooms1',
        data: [{
            label: "People in a room 1",
            value: addDonutMeeting1()
        }],
        resize: true
    });

      // Donut Chart
    Morris.Donut({
        element: 'morris-donut-chart-meeting-rooms2',
        data: [{
            label: "People in a room 1",
            value: addDonutMeeting2()
        }],
        resize: true
    });


});
