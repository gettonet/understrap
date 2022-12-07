<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package Elixir
 */

// Exit if accessed directly.
// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
	
	require_once ABSPATH . 'wp-admin/includes/post.php';
	$page404 = post_exists( '404','','','page');

	if ( $page404 ) {
		$page404post = get_post($page404);
		echo apply_filters('the_content' , $page404post -> post_content ); 
	}
	else {
		echo "Match not found dude";
	}

get_footer();