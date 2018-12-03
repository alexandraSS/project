"use strict";
jQuery(document).ready(function ($) {

    // touch for carousel
	$(".carousel").on("touchstart", function(event){
		var xClick = event.originalEvent.touches[0].pageX;
		$(this).one("touchmove", function(event){
			var xMove = event.originalEvent.touches[0].pageX;
			if( Math.floor(xClick - xMove) > 5 ){
				$(this).carousel('next');
			}
			else if( Math.floor(xClick - xMove) < -5 ){
				$(this).carousel('prev');
			}
		});
		$(".carousel").on("touchend", function(){
			$(this).off("touchmove");
		});
	});

    // tooltip for form
	$('[data-toggle="tooltip"]').tooltip({
		delay: { show: 300, hide: 1000 }
	});

    // phone number mask
	var keyCode;

	function mask(event) {
		event.keyCode && (keyCode = event.keyCode);
		var pos = this.selectionStart;
		// if (pos < 3) event.preventDefault(); // for Russia
		if (pos < 1) event.preventDefault();
		// var matrix = "+7 (___) ___-__-__", // for Russia
		var matrix = "+_ (___) ___-__-__",
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, ""),
			new_value = matrix.replace(/[_\d]/g, function(a) {
				return i < val.length? val.charAt(i++) || def.charAt(i): a
			});
		i = new_value.indexOf("_");
		if (i != -1) {
			i < 5 && (i = 3);
			new_value = new_value.slice(0, i)
		}
		var reg = matrix.substr(0, this.value.length).replace(/_+/g,
			function(a) {
				return "\\d{1," + a.length + "}"
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
		if (event.type == "blur" && this.value.length < 5) this.value = ""
	}

	var input = document.querySelector("#userphone");
	input.addEventListener("input", mask, false);
	input.addEventListener("focus", mask, false);
	input.addEventListener("blur", mask, false);
	input.addEventListener("keydown", mask, false);

	var input = document.querySelector("#mobileUserphone");
	input.addEventListener("input", mask, false);
	input.addEventListener("focus", mask, false);
	input.addEventListener("blur", mask, false);
	input.addEventListener("keydown", mask, false);

    // scroll Up
    $('.scrollUp').hide();

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.scrollUp').fadeIn('slow');
        } else {
            $('.scrollUp').fadeOut('slow');
        }
    });
    $('.scrollUp').click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
        return false;
    });

    // Google map
    initMap();
});

function initMap() {
    var element = document.getElementById('map');
    var options = {
        zoom: 12,
        center: {lat: 37.773972, lng: -122.431297}
    };

    var myMap = new google.maps.Map(element, options);

    var markers = [
        {
            coordinates: {lat: 37.773972, lng: -122.431297},
            info: '<h3>We are located here</h3>'
        }
    ];

    for(var i = 0; i < markers.length; i++) {
        addMarker(markers[i]);
    }

    function addMarker(properties) {
        var marker = new google.maps.Marker({
            position: properties.coordinates,
            map: myMap
        });

        if(properties.info) {
            var InfoWindow = new google.maps.InfoWindow({
                content: properties.info
            });

            marker.addListener('click', function(){
                InfoWindow.open(myMap, marker);
            })
        }
    }
}



