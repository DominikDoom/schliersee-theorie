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
	fetch("./img/" + day + "/" + filename)
		.then(response => response.json())
		.then(jsonResponse => parseImageList(day, jsonResponse));
}
// Add an element to the thumbnail sidebar for each image in the JSON array
function parseImageList(day, jsonObj) {
	var sb = $(".imageSidebar");
	sb.empty();
	$.each(jsonObj['images'], function (index, element) {
		sb.append("<img class='thumbnail' src='./img/" + day + "/thumbs/" + element + "' data-preview='./img/" + day + "/preview/" + element + "' data-path='./img/" + day + "/" + element + "'>");
	});
}

$(document).on("click", ".thumbnail", function () {
	var ct = $(".imageContent");
	var path = $(this).attr("data-path");
	var previewpath = $(this).attr("data-preview");
	ct.css("background-image", "url(" + previewpath + ")");
	ct.empty();
	ct.append("<a class='orgLink' href='" + path + "' target='_blank'>Original anzeigen</a>");
});

$(document).on("click", "#imageViewer-closeButton", function () {
	$(".imageViewerOverlay").css("display", "none");
	$(".imageSidebar").empty();
	$(".imageContent").empty();
	$(".imageContent").css("background-image", "none");

	// un-lock scroll position
	var html = jQuery('html');
	var scrollPosition = html.data('scroll-position');
	html.css('overflow', html.data('previous-overflow'));
	window.scrollTo(scrollPosition[0], scrollPosition[1])
});


// Change Tour Info
function changeTourInfo(day) {
	var p = $(".infoTable");
	var length = p.find("#length").find(".value"),
		maxSpeed = p.find("#maxSpeed").find(".value"),
		recTime = p.find("#recTime").find(".value"),
		recSpeed = p.find("#recSpeed").find(".value"),
		moveTime = p.find("#moveTime").find(".value"),
		moveSpeed = p.find("#moveSpeed").find(".value"),
		altDiff = p.find("#altDiff").find(".value"),
		vertClimb = p.find("#vertClimb").find(".value"),
		maxHeight = p.find("#maxHeight").find(".value"),
		vertDist = p.find("#vertDist").find(".value"),
		minHeight = p.find("#minHeight").find(".value"),
		vertSpeed = p.find("#vertSpeed").find(".value"),
		maxClimb = p.find("#maxClimb").find(".value"),
		minClimb = p.find("#minClimb").find(".value"),
		avgClimb = p.find("#avgClimb").find(".value")

	p.parent().css("height",($(".mapNav").height() - 90) + "px");

	switch (day) {
		case "Tag1":
			p.css("display","table");
			length.text("7,31");
			maxSpeed.text("5,85");
			recTime.text("02:42:11");
			recSpeed.text("2,71");
			moveTime.text("01:54:11");
			moveSpeed.text("3,84");
			altDiff.text("262");
			vertClimb.text("292");
			maxHeight.text("1085");
			vertDist.text("570");
			minHeight.text("823");
			vertSpeed.text("0,08");
			maxClimb.text("19°");
			minClimb.text("-18°");
			avgClimb.text("0°");
			break;
		case "Tag2":
			p.css("display","table");
			length.text("16,17");
			maxSpeed.text("7,63");
			recTime.text("09:34:19");
			recSpeed.text("1,69");
			moveTime.text("05:16:27");
			moveSpeed.text("3,07");
			altDiff.text("861");
			vertClimb.text("953");
			maxHeight.text("1702");
			vertDist.text("1910");
			minHeight.text("842");
			vertSpeed.text("0,1");
			maxClimb.text("27°");
			minClimb.text("-21°");
			avgClimb.text("0°");
			break;
		case "Tag3":
			p.css("display","table");		
			length.text("11,43");
			maxSpeed.text("5,7");
			recTime.text("08:10:46");
			recSpeed.text("1,4");
			moveTime.text("05:10:19");
			moveSpeed.text("2,21");
			altDiff.text("921");
			vertClimb.text("1333");
			maxHeight.text("1772");
			vertDist.text("1753");
			minHeight.text("851");
			vertSpeed.text("0,09");
			maxClimb.text("32°");
			minClimb.text("-14°");
			avgClimb.text("5°");
			break;
		case "Tag4":
			p.css("display","table");
			length.text("11,27");
			maxSpeed.text("7,06");
			recTime.text("04:17:51");
			recSpeed.text("2,62");
			moveTime.text("03:05:34");
			moveSpeed.text("3,64");
			altDiff.text("1073");
			vertClimb.text("138");
			maxHeight.text("1907");
			vertDist.text("1224");
			minHeight.text("834");
			vertSpeed.text("0,11");
			maxClimb.text("7°");
			minClimb.text("-24°");
			avgClimb.text("-6°");
			break;
		case "deselect":
			p.css("display","none");
			break;
	}
}