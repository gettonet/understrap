import AOS from 'aos';
import {
	Fancybox,
	Carousel,
	Panzoom
} from "@fancyapps/ui";
import Flickity from "flickity";
import Masonry from "masonry-layout";
import mixitup from 'mixitup';

AOS.init({
	once: true,
	duration: 600, // values from 0 to 3000, with step 50ms
	easing: 'ease-in-out',
});


jQuery(function ($) {
	document.addEventListener('aos:in:elixir-countup', ({
		detail
	}) => {
		elixirCountup(detail);
	})

	if ($('[data-aos-id="elixir-countup"]').length) {
		$('[data-aos-id="elixir-countup"]').each(function () {
			if ($(this).hasClass('aos-animate')) {
				elixirCountup($(this));
			}
		})
	}


	function elixirCountup(element) {
		$(element).prop('Counter', 0).animate({
			Counter: $(element).data('count')
		}, {
			duration: 5000,
			easing: 'swing',
			step: function (now) {
				//$(element).text(Math.ceil(now).toLocaleString('sr-RS'))
				$(element).text(Math.ceil(now))
			}
		});
	}

	/*$('.main-carousel').flickity({
	    // options
	    cellAlign: 'left',
	    contain: true
	  });*/

	if ($('#preporuke-djubrenja-nav').length) {
		var pdj_tab = document.querySelector('#preporuke-djubrenja-nav');
		pdj_tab.addEventListener('shown.bs.tab', function (event) {
			var flkty = Flickity.data('.preporuke-djubrenja-slider');
			flkty.resize();
			console.log('Resized');
		});

	}

	if ($('#preporuke-djubrenja-mix').length) {
		var mixer = mixitup('#preporuke-djubrenja-mix');
	}


});
