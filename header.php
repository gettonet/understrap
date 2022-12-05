<?php
/**
 * The header for our theme
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$bootstrap_version = get_theme_mod( 'elixir_bootstrap_version', 'bootstrap4' );
$navbar_type       = get_theme_mod( 'elixir_navbar_type', 'collapse' );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?> <?php elixir_body_attributes(); ?>>
<?php do_action( 'wp_body_open' ); ?>
<div class="site" id="page">

	<!-- ******************* The Navbar Area ******************* -->
	<header id="wrapper-navbar">

	<a class="skip-link sr-only visually-hidden sr-only-focusable" href="#content"><?php esc_html_e( 'Skip to content', 'elixir' ); ?></a>
		<?php
		$menu = 'primary';
		if(is_page('elixir-zorka')){
			$menu = 'elixirZorka';
		} else if(is_page('elixir-prahovo')){
			$menu = 'elixirPrahovo';
		} else if(is_page('elixir-agrar')){
			$menu = 'elixirAgrar';
		} else if(is_page('elixir-craft')){
			$menu = 'elixirCraft';
		} else if(is_page('elixir-feed')){
			$menu = 'elixirFeed';
		} else if(is_page('elixir-fondacija')){
			$menu = 'elixirFondacija';
		}
                wp_nav_menu(
                    array(
                        'theme_location'  => $menu,
                    )
                );
                ?>

		<?php //get_template_part( 'global-templates/navbar', $navbar_type . '-' . $bootstrap_version ); ?>

	</header><!-- #wrapper-navbar end -->
