<?php

/**
 * Single oglas partial template
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;
$location = (array)carbon_get_post_meta(get_the_id(), 'lokacija');
$company = carbon_get_post_meta(get_the_id(), 'clanica');
$c = $desc = '';
$l = array();
foreach ($location as $loc) {
	$l[] = elixir_lokacija($loc);
}
switch ($company) {
	case 'ElixirPrahovo':
		$c = 'Elixir Prahovo';
		$desc = carbon_get_theme_option('eprahovo_zaposlenje');
		break;
	case 'ElixirZorka':
		$c = 'Elixir Zorka';
		$desc = carbon_get_theme_option('ezorka_zaposlenje');
		break;
	case 'ElixirAgrar':
		$c = 'Elixir Agrar';
		$desc = carbon_get_theme_option('eagrar_zaposlenje');
		break;
	case 'ElixirFeed':
		$c = 'Elixir Feed';
		$desc = carbon_get_theme_option('efeed_zaposlenje');
		break;
	case 'ElixirCraft':
		$c = 'Elixir Craft';
		$desc = carbon_get_theme_option('ecraft_zaposlenje');
		break;
	case 'ElixirGroup':
		$c = 'Elixir Group';
		$desc = carbon_get_theme_option('egroup_zaposlenje');
	case 'ElixirEngineering':
		$c = 'Elixir Engineering';
		$desc = carbon_get_theme_option('eengineering_zaposlenje');
}


//$class = 'location-' . $location . ' company-' . $company;
?>

<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
	<section id="elixir-hero" class="bg-elixir-gradient aos-init aos-animate" data-aos="fade">
		<div class="container">
			<div class="elixir-spacer" style="--minh-xs:40px; --minh-sm:60px; --minh-md:80px; --minh-lg:80px; --minh-xl:80px; --minh-xxl:80px;">
			</div>
			<h1 class="has-white-color has-text-color"><?php echo get_the_title(); ?></h1>
			<p class="text-white fs-large"><strong>Elixir Group</strong> je poslovni sistem koji se kontinuirano razvija u oblasti hemijske industrije i agrobiznisa, kroz brojne projekte posvećene održivom razvoju, primeni modela cirkularne ekonomije i unapređenju resursne efikasnosti. <strong>Elixir Group</strong> je lider u hemijskoj industriji Jugoistočne Evrope sa ukupnom proizvodnjom od preko 1 milion tona u dva proizvodna kompleksa u &Scaron;apcu i Prahovu, od čega 70% izvozimo u preko 80 država na svim kontinentima. </p>
			<p class="text-white">Na&scaron; investicioni portfolio čini preko 50 aktuelnih projekata ukupne vrednosti preko 300M eur, na čijem razvoju radi tim iskusnih eksperata različitih profila koji čine <strong>Tehnički centar Elixir Group</strong> koji ostvaruje saradnju sa brojnim renomiranim partnerima u zemlji i inostranstvu.</p>
			<div class="elixir-spacer" style="--minh-xs:40px; --minh-sm:60px; --minh-md:80px; --minh-lg:80px; --minh-xl:80px; --minh-xxl:80px;">
			</div>
		</div>
	</section>
	<section>
		<div class="container">
			<div class="elixir-spacer" style="--minh-xs:40px; --minh-sm:60px; --minh-md:80px; --minh-lg:80px; --minh-xl:80px; --minh-xxl:80px;"></div>
			<div class="row mb-5 align-items-center">
				<div class="col-lg-6 mb-5 mb-lg-0">
					<p class="text-muted mb-n1 font-heading">POZICIJA</p>
					<h2 class="mb-4"><?php echo get_the_title(); ?></h2>
					<p class="text-muted mb-n1 font-heading">LOKACIJA</p>
					<h4 class="text-secondary mb-5"><?php echo implode(', ', $l); ?></h4>
					<a href="#prijava" class="btn btn-lg btn-primary px-5">PRIJAVITE SE</a>
				</div>
				<div class="col-lg-6">
					<div class="bg-white shadow p-4 rounded-start rounded-top border">
						<?php get_company_logo($company, '200px', false, 'mb-4'); ?>
						<?php echo apply_filters('the_content', $desc); ?>
					</div>
				</div>

			</div>
		</div>
	</section>
	<?php
	the_content();
	?>
	<section id="prijava" class="bg-lgrey">
		<div class="container">
			<div class="elixir-spacer" style="--minh-xs:40px; --minh-sm:60px; --minh-md:80px; --minh-lg:80px; --minh-xl:80px; --minh-xxl:80px;"></div>
			<h2 class="text-center">Prijavite se</h2>
			<p class="text-center mb-5">Biće kontaktirani kandidati koji uđu u uži izbor selekcije.</p>
			<?php echo do_shortcode('[contact-form-7 id="7009" title="Prijava za poziciju"]'); ?>
			<div class="elixir-spacer" style="--minh-xs:40px; --minh-sm:60px; --minh-md:80px; --minh-lg:80px; --minh-xl:80px; --minh-xxl:80px;"></div>
		</div>
	</section>
	<?php
	elixir_link_pages();
	?>

</article><!-- #post-## -->