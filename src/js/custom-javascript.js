import AOS from 'aos';
/*import {
	Fancybox,
	Carousel,
	Panzoom
} from "@fancyapps/ui"; */
import {Fancybox} from "@fancyapps/ui";
import Flickity from "flickity";
import "flickity-fade";
import Masonry from "masonry-layout";
import mixitup from 'mixitup';

AOS.init({
	once: true,
	duration: 600, // values from 0 to 3000, with step 50ms
	easing: 'ease-in-out',
});


jQuery(function ($) {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 0 && !($('body').hasClass('footer-visible'))) {
			$('#scrollToTopBtn').fadeIn();
		} else {
			$('#scrollToTopBtn').fadeOut();
		}
	});

	$(document).on('click', '#scrollToTopBtn', scrollToTop);

	function scrollToTop() {
		$('html, body').animate({ scrollTop: 0 }, 800);
	}

	
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
		var flkty = Flickity.data('.preporuke-djubrenja-slider', {
			on: {
			  ready: function() {
				console.log('Flickity ready');
				$('.preporuke-djubrenja-slider article').addClass('h-100');
			  }
			}
		  });
		var pdj_tab = document.querySelector('#preporuke-djubrenja-nav');
			pdj_tab.addEventListener('shown.bs.tab', function (event) {
			var flkty = Flickity.data('.preporuke-djubrenja-slider');
			flkty.resize();
			$('.preporuke-djubrenja-slider article').addClass('h-100');
			console.log('Resized');
			
		});

	}

	if ($('#preporuke-djubrenja-mix').length) {
		var pdj_mixer = mixitup('#preporuke-djubrenja-mix');
	}

	if ($('#oglasi-za-posao-mix').length) {
		var op_mixer = mixitup('#oglasi-za-posao-mix', {
			callbacks: {
				onMixStart: function(state, futureState){
					$('#no-jobs-found').hide();
				},
				onMixFail: function(state){
				  $('#no-jobs-found').fadeIn();
				}
			  }
		});
		$(document).on('change', '#jobs-company, #jobs-location', function(){
			var c = '',
			l = '';
			if($('#jobs-company').val()) {
				c = '.company-'+$('#jobs-company').val();
			}
			if($('#jobs-location').val()) {
				l = '.location-'+$('#jobs-location').val();
			}
			if((c+l).length){
				op_mixer.filter(c+l);
			} else {
				op_mixer.show()
			}
		});
		$('#reset-job-mix').on('click', function(){
			$('#jobs-company').prop('selectedIndex',0);
			$('#jobs-location').prop('selectedIndex',0);
			op_mixer.show();
		});		
	}


});

document.addEventListener("DOMContentLoaded", function () {
function handleIntersection(entries) {
	let isInViewport = false;

	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			isInViewport = true;
		}
	});

	if (isInViewport) {
		document.body.classList.add('footer-visible');
	} else {
		document.body.classList.remove('footer-visible');
	}
}

if (document.querySelector('#scrollToTopBtn')) {
	const targetElement = document.querySelector('#wrapper-footer');
	const observer = new IntersectionObserver(handleIntersection);
	observer.observe(targetElement);
}

});