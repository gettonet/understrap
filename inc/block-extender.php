<?php

/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.1
 * @package elixir
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */

if (!function_exists('elixir_blocks_assets')) {
	function elixir_blocks_assets()
	{	$theme_version = wp_get_theme()->get( 'Version' );
		$js_version = $theme_version . '.' . filemtime( get_template_directory() . '/js/elixir.admin.js' );
		wp_enqueue_script( 
			'elixir-admin-scripts', 
			get_template_directory_uri() . '/js/elixir.admin.js', 
			array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), // Dependencies, defined above.
			$js_version,
			true );
	}
}

// Hook: Block assets.
add_action( 'enqueue_block_editor_assets', 'elixir_blocks_assets');



function elixir_register_meta(){
register_meta(
	'post',
	'_elixir_title_hidden',
	array(
		'show_in_rest'  => true,
		'single'        => true,
		'type'          => 'boolean',
		'auth_callback' => function() {
			return current_user_can( 'edit_posts' );
		},
	)
);
}
add_action( 'init', 'elixir_register_meta');

if ( ! function_exists( 'elixir_hide_title' ) ) {

	/**
	 * Replace title with blank
	 *
	 * @param string $title The post title.
	 * @param int    $id The post id.
	 *
	 * @return string Returns the new title.
	 */
	function elixir_hide_title( $title, $id = null ) {
		// phpcs:ignore
		if ( ! is_admin() && ! is_search() && in_the_loop() && ( strpos( esc_url( $_SERVER[ 'REQUEST_URI' ] ), '/wp-json/' ) === false ) ) {

			$hidden = get_post_meta( $id, '_elixir_title_hidden', true );
			if ( $hidden ) {

				return '';
			}
		}

		return $title;
	}
	add_filter( 'the_title', 'elixir_hide_title', 90, 2 );
}


// Helper function for LZB - generate 'data-aos' strings

function elixir_generate_data_aos($attributes) {
	$aos[] = 'data-aos="'.$attributes['aos_animation'].'"';
	$aos[] = isset($attributes['aos_delay']) ? 'data-aos-delay="'.$attributes['aos_delay'].'"' : '';
	$aos[] = isset($attributes['aos_duration']) ? 'data-aos-duration="'.$attributes['aos_duration'].'"' : '';
	$aos[] = isset($attributes['aos_easing']) ? 'data-aos-easing="'.$attributes['aos_easing'].'"' : '';
	$aos[] = isset($attributes['aos_loop']) ? 'data-aos-once="false"' : '';
	$aos[] = isset($attributes['aos_mirror']) ? 'data-aos-mirror="true"' : '';
	$aos[] = isset($attributes['aos_anchorPlacement']) ? 'data-aos-anchor-placement="'.$attributes['aos_anchorPlacement'].'"' : '';
	$aos[] = isset($attributes['aos_id']) ? 'data-aos-id="'.$attributes['aos_id'].'"' : '';
	$aos[] = isset($attributes['aos_offset']) ? 'data-aos-offset="'.$attributes['aos_offset'].'"' : '';
	$animation = ' '. implode(' ', array_filter($aos));
	return $animation;
}