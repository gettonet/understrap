<?php

/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

$container = get_theme_mod('elixir_container_type');
?>
<?php get_template_part('sidebar-templates/sidebar', 'footerfull'); ?>
<div class="pt-80 border-top" id="wrapper-footer">
	<footer class="site-footer" id="colophon">
		<div class="<?php echo esc_attr($container); ?>">
			<div class="row">
				<div class="col-md-4">
					<?php
					$custom_logo_id = get_theme_mod('custom_logo');
					echo '<a href="/">' . wp_get_attachment_image($custom_logo_id, 'full', '', array('class' => 'footer-logo mb-4')) . '</a>';
					?>
					<p class="small">Stvaramo nasleđe kroz održivi razvoj,<br>na dobrobit zajednice i uspeh svakog pojedinca.</p>
				</div>
				<div class="col-md-8">
					<div class="row">
						<div class="col-sm-6 col-md-4 mb-5">
							<h6 class="small text-secondary"><?php echo __('O nama', 'elixir'); ?></h6>
							<?php
							if (has_nav_menu('footer-1')) {
								wp_nav_menu(
									array(
										//'menu' => 11,
										'theme_location'  => 'footer-1',
										'container'  => 'ul',
										'menu_class' => 'list-unstyled footer-nav small'
									)
								);
							}
							?>
						</div>
						<div class="col-sm-6 col-md-4 mb-5">
							<h6 class="small text-secondary font-body"><?php echo __('Održivi razvoj', 'elixir'); ?>
							</h6>
							<?php
							if (has_nav_menu('footer-2')) {
								wp_nav_menu(
									array(
										'theme_location'  => 'footer-2',
										'container'  => 'ul',
										'menu_class' => 'list-unstyled footer-nav small'
									)
								);
							}
							?>
						</div>
						<div class="col-sm-6 col-md-4 mb-5">
							<h6 class="small text-secondary font-body"><?php echo __('Karijera', 'elixir'); ?></h6>
							<?php
							if (has_nav_menu('footer-3')) {
								wp_nav_menu(
									array(
										'theme_location'  => 'footer-3',
										'container'  => 'ul',
										'menu_class' => 'list-unstyled footer-nav small'
									)
								);
							}
							?>
						</div>
						<div class="col-sm-6 col-md-4 mb-5">
							<h6 class="small text-secondary font-body"><?php echo __('Proizvodi', 'elixir'); ?></h6>
							<?php
							if (has_nav_menu('footer-4')) {
								wp_nav_menu(
									array(
										'theme_location'  => 'footer-4',
										'container'  => 'ul',
										'menu_class' => 'list-unstyled footer-nav small'
									)
								);
							}
							?>
						</div>
						<div class="col-sm-6 col-md-4 mb-5">
							<h6 class="small text-secondary font-body"><?php echo __('Usluge', 'elixir'); ?></h6>
							<?php
							if (has_nav_menu('footer-5')) {
								wp_nav_menu(
									array(
										'theme_location'  => 'footer-5',
										'container'  => 'ul',
										'menu_class' => 'list-unstyled footer-nav small'
									)
								);
							}
							?>
						</div>
						<div class="col-sm-6 col-md-4 mb-5">
							<h6 class="small text-secondary font-body"><?php echo __('Društvene mreže', 'elixir'); ?></h6>
						</div>
					</div>
				</div>
			</div>
			<hr class="bg-primary">
			<p class="small text-muted">&copy; ElixirGroup <?php echo date('Y'); ?></p>
		</div>
</div>
</footer>
</div>
</div><!-- #page we need this extra closing tag here -->
<?php wp_footer(); ?>
</body>

</html>