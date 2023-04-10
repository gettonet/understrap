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
$lang = elixir_get_current_language();
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
					<div class="small mb-5"><?php echo apply_filters('the_content',carbon_get_theme_option('company_slogan_'.$lang)); ?></div>
					<div class="mb-5">
						<h6 class="small text-secondary font-body"><?php echo __('Društvene mreže', 'elixir'); ?></h6>
						<?php
						$fb_url = carbon_get_theme_option('fb_url');
						$yt_url = carbon_get_theme_option('yt_url');
						$ig_url = carbon_get_theme_option('ig_url');
						$lin_url = carbon_get_theme_option('lin_url');
						if ($fb_url || $yt_url || $ig_url || $lin_url) : ?>
							<p class="small mb-0">Elixir Group</p>
							<ul class="list-unstyled list-group list-group-horizontal mb-3">
								<?php
								echo $lin_url ? '<li class=""><a class="fs-5" href="' . $lin_url . '" target="_blank"  title="LinkedIn"><i class="icon-lin-rounded"></i></a></li>' : '';
								echo $yt_url ? '<li class=""><a class="fs-5" href="' . $yt_url . '" target="_blank" title="YouTube"><i class="icon-yt-rounded"></i></a></li>' : '';
								echo $ig_url ? '<li class=""><a class="fs-5" href="' . $ig_url . '" target="_blank" title="Instagram"><i class="icon-ig-rounded"></i></a></li>' : '';
								echo $fb_url ? '<li class=""><a class="fs-5" href="' . $fb_url . '" target="_blank" title="Facebook"><i class="icon-fb-rounded"></i></a></li>' : '';
								?>
							</ul>
						<?php endif; ?>
						<?php
						$ez_fb_url = carbon_get_theme_option('zorka_fb_url');
						$ez_yt_url = carbon_get_theme_option('zorka_yt_url');
						$ez_ig_url = carbon_get_theme_option('zorka_ig_url');
						$ez_lin_url = carbon_get_theme_option('zorka_lin_url');
						if ($ez_fb_url || $ez_yt_url || $ez_ig_url || $ez_lin_url) : ?>
							<p class="small mb-0">Elixir Zorka</p>
							<ul class="list-unstyled list-group list-group-horizontal">
								<?php
								echo $ez_lin_url ? '<li class=""><a class="fs-5" href="' . $ez_lin_url . '" target="_blank"  title="LinkedIn"><i class="icon-lin-rounded"></i></a></li>' : '';
								echo $ez_yt_url ? '<li class=""><a class="fs-5" href="' . $ez_yt_url . '" target="_blank" title="YouTube"><i class="icon-yt-rounded"></i></a></li>' : '';
								echo $ez_ig_url ? '<li class=""><a class="fs-5" href="' . $ez_ig_url . '" target="_blank" title="Instagram"><i class="icon-ig-rounded"></i></a></li>' : '';
								echo $ez_fb_url ? '<li class=""><a class="fs-5" href="' . $ez_fb_url . '" target="_blank" title="Facebook"><i class="icon-fb-rounded"></i></a></li>' : '';
								?>
							</ul>
						<?php endif; ?>
					</div>

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
							<h6 class="small text-secondary font-body"><?php echo __('Članice', 'elixir'); ?>
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
							<h6 class="small text-secondary font-body"><?php echo __('Proizvodi', 'elixir'); ?>
							</h6>
							<?php
							if (has_nav_menu('footer-2')) {
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
							<h6 class="small text-secondary font-body"><?php echo __('Usluge', 'elixir'); ?></h6>
							<?php
							if (has_nav_menu('footer-3')) {
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
							<h6 class="small text-secondary font-body"><?php echo __('Održivi razvoj', 'elixir'); ?></h6>
							<?php
							if (has_nav_menu('footer-4')) {
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
							<h6 class="small text-secondary font-body"><?php echo __('Karijera', 'elixir'); ?></h6>
							<?php
							if (has_nav_menu('footer-5')) {
								wp_nav_menu(
									array(
										'theme_location'  => 'footer-6',
										'container'  => 'ul',
										'menu_class' => 'list-unstyled footer-nav small'
									)
								);
							}
							?>
						</div>
					</div>
				</div>
			</div>
			<hr class="bg-primary">
			<div class="d-flex flex-wrap justify-content-between">
				<p class="small text-muted">&copy; ElixirGroup <?php echo date('Y'); ?></p>
				<?php
				if (has_nav_menu('footer-5')) {
					wp_nav_menu(
						array(
							'theme_location'  => 'footer-legal',
							'container'  => 'ul',
							'menu_class' => 'list-unstyled d-flex flex-wrap footer-nav small',
							'add_a_class' => 'me-3'

						)
					);
				}
				?>
			</div>
		</div>
</div>
</footer>
</div>
</div><!-- #page we need this extra closing tag here -->
<?php wp_footer(); ?>
</body>

</html>