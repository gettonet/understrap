<?php
/**
 * The template for displaying all single posts
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
$fluid_container_post_types = array(
	'proizvodi',
	'preporuka_djubrenja'
);

get_header();
$container = in_array(get_post_type(), $fluid_container_post_types)  ? 'container-fluid px-0' : get_theme_mod( 'elixir_container_type' );
?>

<div id="single-wrapper">

	<div class="<?php echo esc_attr( $container ); ?>" id="content" tabindex="-1">

		<div class="row">

			<!-- Do the left sidebar check -->
			<?php get_template_part( 'global-templates/left-sidebar-check' ); ?>

			<main class="site-main" id="main">

			<?php /*if ( has_post_format( 'video' )) {

			get_template_part( 'loop-templates/content', 'single-video' );

			}*/
			
			if ( 'proizvodi' === get_post_type() ) {

			get_template_part( 'loop-templates/content', 'single-proizvod' ); 

			} else if ( 'preporuka_djubrenja' === get_post_type() ) {

			get_template_part( 'loop-templates/content', 'single-preporuka-djubrenja' );

			} else { 

			get_template_part( 'loop-templates/content', 'single' );

			//elixir_post_nav();

			} ?>

			</main><!-- #main -->

			<!-- Do the right sidebar check -->
			<?php get_template_part( 'global-templates/right-sidebar-check' ); ?>

		</div><!-- .row -->

	</div><!-- #content -->

</div><!-- #single-wrapper -->

<?php
get_footer();
