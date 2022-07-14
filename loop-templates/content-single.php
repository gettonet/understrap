<?php
/**
 * Single post partial template
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;
?>

<article <?php post_class('mb-5'); ?> id="post-<?php the_ID(); ?>">
<?php
// get cover image -> chierarchy: meta, category.
$pos_x = $pos_y = 50;
$image_id = carbon_get_post_meta( $post->ID, 'header_image') ?: false; 
if($image_id) {
	$pos_x = carbon_get_post_meta( $post->ID, 'img_pos_x'); 
	$pos_y = carbon_get_post_meta( $post->ID, 'img_pos_y'); 
}
else {
	$category = get_the_category($post->ID);
     		$cat_id = $category[0]->cat_ID;	
    		$image_id = carbon_get_term_meta ( $cat_id, 'category_image' ) ?: false;
}

?>

	<section class="entry-cover position-relative rounded-bottom alignfull mb-5 overflow-hidden"<?php echo !$image_id ? ' style="background: #929292"' : ''; ?> data-aos="fade">
		<?php if($image_id){
			echo wp_get_attachment_image($image_id, 'full', '' , array(
				'class' => 'position-absolute w-100 h-100 top-0 left-0 fit-cover',
				'style' => 'object-position:'.$pos_x.'% '.$pos_y.'%'
			));
		} ?>
	</section>
	<header class="entry-header">

		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

		<div class="entry-meta mb-4">
		<div class="d-flex align-items-center justify-content-between">
				<?php elixir_posted_by(); ?>
				<div><?php elixir_posted_in(); ?> / <?php elixir_posted_on(); ?></div>
			</div>

		</div><!-- .entry-meta -->

	</header><!-- .entry-header -->	

	<div class="entry-content">

		<?php
		the_content();
		elixir_link_pages();
		?>

	</div><!-- .entry-content -->

	<footer class="entry-footer">
	</footer><!-- .entry-footer -->

</article><!-- #post-## -->
<?php
echo '<h3 class="mb-5">'.__('Related articles', 'elixir').'</h3>';
elixir_related_articles();
