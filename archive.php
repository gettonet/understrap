<?php

/**
 * The template for displaying archive pages
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

get_header();

$container = get_theme_mod('elixir_container_type');
$layout = 'rows';
?>

<div class="wrapper" id="archive-wrapper">

	<div class="<?php echo esc_attr($container); ?>" id="content" tabindex="-1">

		<div class="row">

			<!-- Do the left sidebar check -->
			<?php get_template_part('global-templates/left-sidebar-check'); ?>

			<main class="site-main" id="main">

				<?php
				if (have_posts()) {
				?>
					<?php
					$vesti = get_term_by('slug', 'vesti', 'category');
					$video = get_term_by('slug', 'video', 'category');
					if (is_category('vesti') || cat_is_ancestor_of($vesti->term_id, $cat)) : ?>
						<header class="page-header">
							<?php the_archive_title('<h1 class="page-title">', '</h1>'); ?>
						</header>
						<div class="alignfull pb-5">
							<?php echo elixir_latest_posts_slider(); ?>
						</div>
					<?php
					elseif (is_category('video') || cat_is_ancestor_of($video->term_id, $cat)) :
						$layout = 'columns'; ?>
						<section id="elixir-hero" class="position-relative alignfull mt-n4" data-aos="fade" style="min-height: 562px">
							<div class="bg-elixir-gradient w-100 h-90 h-md-80 h-lg-75 position-absolute top-0 left-0 z-0" style="max-height: 552px;"></div>
							<div class="container position-relative">
								<div class="elixir-spacer" style="--minh-xs:40px; --minh-sm:60px; --minh-md:80px; --minh-lg:80px; --minh-xl:80px; --minh-xxl:80px;">
								</div>
								<?php the_archive_title('<h1 class="text-white mb-0">', '</h1>'); ?>
								<div class="elixir-spacer" style="--minh-xs:40px; --minh-sm:60px; --minh-md:80px; --minh-lg:80px; --minh-xl:80px; --minh-xxl:80px;">
								</div>

							<?php else : ?>
								<header class="page-header">
									<?php the_archive_title('<h1 class="page-title">', '</h1>'); ?>
								</header>
							<?php
						endif;

						if ($layout === 'columns') : ?>
								<div class="row">
								<?php endif;
							$i = 1;
							// Start the loop.
							while (have_posts()) {
								the_post();

								/*
						 * Include the Post-Format-specific template for the content.
						 * If you want to override this in a child theme, then include a file
						 * called content-___.php (where ___ is the Post Format name) and that will be used instead.
						 */
								get_template_part('loop-templates/content', get_post_format(), array(
									'layout' => $layout,
									'count' => $i
								));
								$i++;
							}
							if ($layout === 'columns') : ?>
								</div>
							<?php endif;
							if (is_category('video') || cat_is_ancestor_of($video->term_id, $cat)) : ?>
							</div>
						</section>
				<?php endif;
						} else {
							get_template_part('loop-templates/content', 'none');
						}
				?>

			</main><!-- #main -->

			<?php
			// Display the pagination component.
			elixir_pagination();
			// Do the right sidebar check.
			get_template_part('global-templates/right-sidebar-check');
			?>

		</div><!-- .row -->

	</div><!-- #content -->

</div><!-- #archive-wrapper -->

<?php
get_footer();
