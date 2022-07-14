<?php

/**
 * Elixic Block patterns
 *
 * @package Elixir
 */

if (!defined('ABSPATH')) {
	exit;
}

// turn our block patterns cpt into block patterns
function elixir_register_block_patterns() {

	register_block_pattern_category( 'elixir-cbp', [
		'label' => 'Elixir',
	] );

	$the_query = new \WP_Query( [
		'post_type'              => 'elixir-cbp',
		'posts_per_page'         => -1,
		'no_found_rows'          => true,
		'update_post_meta_cache' => false,
		'update_post_term_cache' => false,
	] );

	foreach ( $the_query->posts as $parts ) :
		$pid     = $parts->ID;
		$options = [
			'title'      => $parts->post_title,
            //'description'   => _x( 'Elixir block pattern', 'Block pattern description', 'elixir' ),
			'content'    => $parts->post_content,
			'categories' => [ 'elixir-cbp' ],
		];

		$viewport    = apply_filters( 'elixir_cbp_viewport_width', 0, $pid );
		$block_types = apply_filters( 'elixir_cbp_block_types', [], $pid );

		if ( $viewport ) $options['viewportWidth']            = $viewport;
		if ( ! empty( $block_types ) ) $options['blockTypes'] = $block_types;

		register_block_pattern( 'elixir-cbp/pattern-' . $pid, $options );
	endforeach;
	wp_reset_postdata();
}

add_action( 'init', 'elixir_register_block_patterns', 20 );