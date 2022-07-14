<?php

/**
 * Post rendering content according to caller of get_template_part - multi-column layout
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

//defaults.
$img_style = isset($args['image']) ? $args['image'] : '16x9';
$btn = isset($args['button']) ? $args['button'] : 'outline-secondary';
$btn_text = isset($args['button-text']) ? $args['button-text'] ?: __('Read More', 'elixir') : __('Read More', 'elixir');
$btn_text_style = isset($args['button-text-style']) ? $args['button-text-style'] : 'arrow';

if ('arrow' === $btn_text_style) {
    $btn_text = '<i class="icon-right"></i>';
    $btn .= ' btn-arrow';
} else if ('text_arrow' === $btn_text_style) {
    $btn_text .= '<i class="icon-right ms-3"></i>';
}

$show_cat = isset($args['show-category']) ? $args['show-category'] : true;
$show_date = isset($args['show-date']) ? $args['show-date'] : true;
$class = isset($args['class']) ? $args['class'] : 'col-12 mb-5';
$custom_title = isset($args['custom-title']) ? $args['custom-title'] : false;
$custom_image = isset($args['custom-image']) ? $args['custom-image'] : false;
$custom_excerpt = isset($args['custom-excerpt']) ? $args['custom-excerpt'] : false;
?>

<article <?php post_class($class); ?> id="post-<?php the_ID(); ?>">
    <div class="article-inner row align-items-center">
        <div class="col-lg-5">
            <div class="ratio ratio-<?php echo $img_style; ?> rounded-bl overflow-hidden mb-4 mb-lg-0">
                <?php
                if ($custom_image) :
                    echo wp_get_attachment_image($custom_image, 'large', array(
                        'class' => 'w-100 h-100 fit-cover'
                    ));
                elseif (has_post_thumbnail()) :
                    echo get_the_post_thumbnail($post->ID, 'large', array(
                        'class' => 'w-100 h-100 fit-cover'
                    ));
                else : ?>
                    <img src="<?php echo get_template_directory_uri() . '/img/thumbnail-default.svg'; ?>" class="w-100 h-100 fit-cover">
                <?php endif; ?>
            </div>
        </div>
        <div class="col-md">
            <header class="entry-header">
                <?php
                if ('post' === get_post_type()) : ?>
                    <?php if ($show_date) : ?>
                        <div class="entry-meta">
                            <?php elixir_posted_on(); ?>
                        </div><!-- .entry-meta -->
                    <?php endif; ?>
                <?php endif; ?>
                <?php
                if ($custom_title) {
                    echo '<h2 class="entry-title h4 fw-500"><a href="' . esc_url(get_permalink()) . '" rel="bookmark" class="text-dark">' . $custom_title . '</a></h2>';
                } else {
                    the_title(
                        sprintf('<h2 class="entry-title h4 fw-500"><a href="%s" rel="bookmark" class="text-dark">', esc_url(get_permalink())),
                        '</a></h2>'
                    );
                }
                ?>
            </header><!-- .entry-header -->
            <div class="entry-content">
                <div>
                    <?php if ($custom_excerpt) {
                        echo apply_filters('the_excerpt', $custom_excerpt);
                    } else {
                        the_excerpt();
                    } ?>
                </div>

            </div><!-- .entry-content -->
        </div>
        <div class="col-md-auto"> <?php
                                    if ($btn != 'none') {
                                        echo sprintf(
                                            '<div data-aos="fade-left"><a href="%1$s" rel="bookmark" class="%2$s">%3$s</a></div>',
                                            esc_url(get_permalink()),
                                            'btn btn-' . $btn,
                                            $btn_text
                                        );
                                    }  ?></div>
    </div>

</article><!-- #post-## -->
<?php
if(isset($args['border'])) {
    echo $args['border'] ? '<hr class="mt-0 mb-5 bg-primary">' : '';
}