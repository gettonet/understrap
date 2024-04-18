<?php
$args = array(
    'post_type' => $attributes['post-type'],
    'post_status' => 'publish',
    'posts_per_page' => $attributes['number-of-posts'],
    'cat' => $attributes['category'],
);

if (isset($attributes['tag-query'])) {
    if (is_array($attributes['tag-query'])) {
        if (!empty(array_filter($attributes['tag-query']))) {
            $args['tag__in'] = $attributes['tag-query'];
        }
    }
}
if ('parent' === $attributes['posts-to-show']) {
    $args['post_parent'] = 0;
}

$params = array(
    'button' => $attributes['outline'] ? 'outline-' . $attributes['button'] : $attributes['button'],
    'button-text' => $attributes['button-text'],
    'button-text-style' => $attributes['button-text-style'],
    'show-category' => isset($attributes['show-post-category']),
    'show-date' => isset($attributes['show-post-date']),
    'layout' => $attributes['layout']
);
if ('rows' === $attributes['layout']) {
    $attributes['show-as-slider'] = false;
} else {
    $params['image'] = $attributes['image'];
    $params['class'] = $attributes['show-as-slider'] ? 'p-2' : 'col-md-6 col-lg-4 mb-4';
}
$params['title_tag'] = $attributes['title-tag'];
$params['title_class'] = $attributes['title-class'];

$slider_args = array(
    "cellAlign" => "left",
    "autoPlay" => true,
    "prevNextButtons" => false,
    "wrapAround" => true
);

$the_query = new WP_Query($args);

$w_classes = array();
$w_classes[] = $attributes['className'] ?: '';
$w_classes[] = $attributes['add-container'] ? 'container' : '';
$w_classes = array_filter($w_classes);

$w_class = $w_classes ? 'class="' . implode(' ', $w_classes) . '"' : '';
$w_id = $attributes['anchor'] ? ' id="' . $attributes['anchor'] . '"' : '';
// The Loop
if ($the_query->have_posts()) {
    echo $w_class || $w_id ? '<div' . $w_class . $w_id . '>' : '';
    echo $attributes['show-as-slider'] ? '<div data-flickity=\'' . json_encode($slider_args) . '\'>' : '<div class="row">';
    $i = 1;
    while ($the_query->have_posts()) {
        $the_query->the_post();
        $params['border'] = $i < $the_query->post_count;
        if ('children' === $attributes['posts-to-show'] && !has_post_parent()) {
            continue;
        } else {
            get_template_part('loop-templates/content', get_post_format(), $params);
        }
        $i++;
    }
    echo '</div>';
    echo $w_class || $w_id ? '</div>' : '';
} else {
    echo '<p>No posts found.</p>';
}
/* Restore original Post Data */
wp_reset_postdata();
