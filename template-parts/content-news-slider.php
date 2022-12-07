<?php

/**
 * Post rendering content according to caller of get_template_part - multi-column layout
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

//defaults.
$img_style = isset($args['image']) ? $args['image'] : 'elixir-news';
$btn = isset($args['button']) ? $args['button'] : 'outline-light';
$btn_text = isset($args['button-text']) ? $args['button-text'] ?: __('Read More', 'elixir') : __('Read More', 'elixir');
$btn_text_style = isset($args['button-text-style']) ? $args['button-text-style'] : 'arrow';
if ('arrow' === $btn_text_style) {
    $btn_text = '<i class="icon-right"></i>';
    $btn .= ' btn-arrow';
} else if ('text_arrow' === $btn_text_style) {
    $btn_text .= '<i class="icon-right ms-3"></i>';
}
$show_cat = isset($args['show-category']) ? $args['show-category'] : false;
$show_date = isset($args['show-date']) ? $args['show-date'] : true;

$class = isset($args['class']) ? $args['class'] : 'p-2 w-100 w-lg-75 w-xl-60 w-xxl-50';
?>

<article <?php post_class($class); ?> id="post-<?php the_ID(); ?>">
    <div class="article-inner shadow rounded-top rounded-start overflow-hidden position-relative">
        <div class="article-image ratio ratio-<?php echo $img_style; ?>">
            <?php
            if (has_post_thumbnail()) :
                echo get_the_post_thumbnail($post->ID, 'large', array(
                    'class' => 'w-100 h-100 fit-cover'
                ));
            else : ?>
                <img src="<?php echo get_template_directory_uri() . '/img/thumbnail-default.svg'; ?>" class="w-100 h-100 fit-cover">
            <?php endif; ?>
            <div class="h-100" style="background: rgba(0,0,0,0.4)"></div>
        </div>

        <div class="article-content position-absolute z-1 bottom-0 p-4 p-xl-5">
            <?php
            if ('post' === get_post_type()) : ?>
                <?php if ($show_date) : ?>
                    <div class="entry-meta text-white">
                        <?php elixir_posted_on(); ?>
                    </div><!-- .entry-meta -->
                <?php endif; ?>
            <?php endif; ?>
            <?php
            the_title(
                sprintf('<h2 class="entry-title h4 fw-500"><a href="%s" rel="bookmark" class="text-white">', esc_url(get_permalink())),
                '</a></h2>'
            );
            ?>
            <div class="entry-content text-white">
                <div>
                    <?php the_excerpt(); ?>
                </div>
                <?php
                if ($btn != 'none') {
                    echo sprintf(
                        '<div><a href="%1$s" rel="bookmark" class="%2$s">%3$s</a></div>',
                        esc_url(get_permalink()),
                        'btn btn-' . $btn,
                        $btn_text
                    );
                }  ?>
            </div><!-- .entry-content -->
        </div>
    </div>

</article><!-- #post-## -->