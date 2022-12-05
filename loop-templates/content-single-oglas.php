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
		$desc = '<p>Proizvodi <strong>Elixir Prahovo</strong> izvoze se u više od 80 zemalja celog sveta. Aktuelni investicioni projekti su među najvećim u regionu. Prahovo je jedna od 6 fabrika u Evropi koja proizvodi izuzetno traženu fosfornu kiselinu i prepoznat je kao pokretač razvoja cele Istočne Srbije.</p>';
		break;
	case 'ElixirZorka':
		$c = 'Elixir Zorka';
		break;
	case 'ElixirZorka':
		$c = 'Elixir Prahovo';
		break;
	case 'ElixirAgrar':
		$c = 'Elixir Agrar';
		break;
	case 'ElixirFeed':
		$c = 'Elixir Feed';
		break;
	case 'ElixirCraft':
		$c = 'Elixir Craft';
		break;
	case 'ElixirFondacija':
		$c = 'Elixir Fondacija';
		break;
}


//$class = 'location-' . $location . ' company-' . $company;
?>

<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
	<section id="elixir-hero" class="bg-elixir-gradient aos-init aos-animate" data-aos="fade">
		<div class="container">
			<div class="elixir-spacer" style="--minh:40px; --minh-sm:60px; --minh-md:80px; --minh-lg:80px; --minh-xl:80px; --minh-xxl:80px;">
			</div>
			<h1 class="has-white-color has-text-color"><?php echo get_the_title(); ?></h1>
			<p class="text-white fs-large"><strong>Elixir Group</strong> je globalno uspešna kompanija u hemijskoj industriji.</p>
			<p class="text-white">Vodeći proizvođač mineralnih đubriva i hemikalija, sa dva proizvodna kompleksa u Šapcu i Prahovu. Više od dve decenije rada, primena najbolje tehnologije, inovativnih i održivih rešenja i modela cirkularne ekonomije. Odgovornost potvrđujemo i podrškom projektima koji unapređuju kvalitet života u lokalnoj zajednici.</p>
			<div class="elixir-spacer" style="--minh:40px; --minh-sm:60px; --minh-md:80px; --minh-lg:80px; --minh-xl:80px; --minh-xxl:80px;">
			</div>
		</div>
	</section>
	<section>
		<div class="container">
			<div class="elixir-spacer" style="--minh:40px; --minh-sm:60px; --minh-md:80px; --minh-lg:80px; --minh-xl:80px; --minh-xxl:80px;"></div>
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
						<?php echo $desc; ?>
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
			<div class="elixir-spacer" style="--minh:40px; --minh-sm:60px; --minh-md:80px; --minh-lg:80px; --minh-xl:80px; --minh-xxl:80px;"></div>
			<h2 class="text-center">Prijavite se</h2>
			<p class="text-center mb-5">Biće kontaktirani kandidati koji uđu u uži izbor selekcije.</p>
			<?php echo do_shortcode('[contact-form-7 id="7009" title="Prijava za poziciju"]'); ?>
			<div class="elixir-spacer" style="--minh:40px; --minh-sm:60px; --minh-md:80px; --minh-lg:80px; --minh-xl:80px; --minh-xxl:80px;"></div>
		</div>
	</section>
	<?php
	elixir_link_pages();
	?>

</article><!-- #post-## -->