<?php

/**
 * Single proizvod partial template
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;
?>

<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

	<?php
	the_content();
	elixir_link_pages();
	?>

</article><!-- #post-## -->