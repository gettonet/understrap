<?php
/**
 * Theme basic setup
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

// Set the content width based on the theme's design and stylesheet.
if ( ! isset( $content_width ) ) {
	$content_width = ''; /* pixels */
}

add_action( 'after_setup_theme', 'elixir_setup' );

if ( ! function_exists( 'elixir_setup' ) ) {
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function elixir_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on elixir, use a find and replace
		 * to change 'elixir' to the name of your theme in all the template files
		 */
		load_theme_textdomain( 'elixir', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'primary' => __( 'Primary Menu', 'elixir' ),
				'footer-1' => __( 'Footer (1)', 'elixir' ),
				'footer-2' => __( 'Footer (2)', 'elixir' ),
				'footer-3' => __( 'Footer (3)', 'elixir' ),
				'footer-4' => __( 'Footer (4)', 'elixir' ),
				'footer-5' => __( 'Footer (5)', 'elixir' ),
				'footer-6' => __( 'Footer (6)', 'elixir' ),
				'footer-legal' => __( 'Footer (legal)', 'elixir' ),
				'elixirZorka' => __( 'Elixir Zorka', 'elixir' ),
				'elixirPrahovo' => __( 'Elixir Prahovo', 'elixir' ),
				'elixirAgrar' => __( 'Elixir Agrar', 'elixir' ),
				'elixirCraft' => __( 'Elixir Craft', 'elixir' ),
				'elixirFeed' => __( 'Elixir Feed', 'elixir' ),
				'elixirFondacija' => __( 'Elixir Fondacija', 'elixir' ),

			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'script',
				'style',
			)
		);

		/*
		 * Adding Thumbnail basic support
		 */
		add_theme_support( 'post-thumbnails' );
		add_image_size( 'xlarge', 1296, 9999 );
		/*
		 * Adding support for Widget edit icons in customizer
		 */
		add_theme_support( 'customize-selective-refresh-widgets' );

		/*
		 * Enable support for Post Formats.
		 * See http://codex.wordpress.org/Post_Formats
		 */
		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'elixir_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Set up the WordPress Theme logo feature.
		add_theme_support( 'custom-logo' );

		// Add support for responsive embedded content.
		add_theme_support( 'responsive-embeds' );


		// Add support for page excerpts.	
		add_post_type_support( 'page', 'excerpt' );

		// Check and setup theme default settings.
		elixir_setup_theme_default_settings();

	}
}
