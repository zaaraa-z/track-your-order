

$(document).ready(function () {
    //Ttracking The Package:
    //1- insert the number in the filed(it is required).
    //2- click the "Track" button. 
    //==> the tracking section will be displayed.
    //==> the page will be scrolled to that section.
    //==> the tracking number will be displayed in the tracking section.
    //==> the field value will be reset.
    $('#track-btn').on('click', function (e) {
        var trackingSection = $('#tracking-sec')
        var trackHtml = $('#track-number');
        var trackValue = $("#track-input").val();

        if (trackValue !== '') {
            e.preventDefault();
            trackingSection.fadeIn();
            window.location.href = "#tracking-sec";
            trackHtml.html(trackValue);
            $("#track-input").val('');

        } else {
            alert('Please enter the tracking number (any!)');
        }
    });


    //Changing The Delivery Address:
    //1- click the "Change" button.
    //==> the change address modal will be displayed.
    //2- enter the address in the fields.
    //3- click the "Save" button.
    //==> the whole address will be displayed in the address section.
    //==> the modal field values will be reset.
    $('#address-btn').on('click', function (e) {
        e.preventDefault();
        var addressHtml = $('#address-html');
        var addressValue = "";

        $(".address-input").each(function () {
            addressValue = addressValue + ', ' + $(this).val();
        });

        addressHtml.html(addressValue);
        $('.address-input').val('');
    });


    //Displaying "Track" Button by Scrolling Down More Than 200px:
    $(window).scroll(function () {
        var showAfter = 200;
        if ($(this).scrollTop() > showAfter) {
            $('#fixed-track').fadeIn();
        } else {
            $('#fixed-track').fadeOut();
        }
    });


    //Scrolling to the top by Clicking on the Fixed "Track" button:
    $('#fixed-track').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
});





//MAPBOX-----------------------------------------
//-----------------------------------------------
//Inserting The MapBox:
mapboxgl.accessToken = 'pk.eyJ1IjoiemFyYS16IiwiYSI6ImNrcDhxYXIzcjBhdXQycGxhbWZyb3hjYnoifQ.2ppedCVZSHYhEdIcXU9I4g';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [18.05, 59.33],
    zoom: 11
});



//Defining Origin & Destination Points:
var originDestination = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [18.0680743282626, 59.344936563375775]
        },
        properties: {
            title: 'From Here',
            description: 'Stockholm, Y Street'
        }
    },
    {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [18.026561368526497, 59.333113646821765]
        },
        properties: {
            title: 'To Here',
            description: 'Stockholm, X Street'
        }
    }]
};



//Defining Live Vehicle Point:
var live = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [18.061883799179146, 59.33843756358862]
        },
        properties: {
            title: 'On The Way!',
            description: 'Stockholm, Z Street'
        }
    }]
};



//Creating Pints:
originDestination.features.forEach(function (marker) {
    var el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML('<h5>' + marker.properties.title + '</h5><p>' + marker.properties.description + '</p>')
        )
        .addTo(map);
});

live.features.forEach(function (marker) {
    var el = document.createElement('div');
    el.className = 'live';

    new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML('<h5>' + marker.properties.title + '</h5><p>' + marker.properties.description + '</p>')
        )
        .addTo(map);
});




//Changing Marker from Bike to Car & Vise Versa:
$('.vehicle-input').click(function () {
    var liveElement = $('.live');
    var liveEelementId = event.target.id;
    if (liveEelementId === 'car') {
        liveElement.css('background-image', 'url(img/i-car.svg)');
    } else {
        liveElement.css('background-image', 'url(img/i-bike.svg)');
    }
});

