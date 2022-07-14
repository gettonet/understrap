<?php
/**
 * Elixir Theme Customizer
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Add postMessage support for site title and description for the Theme Customizer.
 *
 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
 */
if ( ! function_exists( 'elixir_customize_register' ) ) {
	/**
	 * Register basic customizer support.
	 *
	 * @param object $wp_customize Customizer reference.
	 */
	function elixir_customize_register( $wp_customize ) {
		$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
		$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
		$wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';
	}
}
add_action( 'customize_register', 'elixir_customize_register' );

if ( ! function_exists( 'elixir_theme_customize_register' ) ) {
	/**
	 * Register individual settings through customizer's API.
	 *
	 * @param WP_Customize_Manager $wp_customize Customizer reference.
	 */
	function elixir_theme_customize_register( $wp_customize ) {

		// Theme layout settings.
		$wp_customize->add_section(
			'elixir_theme_layout_options',
			array(
				'title'       => __( 'Theme Layout Settings', 'elixir' ),
				'capability'  => 'edit_theme_options',
				'description' => __( 'Container width and sidebar defaults', 'elixir' ),
				'priority'    => apply_filters( 'elixir_theme_layout_options_priority', 160 ),
			)
		);

		/**
		 * Select sanitization function
		 *
		 * @param string               $input   Slug to sanitize.
		 * @param WP_Customize_Setting $setting Setting instance.
		 * @return string Sanitized slug if it is a valid choice; otherwise, the setting default.
		 */
		function elixir_theme_slug_sanitize_select( $input, $setting ) {

			// Ensure input is a slug (lowercase alphanumeric characters, dashes and underscores are allowed only).
			$input = sanitize_key( $input );

			// Get the list of possible select options.
			$choices = $setting->manager->get_control( $setting->id )->choices;

			// If the input is a valid key, return it; otherwise, return the default.
			return ( array_key_exists( $input, $choices ) ? $input : $setting->default );

		}

		$wp_customize->add_setting(
			'elixir_bootstrap_version',
			array(
				'default'           => 'bootstrap4',
				'type'              => 'theme_mod',
				'sanitize_callback' => 'sanitize_text_field',
				'capability'        => 'edit_theme_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'elixir_bootstrap_version',
				array(
					'label'       => __( 'Bootstrap Version', 'elixir' ),
					'description' => __( 'Choose between Bootstrap 4 or Bootstrap 5', 'elixir' ),
					'section'     => 'elixir_theme_layout_options',
					'settings'    => 'elixir_bootstrap_version',
					'type'        => 'select',
					'choices'     => array(
						'bootstrap4' => __( 'Bootstrap 4', 'elixir' ),
						'bootstrap5' => __( 'Bootstrap 5', 'elixir' ),
					),
					'priority'    => apply_filters( 'elixir_bootstrap_version_priority', 10 ),
				)
			)
		);

		$wp_customize->add_setting(
			'elixir_container_type',
			array(
				'default'           => 'container',
				'type'              => 'theme_mod',
				'sanitize_callback' => 'elixir_theme_slug_sanitize_select',
				'capability'        => 'edit_theme_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'elixir_container_type',
				array(
					'label'       => __( 'Container Width', 'elixir' ),
					'description' => __( 'Choose between Bootstrap\'s container and container-fluid', 'elixir' ),
					'section'     => 'elixir_theme_layout_options',
					'settings'    => 'elixir_container_type',
					'type'        => 'select',
					'choices'     => array(
						'container'       => __( 'Fixed width container', 'elixir' ),
						'container-fluid' => __( 'Full width container', 'elixir' ),
					),
					'priority'    => apply_filters( 'elixir_container_type_priority', 10 ),
				)
			)
		);

		$wp_customize->add_setting(
			'elixir_navbar_type',
			array(
				'default'           => 'collapse',
				'type'              => 'theme_mod',
				'sanitize_callback' => 'sanitize_text_field',
				'capability'        => 'edit_theme_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'elixir_navbar_type',
				array(
					'label'             => __( 'Responsive Navigation Type', 'elixir' ),
					'description'       => __(
						'Choose between an expanding and collapsing navbar or an offcanvas drawer.',
						'elixir'
					),
					'section'           => 'elixir_theme_layout_options',
					'settings'          => 'elixir_navbar_type',
					'type'              => 'select',
					'sanitize_callback' => 'elixir_theme_slug_sanitize_select',
					'choices'           => array(
						'collapse'  => __( 'Collapse', 'elixir' ),
						'offcanvas' => __( 'Offcanvas', 'elixir' ),
					),
					'priority'          => apply_filters( 'elixir_navbar_type_priority', 20 ),
				)
			)
		);

		$wp_customize->add_setting(
			'elixir_sidebar_position',
			array(
				'default'           => 'right',
				'type'              => 'theme_mod',
				'sanitize_callback' => 'sanitize_text_field',
				'capability'        => 'edit_theme_options',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Control(
				$wp_customize,
				'elixir_sidebar_position',
				array(
					'label'             => __( 'Sidebar Positioning', 'elixir' ),
					'description'       => __(
						'Set sidebar\'s default position. Can either be: right, left, both or none. Note: this can be overridden on individual pages.',
						'elixir'
					),
					'section'           => 'elixir_theme_layout_options',
					'settings'          => 'elixir_sidebar_position',
					'type'              => 'select',
					'sanitize_callback' => 'elixir_theme_slug_sanitize_select',
					'choices'           => array(
						'right' => __( 'Right sidebar', 'elixir' ),
						'left'  => __( 'Left sidebar', 'elixir' ),
						'both'  => __( 'Left & Right sidebars', 'elixir' ),
						'none'  => __( 'No sidebar', 'elixir' ),
					),
					'priority'          => apply_filters( 'elixir_sidebar_position_priority', 20 ),
				)
			)
		);

	}
} // End of if function_exists( 'elixir_theme_customize_register' ).
add_action( 'customize_register', 'elixir_theme_customize_register' );

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
if ( ! function_exists( 'elixir_customize_preview_js' ) ) {
	/**
	 * Setup JS integration for live previewing.
	 */
	function elixir_customize_preview_js() {
		wp_enqueue_script(
			'elixir_customizer',
			get_template_directory_uri() . '/js/customizer.js',
			array( 'customize-preview' ),
			'20130508',
			true
		);
	}
}
add_action( 'customize_preview_init', 'elixir_customize_preview_js' );

/**
 * Loads javascript for conditionally showing customizer controls.
 */
if ( ! function_exists( 'elixir_customize_controls_js' ) ) {
	/**
	 * Setup JS integration for live previewing.
	 */
	function elixir_customize_controls_js() {
		wp_enqueue_script(
			'elixir_customizer',
			get_template_directory_uri() . '/js/customizer-controls.js',
			array( 'customize-preview' ),
			'20130508',
			true
		);
	}
}
add_action( 'customize_controls_enqueue_scripts', 'elixir_customize_controls_js' );



if ( ! function_exists( 'elixir_default_navbar_type' ) ) {
	/**
	 * Overrides the responsive navbar type for Bootstrap 4
	 *
	 * @param string $current_mod
	 * @return string
	 */
	function elixir_default_navbar_type( $current_mod ) {

		if ( 'bootstrap5' !== get_theme_mod( 'elixir_bootstrap_version' ) ) {
			$current_mod = 'collapse';
		}

		return $current_mod;
	}
}
add_filter( 'theme_mod_elixir_navbar_type', 'elixir_default_navbar_type', 20 );
