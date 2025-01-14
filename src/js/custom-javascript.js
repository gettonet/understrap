import AOS from 'aos';
/*import {
	Fancybox,
	Carousel,
	Panzoom
} from "@fancyapps/ui"; */
import { Fancybox } from "@fancyapps/ui";
import Flickity from "flickity";
import "flickity-fade";
import Masonry from "masonry-layout";
import mixitup from 'mixitup';
import flatpickr from "flatpickr";

import Sticky from 'sticky-js';
var sticky = new Sticky('[data-sticky]', {});

AOS.init({
	once: true,
	duration: 600, // values from 0 to 3000, with step 50ms
	easing: 'ease-in-out',
});
/**
 * Scrollspy
 */
(function ($) {
	$.fn.scrollSpy = function (options) {
		var $Root = $('html');
		var rootScrollBehavior = $Root.css('scroll-behavior');
		var settings = $.extend({
			offset: 0,
			offsetElement: null,
			activeClass: 'active',
			anchors: ['a[href*=\\#]'],
			ignoreAnchors: [],
			scrollDuration: 1,
			scrollEasing: 'swing',
		}, options);

		if ($.ui === undefined) {
			// Fallbacks if jQuery UI is not loaded
			settings = $.extend(settings, {
				scrollEasing: 'swing'
			});
		}

		var scrollTo = function (hash) {
			var $Target = $(hash);
			if ($Target.length) {
				$Root.css('scroll-behavior', 'unset'); // jquery.animate is not compatible with "scroll-behavior: smooth;"
				$Root.animate({ scrollTop: $Target.offset().top - settings.offset }, {
					duration: settings.scrollDuration,
					easing: settings.scrollEasing,
				});
				setTimeout(function () {
					$Root.css('scroll-behavior', rootScrollBehavior);
				}, settings.scrollDuration);
			}
		}

		var update = function () {
			// update offset
			if ($(settings.offsetElement).length) {
				settings = $.extend(settings, {
					offset: $(settings.offsetElement).height(),
				});
			}
		}

		update();
		$(window).on('resize', update);

		/*$(window).on('load', function(){
		  if (location.hash) {
			scrollTo(location.hash);
		  }
		});*/

		return this.each(function () {
			var $ScrollSpy = this;
			var $Anchors = $();
			var scrollMap = [];
			var activeNavElement = undefined;

			if (Array.isArray(settings.anchors)) {
				settings.anchors.forEach(function (e) {
					$Anchors = $Anchors.add($($ScrollSpy).find(e));
				});
			}

			if (Array.isArray(settings.ignoreAnchors)) {
				settings.ignoreAnchors.forEach(function (e) {
					$Anchors = $Anchors.filter(':not(' + e + ')');
				});
			}

			var updateScrollMap = function () {
				$Anchors.each((i, el) => {
					var $Target = $(el.hash);

					if ($Target.length) {
						scrollMap.push({
							navElement: el,
							targetOffset: $Target.offset(),
							targetHeight: $Target.outerHeight(),
						});
					}
				});
				scrollMap.sort(function (a, b) {
					return a.targetOffset.top - b.targetOffset.top;
				})
				scrollMap.reverse();
			}

			updateScrollMap();
			$(window).on('resize', updateScrollMap);

			var scrollSpy = function () {
				var scrollPos = $(document).scrollTop() + settings.offset;
				var posElement = scrollMap.find(function (el) {
					if (el.targetOffset.top <= scrollPos) {
						if (el.targetOffset.top + el.targetHeight >= scrollPos) {
							return true;
						}
					}
				});

				if (posElement && posElement.navElement != activeNavElement) {
					$(activeNavElement).removeClass(settings.activeClass);
					$(posElement.navElement).addClass(settings.activeClass);
					activeNavElement = posElement.navElement;
				} else if (!posElement) {
					$(activeNavElement).removeClass(settings.activeClass);
					activeNavElement = undefined;
				}
			};
			scrollSpy();
			$(document).on('scroll', scrollSpy);

			$Anchors.click(function (e) {
				//e.preventDefault();
				var hash = e.currentTarget.hash;
				history.pushState({}, '', hash);
				//scrollTo(hash);
			});
		});
	}
})(jQuery);

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
				ready: function () {
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
				onMixStart: function (state, futureState) {
					$('#no-jobs-found').hide();
				},
				onMixFail: function (state) {
					$('#no-jobs-found').fadeIn();
				}
			}
		});
		$(document).on('change', '#jobs-company, #jobs-location', function () {
			var c = '',
				l = '';
			if ($('#jobs-company').val()) {
				c = '.company-' + $('#jobs-company').val();
			}

			if ($('#jobs-location').val()) {
				l = '.location-' + $('#jobs-location').val();
			}

			if ((c + l).length) {
				op_mixer.filter(c + l);
			} else {
				op_mixer.show()
			}
		});
		$('#reset-job-mix').on('click', function () {
			$('#jobs-company').prop('selectedIndex', 0);
			$('#jobs-location').prop('selectedIndex', 0);
			op_mixer.show();
		});
	}

	$('#navbar-koraci').scrollSpy({
		offsetElement: '#wrapper-navbar',
	});
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

	let isContentBoxVisible = false;
	function setContentBoxMargin() {
		// Select the .content-col element
		const contentCol = document.querySelector('.content-col');
		if (!contentCol) return;

		// Calculate the total height of the inner elements
		let innerHeight = 0;
		contentCol.childNodes.forEach(child => {
			if (child.nodeType === Node.ELEMENT_NODE) {
				innerHeight += child.offsetHeight;
			}
		});

		// Calculate the empty vertical space
		const emptySpace = contentCol.offsetHeight - innerHeight - 60;

		// Select the .content-box element
		const contentBox = document.querySelector('.content-box');
		if (!contentBox) return;

		// Set the CSS variable --content-box-margin
		contentBox.style.setProperty('--content-box-margin', `-${emptySpace}px`);

		// Apply the margin-top to .content-box using the CSS variable
		contentBox.style.marginTop = `var(--content-box-margin)`;

		if (!isContentBoxVisible) {
			contentBox.style.opacity = 1;
			isContentBoxVisible = true;
		}
	}

	// Call the function initially to set the margin
	setContentBoxMargin();

	// Optionally, you can call this function again if the layout changes (e.g., on window resize)
	window.addEventListener('resize', setContentBoxMargin);

	// Listen for the form's submit event to disable the button immediately
	document.querySelectorAll('.wpcf7 form').forEach(function (form) {
		form.addEventListener('submit', function () {
			const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');

			if (submitButton) {
				// Store the current button text or input value in a data attribute
				if (submitButton.tagName === 'BUTTON') {
					submitButton.dataset.originalText = submitButton.textContent;
					submitButton.textContent = 'Molimo sačekajte...';
				} else if (submitButton.tagName === 'INPUT') {
					submitButton.dataset.originalText = submitButton.value;
					submitButton.value = 'Molimo sačekajte...';
				}

				submitButton.disabled = true;
			}
		});
	});

	// Re-enable the button when the form submission is complete
	document.addEventListener('wpcf7submit', function (event) {
		const form = event.target;
		const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');

		if (submitButton) {
			submitButton.disabled = false;

			// Restore the original button text or input value
			if (submitButton.tagName === 'BUTTON') {
				submitButton.textContent = submitButton.dataset.originalText || 'Submit';
			} else if (submitButton.tagName === 'INPUT') {
				submitButton.value = submitButton.dataset.originalText || 'Submit';
			}
		}
	});

	document.querySelectorAll('.wpcf7-datetimepicker').forEach(function (input) {
		flatpickr(input, {
			enableTime: true,
			time_24hr: true,
			dateFormat: "d.m.Y H:i",
			maxDate: "today"
		});
	});
});