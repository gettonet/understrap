<?php

/**
 * Shortcodes to make our lifde easier
 *
 * @package Elixir
 */

if (!defined('ABSPATH')) {
    exit;
}

function elixir_preporuke_djubrenja()
{
    $args = array(
        'post_type' => 'preporuka_djubrenja',
        'post_status' => 'publish',
        'posts_per_page' => -1,
    );
    
    $params['class'] = 'mix col-md-6 col-lg-4 mb-4';   

    $the_query = new WP_Query($args);

    ob_start();
    ?>
    <div class="mb-5 d-flex flex-wrap justify-content-center">
    <button type="button" class="btn btn-outline-primary m-1" data-filter="all"><?php echo __('All', 'elixir'); ?></button>
    <button type="button" class="btn btn-outline-primary m-1" data-filter=".category-ratarstvo">Ratarstvo</button>
    <button type="button" class="btn btn-outline-primary m-1" data-filter=".category-povrtarstvo">Povrtarstvo</button>
    <button type="button" class="btn btn-outline-primary m-1" data-filter=".category-vocarstvo">Voćarstvo</button>
    <button type="button" class="btn btn-outline-primary m-1" data-filter=".category-vinogradarstvo">Vinogradarstvo</button>
    </div>
    <?php 
    // The Loop
    if ($the_query->have_posts()) {
        echo '<div class="row" id="preporuke-djubrenja-mix">';
        while ($the_query->have_posts()) {
            $the_query->the_post();
                get_template_part('loop-templates/content', get_post_format(), $params);
        }
        echo '</div>';
    } else {
        echo '<p>No posts found.</p>';
    }
    /* Restore original Post Data */
    wp_reset_postdata();
    return ob_get_clean();
}


add_shortcode('elixir-preporuke-djubrenja', 'elixir_preporuke_djubrenja');