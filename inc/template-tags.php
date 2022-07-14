<?php

/**
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

if (!function_exists('elixir_posted_on')) {
	/**
	 * Prints HTML with meta information for the current post-date/time and author.
	 */
	function elixir_posted_on()
	{
		$time_string = '<time class="entry-date" datetime="%1$s">%2$s</time>';
		/*if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s"> (%4$s) </time>';
		}*/
		$time_string = sprintf(
			$time_string,
			esc_attr(get_the_date('c')),
			esc_html(get_the_date('d.m.Y.')),
			esc_attr(get_the_modified_date('c')),
			esc_html(get_the_modified_date())
		);
		$posted_on   = apply_filters(
			'elixir_posted_on',
			sprintf(
				'<span class="posted-on">%1$s</span>',
				/*esc_html_x( 'Posted on', 'post date', 'elixir' ),
				esc_url( get_permalink() ),*/
				apply_filters('elixir_posted_on_time', $time_string)
			)
		);
		echo $posted_on;
	}
}

if (!function_exists('elixir_posted_by')) {
	function elixir_posted_by()
	{
		$author = sprintf(
			'<div class="author d-flex align-items-center">%1$s<p class="post-author mb-0">%2$s %3$s</p></div>',
			get_avatar(get_the_author_meta('ID'), 40, '', '', array('class' => 'rounded-circle me-3')),
			get_the_author_meta('user_firstname'),
			get_the_author_meta('user_lastname')
		);
		echo $author;
	}
}

if (!function_exists('elixir_posted_in')) {
	function elixir_posted_in()
	{
		$categories_list = get_the_category_list(esc_html__(', ', 'elixir'));
		if ($categories_list && elixir_categorized_blog()) {
			echo '<span class="cat-links">' . $categories_list . '</span>';
		}
	}
}


if (!function_exists('elixir_categorized_blog')) {
	/**
	 * Returns true if a blog has more than 1 category.
	 *
	 * @return bool
	 */
	function elixir_categorized_blog()
	{
		$all_the_cool_cats = get_transient('elixir_categories');
		if (false === $all_the_cool_cats) {
			// Create an array of all the categories that are attached to posts.
			$all_the_cool_cats = get_categories(
				array(
					'fields'     => 'ids',
					'hide_empty' => 1,
					// We only need to know if there is more than one category.
					'number'     => 2,
				)
			);
			// Count the number of categories that are attached to the posts.
			$all_the_cool_cats = count($all_the_cool_cats);
			set_transient('elixir_categories', $all_the_cool_cats);
		}
		if ($all_the_cool_cats > 1) {
			// This blog has more than 1 category so elixir_categorized_blog should return true.
			return true;
		}
		// This blog has only 1 category so elixir_categorized_blog should return false.
		return false;
	}
}

add_action('edit_category', 'elixir_category_transient_flusher');
add_action('save_post', 'elixir_category_transient_flusher');

if (!function_exists('elixir_category_transient_flusher')) {
	/**
	 * Flush out the transients used in elixir_categorized_blog.
	 */
	function elixir_category_transient_flusher()
	{
		if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
			return;
		}
		// Like, beat it. Dig?
		delete_transient('elixir_categories');
	}
}

if (!function_exists('elixir_body_attributes')) {
	/**
	 * Displays the attributes for the body element.
	 */
	function elixir_body_attributes()
	{
		/**
		 * Filters the body attributes.
		 *
		 * @param array $atts An associative array of attributes.
		 */
		$atts = array_unique(apply_filters('elixir_body_attributes', $atts = array()));
		if (!is_array($atts) || empty($atts)) {
			return;
		}
		$attributes = '';
		foreach ($atts as $name => $value) {
			if ($value) {
				$attributes .= sanitize_key($name) . '="' . esc_attr($value) . '" ';
			} else {
				$attributes .= sanitize_key($name) . ' ';
			}
		}
		echo trim($attributes); // phpcs:ignore WordPress.Security.EscapeOutput
	}
}

if (!function_exists('elixir_comment_navigation')) {
	/**
	 * Displays the comment navigation.
	 *
	 * @param string $nav_id The ID of the comment navigation.
	 */
	function elixir_comment_navigation($nav_id)
	{
		if (get_comment_pages_count() <= 1) {
			// Return early if there are no comments to navigate through.
			return;
		}
?>
		<nav class="comment-navigation" id="<?php echo esc_attr($nav_id); ?>">

			<h1 class="screen-reader-text"><?php esc_html_e('Comment navigation', 'elixir'); ?></h1>

			<?php if (get_previous_comments_link()) { ?>
				<div class="nav-previous">
					<?php previous_comments_link(__('&larr; Older Comments', 'elixir')); ?>
				</div>
			<?php } ?>

			<?php if (get_next_comments_link()) { ?>
				<div class="nav-next">
					<?php next_comments_link(__('Newer Comments &rarr;', 'elixir')); ?>
				</div>
			<?php } ?>

		</nav><!-- #<?php echo esc_attr($nav_id); ?> -->
	<?php
	}
}

if (!function_exists('elixir_edit_post_link')) {
	/**
	 * Displays the edit post link for post.
	 */
	function elixir_edit_post_link()
	{
		edit_post_link(
			sprintf(
				/* translators: %s: Name of current post */
				esc_html__('Edit %s', 'elixir'),
				the_title('<span class="screen-reader-text">"', '"</span>', false)
			),
			'<span class="edit-link">',
			'</span>'
		);
	}
}

if (!function_exists('elixir_post_nav')) {
	/**
	 * Display navigation to next/previous post when applicable.
	 */
	function elixir_post_nav()
	{
		// Don't print empty markup if there's nowhere to navigate.
		$previous = (is_attachment()) ? get_post(get_post()->post_parent) : get_adjacent_post(false, '', true);
		$next     = get_adjacent_post(false, '', false);
		if (!$next && !$previous) {
			return;
		}
	?>
		<nav class="container navigation post-navigation">
			<h2 class="screen-reader-text"><?php esc_html_e('Post navigation', 'elixir'); ?></h2>
			<div class="d-flex nav-links justify-content-between">
				<?php
				if (get_previous_post_link()) {
					previous_post_link('<span class="nav-previous">%link</span>', _x('<i class="fa fa-angle-left"></i>&nbsp;%title', 'Previous post link', 'elixir'));
				}
				if (get_next_post_link()) {
					next_post_link('<span class="nav-next">%link</span>', _x('%title&nbsp;<i class="fa fa-angle-right"></i>', 'Next post link', 'elixir'));
				}
				?>
			</div><!-- .nav-links -->
		</nav><!-- .navigation -->
<?php
	}
}

if (!function_exists('elixir_link_pages')) {
	/**
	 * Displays/retrieves page links for paginated posts (i.e. including the
	 * `<!--nextpage-->` Quicktag one or more times). This tag must be
	 * within The Loop. Default: echo.
	 *
	 * @return void|string Formatted output in HTML.
	 */
	function elixir_link_pages()
	{
		$args = apply_filters(
			'elixir_link_pages_args',
			array(
				'before' => '<div class="page-links">' . esc_html__('Pages:', 'elixir'),
				'after'  => '</div>',
			)
		);
		wp_link_pages($args);
	}
}
