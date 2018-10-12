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