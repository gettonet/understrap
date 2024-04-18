<?php

if($attributes['post'] || $attributes['page'] || $attributes['product']){
    if($attributes['post']){
        $post_type = 'post';
        $post_id = $attributes['post'];
    }
    else if($attributes['page']) {
        $post_type = 'page';
        $post_id = $attributes['page'];
    }
    else if($attributes['product']){
        $post_type = 'proizvodi';
        $post_id = $attributes['product'];
    }
$args = array(
    'post_type' => $post_type,
    'p' => $post_id
   );

$params = array(
    'image' => $attributes['image'],
    'button' => $attributes['outline'] ? 'outline-'. $attributes['button'] : $attributes['button'] ,
    'button-text' => $attributes['button-text'],
    'button-text-style' => $attributes['button-text-style'],
    'show-category' => isset($attributes['show-post-category']),
    'show-date' => isset($attributes['show-post-date']),
    'class' => 'h-100 '.$attributes['className'],
    'custom-image' => isset($attributes['custom-image']['id']) ? $attributes['custom-image']['id'] : false,
    'custom-excerpt' => $attributes['custom-excerpt'] ?: false,
    'custom-title' => $attributes['custom-title'] ?: false,
    'custom-url' => '#'
);
if (isset($attributes['title-tag'])) {
    $params['title_tag'] = $attributes['title-tag'];
}
if (isset($attributes['title-class']) && $attributes['title-class']) {
    $params['title_class'] = $attributes['title-class'];
}

$the_query = new WP_Query( $args );

// The Loop
if ( $the_query->have_posts() ) {
    while ( $the_query->have_posts() ) {
        $the_query->the_post();
        get_template_part( 'loop-templates/content', get_post_format(), $params );
    }
} else {
    echo '<p>No posts found.</p>';
}
/* Restore original Post Data */
wp_reset_postdata();
} else {
    $title = $attributes['custom-title'] ?: 'Lorem Ipsum';
    $url = '#';
    $excerpt = $attributes['custom-excerpt'] ? apply_filters('the_excerpt', $attributes['custom-excerpt']) : '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit euismod in pellentesque massa placerat duis ultricies.</p>';
    $btn = $attributes['outline'] ? 'outline-'. $attributes['button'] : $attributes['button'];
    $btn_text = $attributes['button-text'] ?: 'Lorem Ipsum';
    if (isset($attributes['button-text-style'])) {
        if ($attributes['button-text-style'] === 'arrow') {
            $btn_text = '<i class="icon-right"></i>';
            $btn .= ' btn-arrow';
        } else if ($attributes['button-text-style'] === 'text_arrow') {
            $btn_text .= '<i class="icon-right ms-3"></i>';
        }
    }
    ?>
    <div class="shadow rounded-top rounded-start overflow-hidden h-100 pb-3 pb-lg-4 d-flex flex-column">
		<header class="entry-header">
			<?php if ($attributes['image'] != 'none' && $attributes['image'] != 'full-h') : ?>
				<div class="ratio ratio-<?php echo $attributes['image']; ?>">
					<?php
					if (isset($attributes['custom-image']['id'])) :
						echo wp_get_attachment_image($attributes['custom-image']['id'], 'large', array(
							'class' => 'w-100 h-100 fit-cover'
						));
					else : ?>
						<img src="<?php echo get_template_directory_uri() . '/img/thumbnail-default.svg'; ?>" class="w-100 h-100 fit-cover">
					<?php endif; ?>
				</div>
			<?php endif; ?>
			<div class="p-3 p-lg-4 bg-white">
				<?php
				echo '<h2 class="entry-title h4 fw-500 mb-0">'.$title.'</h2>';
				?>
			</div>
		</header><!-- .entry-header -->

		<div class="entry-content h-100 px-3 px-lg-4 d-flex flex-column justify-content-between">
            <div>
                <?php echo $excerpt; ?>
            </div>
        <?php                        
			if ($attributes['button'] != 'none') {
				echo sprintf(
					'<div>%4$s</div>',
    				$btn_text
				);
			}  ?>

		</div><!-- .entry-content -->

		<footer class="entry-footer">
		</footer><!-- .entry-footer -->
	</div>
    <?php
}