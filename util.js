var lastScrollTop = 0;
$(document).on("scroll", function () {
	var st = $(this).scrollTop();
	if (st > lastScrollTop) {
		if ($(document).scrollTop() < 5) {
			$([document.documentElement]).stop(true, false).animate({
				scrollTop: $(".generalInfo").offset().top
			}, 1000);
		}
	} else {
		// upscroll code
	}
	lastScrollTop = st;
});

// Function to download data to a file
function download(data, filename, type) {
	var file = new Blob([data], {
		type: type
	});
	if (window.navigator.msSaveOrOpenBlob) // IE10+
		window.navigator.msSaveOrOpenBlob(file, filename);
	else { // Others
		var a = document.createElement("a"),
			url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function () {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
}

// Scroll to top
$(document).ready(function () {

	// Der Button wird mit JavaScript erzeugt und vor dem Ende des body eingebunden.
	var back_to_top_button = ['<a class="backToTop" href="#" onclick="return false;" style="display: none;">Zurück zum Seitenanfang</a>'].join("");
	$("body").append(back_to_top_button)

	// Der Button wird ausgeblendet
	$(".backToTop").hide();

	// Funktion für das Scroll-Verhalten
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) { // Wenn 100 Pixel gescrolled wurde
				$('.backToTop').fadeIn();
			} else {
				$('.backToTop').fadeOut();
			}
		});

		$('.backToTop').click(function () { // Klick auf den Button
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

});

// Image Viewer Stuff

// Load JSON file containing image names for a specific location
function loadImages(day, filename) {
	fetch("./img/" + day +"/"+ filename)
	.then(response => response.json())
	  .then(jsonResponse => parseImageList(day, jsonResponse));
}
// Add an element to the thumbnail sidebar for each image in the JSON array
function parseImageList(day,jsonObj) {
	var sb = $(".imageSidebar");
	sb.empty();
	$.each(jsonObj['images'], function(index, element) {
		sb.append("<img class='thumbnail' src='./img/"+day+"/thumbs/"+element+"' data-preview='./img/"+day+"/preview/"+element+"' data-path='./img/"+day+"/"+element+"'>");
	});
}

$(document).on("click",".thumbnail",function () {
	var ct = $(".imageContent");
	var path = $(this).attr("data-path");
	var previewpath = $(this).attr("data-preview");
	ct.css("background-image","url("+previewpath+")");
	ct.empty();
	ct.append("<a class='orgLink' href='"+path+"' target='_blank'>Original anzeigen</a>");
});