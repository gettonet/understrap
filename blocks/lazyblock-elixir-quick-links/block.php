<?php
$btn = $attributes['outline'] ? 'outline-'. $attributes['button'] : $attributes['button'];

$args = array(
    'post_type' => $attributes['post-type'],
    'post_status' => 'publish',
    'posts_per_page' => $attributes['number-of-posts'],
    'cat' => $attributes['category'],
);
if('parents' === $attributes['return']){
    $args['depth'] = 2;
}


$the_query = new WP_Query($args);

if ($the_query->have_posts()) {
    while ($the_query->have_posts()) {
        $the_query->the_post();
        
        if('children' === $attributes['return']){
            if(!has_post_parent()) continue;
        }
        $btn_text = get_the_title();
            if ($attributes['button-text-style'] === 'text_arrow') {
                $btn_text .= '<i class="icon-right ms-3"></i>';
            }
        echo sprintf(
            '<a href="%1$s" rel="bookmark" class="%2$s">%3$s</a>',
            esc_url(get_permalink()),
            'mb-3 me-3 btn btn-' . $btn,
            $btn_text
        );
    }
} else {
    echo '<p>No posts found.</p>';
}
wp_reset_postdata();
