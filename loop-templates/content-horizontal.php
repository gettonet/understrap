<?php

/**
 * Post rendering content according to caller of get_template_part
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

//defaults.
$img_style = isset($args['image']) ? $args['image'] : '3x2';
$btn = isset($args['button']) ? $args['button'] : 'primary';
$btn_text = isset($args['button-text']) ? $args['button-text'] ?: __('Read More', 'elixir') : __('Read More', 'elixir');
if (isset($args['button-text-style'])) {
	if ($args['button-text-style'] == 'arrow') {
		$btn_text = '<i class="icon-right"></i>';
		$btn .= ' btn-arrow';
	} else if ($args['button-text-style'] == 'text_arrow') {
		$btn_text .= '<i class="icon-right ms-3"></i>';
	}
}
$show_cat = isset($args['show-category']) ? $args['show-category'] : true;
$show_date = isset($args['show-date']) ? $args['show-date'] : true;
$class = isset($args['class']) ? $args['class'] : 'col-md-6 col-lg-4';
$custom_title = isset($args['custom-title']) ? $args['custom-title'] : false;
$custom_image = isset($args['custom-image']) ? $args['custom-image'] : false;
$custom_excerpt = isset($args['custom-excerpt']) ? $args['custom-excerpt'] : false;
?>
<article <?php post_class($class); ?> id="post-<?php the_ID(); ?>">
<?php if ($img_style != 'full-h') : ?>
	<div class="article-inner shadow rounded-top rounded-start overflow-hidden h-100 pb-3 pb-lg-4 d-flex flex-column">
			<header class="entry-header">
				<?php if ($img_style != 'none' && $img_style != 'full-h') : ?>
					<div class="ratio ratio-<?php echo $img_style; ?>">
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
				<?php endif; ?>
				<div class="p-3 p-lg-4">
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
						echo '<h2 class="entry-title h4 fw-500 mb-0"><a href="' . esc_url(get_permalink()) . '" rel="bookmark" class="text-dark">' . $custom_title . '</a></h2>';
					} else {
						the_title(
							sprintf('<h2 class="entry-title h4 fw-500 mb-0"><a href="%s" rel="bookmark" class="text-dark">', esc_url(get_permalink())),
							'</a></h2>'
						);
					}
					?>
				</div>
			</header><!-- .entry-header -->
			<div class="entry-content h-100 px-3 px-lg-4 d-flex flex-column justify-content-between">
				<div>
					<?php if ($custom_excerpt) {
						echo apply_filters('the_excerpt', $custom_excerpt);
					} else {
						the_excerpt();
					} ?>
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
<?php else : ?>
	<div class="article-inner position-relative fullimage shadow rounded-top rounded-start overflow-hidden d-flex flex-column<?php echo $btn != 'none' ? ' btn-visible' : ''; ?>">
	<div class="ratio ratio-3x2"></div>
	<div class="entry-content bg-gradient-primary-up h-100 p-3 p-lg-4 z-1 d-flex flex-column justify-content-center">
		<?php
			if ($custom_title) {
				echo '<h2 class="entry-title h4 mb-4"><a href="' . esc_url(get_permalink()) . '" rel="bookmark" class="text-white">' . $custom_title . '</a></h2>';
			} else {
				the_title(
					sprintf('<h2 class="entry-title h4 mb-4"><a href="%s" rel="bookmark" class="text-white">', esc_url(get_permalink())),
					'</a></h2>'
				);
			}
		?>
	</div><!-- .entry-content -->
	<?php
			if ($custom_image) :
				echo wp_get_attachment_image($custom_image, 'large', array(
					'class' => 'position-absolute top-0 left-0 w-100 h-100 fit-cover z-0'
				));
			elseif (has_post_thumbnail()) :
				echo get_the_post_thumbnail($post->ID, 'large', array(
					'class' => 'position-absolute top-0 left-0 w-100 h-100 fit-cover z-0'
				));
			else : ?>
		<img src="<?php echo get_template_directory_uri() . '/img/thumbnail-default.svg'; ?>" class="position-absolute top-0 left-0  w-100 h-100 fit-cover z-0">
	<?php endif; ?>
	</div>
	<?php
			if ($btn != 'none') {
				echo sprintf(
					'<a href="%1$s" rel="bookmark" class="%2$s">%3$s</a>',
					esc_url(get_permalink()),
					'my-4 btn btn-' . $btn,
					$btn_text
				);
			}  ?>
<?php endif; ?>

</article><!-- #post-## -->