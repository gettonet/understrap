<?php

/**
 * Post rendering content according to caller of get_template_part
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;


$layout = isset($args['layout']) ? $args['layout'] : 'columns';

echo get_template_part( 'template-parts/content', $layout , $args ); 
?>
