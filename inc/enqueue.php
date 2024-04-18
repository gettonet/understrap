<?php
/**
 * Elixir enqueue scripts
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! function_exists( 'elixir_scripts' ) ) {
	/**
	 * Load theme's JavaScript and CSS sources.
	 */
	function elixir_scripts() {
		// Get the theme data.
		$the_theme         = wp_get_theme();
		$theme_version     = $the_theme->get( 'Version' );
		$bootstrap_version = get_theme_mod( 'elixir_bootstrap_version', 'bootstrap4' );
		$suffix            = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';

		// Grab asset urls.
		$theme_styles  = "/css/theme{$suffix}.css";
		$theme_scripts = "/js/theme{$suffix}.js";
		if ( 'bootstrap4' === $bootstrap_version ) {
			$theme_styles  = "/css/theme-bootstrap4{$suffix}.css";
			$theme_scripts = "/js/theme-bootstrap4{$suffix}.js";
		}

		$css_version = $theme_version . '.' . filemtime( get_template_directory() . $theme_styles );
		wp_enqueue_style( 'elixir-styles', get_template_directory_uri() . $theme_styles, array(), $css_version );
		// Load  Dashicons only if logged in.
	    /*if ( ! is_user_logged_in() ) {
			wp_dequeue_style('dashicons');
		  }*/

		wp_enqueue_script( 'jquery' );

		$js_version = $theme_version . '.' . filemtime( get_template_directory() . $theme_scripts );
		wp_enqueue_script( 'elixir-scripts', get_template_directory_uri() . $theme_scripts, array(), $js_version, true );
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}

		if(is_page('indeksni-brojevi-otpada') || is_page('media-check')){
			wp_enqueue_script('pdfmake', 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js');
			wp_enqueue_script('pdfmake_fonts', 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js');
			wp_enqueue_script( 'datatables', 'https://cdn.datatables.net/v/bs5/jszip-2.5.0/dt-1.12.1/b-2.2.3/b-colvis-2.2.3/b-html5-2.2.3/b-print-2.2.3/fh-3.2.4/datatables.min.js' );
			wp_enqueue_style( 'datatables-styles', 'https://cdn.datatables.net/v/bs5/jszip-2.5.0/dt-1.12.1/b-2.2.3/b-colvis-2.2.3/b-html5-2.2.3/b-print-2.2.3/fh-3.2.4/datatables.min.css' );
		}

		if(is_page()){
			global $post;
			if ( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, 'prahovo-org-celine') ) {
				wp_enqueue_script( 'raphaeljs', get_template_directory_uri() . '/js/raphael.min.js');
			}
		}

		

	}
} // End of if function_exists( 'elixir_scripts' ).

add_action( 'wp_enqueue_scripts', 'elixir_scripts' );
