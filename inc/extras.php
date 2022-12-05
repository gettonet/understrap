<?php
/**
 * Custom functions that act independently of the theme templates
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

add_filter( 'body_class', 'elixir_body_classes' );

if ( ! function_exists( 'elixir_body_classes' ) ) {
	/**
	 * Adds custom classes to the array of body classes.
	 *
	 * @param array $classes Classes for the body element.
	 *
	 * @return array
	 */
	function elixir_body_classes( $classes ) {
		// Adds a class of group-blog to blogs with more than 1 published author.
		if ( is_multi_author() ) {
			$classes[] = 'group-blog';
		}
		// Adds a class of hfeed to non-singular pages.
		if ( ! is_singular() ) {
			$classes[] = 'hfeed';
		}

		// Adds a body class based on the presence of a sidebar.
		$sidebar_pos = get_theme_mod( 'elixir_sidebar_position' );
		if ( is_page_template( 'page-templates/fullwidthpage.php' ) ) {
			$classes[] = 'elixir-no-sidebar';
		} elseif (
			is_page_template(
				array(
					'page-templates/both-sidebarspage.php',
					'page-templates/left-sidebarpage.php',
					'page-templates/right-sidebarpage.php',
				)
			)
		) {
			$classes[] = 'elixir-has-sidebar';
		} elseif ( 'none' !== $sidebar_pos ) {
			$classes[] = 'elixir-has-sidebar';
		} else {
			$classes[] = 'elixir-no-sidebar';
		}
		global $post;
		if($color_palette = carbon_get_post_meta($post->ID, 'color_palette')){
			$classes[] = 'theme-'.$color_palette;
		}
		return $classes;
	}
}

if ( function_exists( 'elixir_adjust_body_class' ) ) {
	/*
	 * elixir_adjust_body_class() deprecated in v0.9.4. We keep adding the
	 * filter for child themes which use their own elixir_adjust_body_class.
	 */
	add_filter( 'body_class', 'elixir_adjust_body_class' );
}

// Filter custom logo with correct classes.
add_filter( 'get_custom_logo', 'elixir_change_logo_class' );

if ( ! function_exists( 'elixir_change_logo_class' ) ) {
	/**
	 * Replaces logo CSS class.
	 *
	 * @param string $html Markup.
	 *
	 * @return string
	 */
	function elixir_change_logo_class( $html ) {

		$html = str_replace( 'class="custom-logo"', 'class="img-fluid"', $html );
		$html = str_replace( 'class="custom-logo-link"', 'class="navbar-brand custom-logo-link"', $html );
		$html = str_replace( 'alt=""', 'title="Home" alt="logo"', $html );

		return $html;
	}
}

if ( ! function_exists( 'elixir_pingback' ) ) {
	/**
	 * Add a pingback url auto-discovery header for single posts of any post type.
	 */
	function elixir_pingback() {
		if ( is_singular() && pings_open() ) {
			echo '<link rel="pingback" href="' . esc_url( get_bloginfo( 'pingback_url' ) ) . '">' . "\n";
		}
	}
}
add_action( 'wp_head', 'elixir_pingback' );

if ( ! function_exists( 'elixir_mobile_web_app_meta' ) ) {
	/**
	 * Add mobile-web-app meta.
	 */
	function elixir_mobile_web_app_meta() {
		echo '<meta name="mobile-web-app-capable" content="yes">' . "\n";
		echo '<meta name="apple-mobile-web-app-capable" content="yes">' . "\n";
		echo '<meta name="apple-mobile-web-app-title" content="' . esc_attr( get_bloginfo( 'name' ) ) . ' - ' . esc_attr( get_bloginfo( 'description' ) ) . '">' . "\n";
	}
}
add_action( 'wp_head', 'elixir_mobile_web_app_meta' );

if ( ! function_exists( 'elixir_default_body_attributes' ) ) {
	/**
	 * Adds schema markup to the body element.
	 *
	 * @param array $atts An associative array of attributes.
	 * @return array
	 */
	function elixir_default_body_attributes( $atts ) {
		$atts['itemscope'] = '';
		$atts['itemtype']  = 'http://schema.org/WebSite';
		return $atts;
	}
}
add_filter( 'elixir_body_attributes', 'elixir_default_body_attributes' );

// Escapes all occurances of 'the_archive_description'.
add_filter( 'get_the_archive_description', 'elixir_escape_the_archive_description' );

if ( ! function_exists( 'elixir_escape_the_archive_description' ) ) {
	/**
	 * Escapes the description for an author or post type archive.
	 *
	 * @param string $description Archive description.
	 * @return string Maybe escaped $description.
	 */
	function elixir_escape_the_archive_description( $description ) {
		if ( is_author() || is_post_type_archive() ) {
			return wp_kses_post( $description );
		}

		/*
		 * All other descriptions are retrieved via term_description() which returns
		 * a sanitized description.
		 */
		return $description;
	}
} // End of if function_exists( 'elixir_escape_the_archive_description' ).

// Escapes all occurances of 'the_title()' and 'get_the_title()'.
add_filter( 'the_title', 'elixir_kses_title' );

// Escapes all occurances of 'the_archive_title' and 'get_the_archive_title()'.
add_filter( 'get_the_archive_title', 'elixir_kses_title' );

if ( ! function_exists( 'elixir_kses_title' ) ) {
	/**
	 * Sanitizes data for allowed HTML tags for post title.
	 *
	 * @param string $data Post title to filter.
	 * @return string Filtered post title with allowed HTML tags and attributes intact.
	 */
	function elixir_kses_title( $data ) {
		// Tags not supported in HTML5 are not allowed.
		$allowed_tags = array(
			'abbr'             => array(),
			'aria-describedby' => true,
			'aria-details'     => true,
			'aria-label'       => true,
			'aria-labelledby'  => true,
			'aria-hidden'      => true,
			'b'                => array(),
			'bdo'              => array(
				'dir' => true,
			),
			'blockquote'       => array(
				'cite'     => true,
				'lang'     => true,
				'xml:lang' => true,
			),
			'cite'             => array(
				'dir'  => true,
				'lang' => true,
			),
			'dfn'              => array(),
			'em'               => array(),
			'i'                => array(
				'aria-describedby' => true,
				'aria-details'     => true,
				'aria-label'       => true,
				'aria-labelledby'  => true,
				'aria-hidden'      => true,
				'class'            => true,
			),
			'code'             => array(),
			'del'              => array(
				'datetime' => true,
			),
			'img'              => array(
				'src'    => true,
				'alt'    => true,
				'width'  => true,
				'height' => true,
				'class'  => true,
				'style'  => true,
			),
			'ins'              => array(
				'datetime' => true,
				'cite'     => true,
			),
			'kbd'              => array(),
			'mark'             => array(),
			'pre'              => array(
				'width' => true,
			),
			'q'                => array(
				'cite' => true,
			),
			's'                => array(),
			'samp'             => array(),
			'span'             => array(
				'dir'      => true,
				'align'    => true,
				'lang'     => true,
				'xml:lang' => true,
			),
			'small'            => array(),
			'strong'           => array(),
			'sub'              => array(),
			'sup'              => array(),
			'u'                => array(),
			'var'              => array(),
		);
		$allowed_tags = apply_filters( 'elixir_kses_title', $allowed_tags );

		return wp_kses( $data, $allowed_tags );
	}
} // End of if function_exists( 'elixir_kses_title' ).

if ( ! function_exists( 'elixir_hide_posted_by' ) ) {
	/**
	 * Hides the posted by markup in `elixir_posted_on()`.
	 *
	 * @param string $byline Posted by HTML markup.
	 * @return string Maybe filtered posted by HTML markup.
	 */
	function elixir_hide_posted_by( $byline ) {
		if ( is_author() ) {
			return '';
		}
		return $byline;
	}
}
add_filter( 'elixir_posted_by', 'elixir_hide_posted_by' );


add_filter( 'excerpt_more', 'elixir_custom_excerpt_more' );

if ( ! function_exists( 'elixir_custom_excerpt_more' ) ) {
	/**
	 * Removes the ... from the excerpt read more link
	 *
	 * @param string $more The excerpt.
	 *
	 * @return string
	 */
	function elixir_custom_excerpt_more( $more ) {
		if ( ! is_admin() ) {
			$more = '';
		}
		return $more;
	}
}


