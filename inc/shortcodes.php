<?php

/**
 * Shortcodes to make our lifde easier
 *
 * @package Elixir
 */

if (!defined('ABSPATH')) {
    exit;
}

function elixir_preporuke_djubrenja()
{
    $args = array(
        'post_type' => 'preporuka_djubrenja',
        'post_status' => 'publish',
        'posts_per_page' => -1,
    );

    $params['class'] = 'mix col-md-6 col-lg-4 mb-4';

    $the_query = new WP_Query($args);

    ob_start();
?>
    <div class="mb-5 d-flex flex-wrap justify-content-center">
        <button type="button" class="btn btn-outline-primary m-1" data-filter="all"><?php echo __('All', 'elixir'); ?></button>
        <button type="button" class="btn btn-outline-primary m-1" data-filter=".category-ratarstvo">Ratarstvo</button>
        <button type="button" class="btn btn-outline-primary m-1" data-filter=".category-povrtarstvo">Povrtarstvo</button>
        <button type="button" class="btn btn-outline-primary m-1" data-filter=".category-vocarstvo">Voćarstvo</button>
        <button type="button" class="btn btn-outline-primary m-1" data-filter=".category-vinogradarstvo">Vinogradarstvo</button>
    </div>
    <?php
    // The Loop
    if ($the_query->have_posts()) {
        echo '<div class="row" id="preporuke-djubrenja-mix">';
        while ($the_query->have_posts()) {
            $the_query->the_post();
            get_template_part('loop-templates/content', get_post_format(), $params);
        }
        echo '</div>';
    } else {
        echo '<p>No posts found.</p>';
    }
    /* Restore original Post Data */
    wp_reset_postdata();
    return ob_get_clean();
}


add_shortcode('elixir-preporuke-djubrenja', 'elixir_preporuke_djubrenja');

function elixir_oglasi_za_posao()
{
    $args = array(
        'post_type' => 'oglas_za_posao',
        'post_status' => 'publish',
        'posts_per_page' => -1,
    );

    $params = array(
        'class' => 'mix col-md-6 col-lg-4 mb-4',
        'job-details' => true,
        'button' => 'outline-primary',
        'button-text-style' => 'text_arrow',
        'image' => 'none'
    );

    $the_query = new WP_Query($args);

    


    ob_start();
    ?>

    
<?php
    // The Loop
    if ($the_query->have_posts()) {
        /*$kompanije = array();
        $oglasi = $the_query->get_posts();
            foreach( $oglasi as $oglas ) { 
                $kompanije[] = carbon_get_post_meta($oglas->ID, 'clanica');
            }
        if(current_user_can('administrator')) {
            print_rr(array_unique($kompanije));
        }*/
        ?>
        <div class="row mb-5 justify-content-center" >
        <div class="col-md-4 col-lg-3">
        <label for="jobs-company" class="form-label"><?php echo __('Company', 'elixir'); ?></label>
            <select class="form-select" id="jobs-company" autocomplete="off">
                <option selected value=""><?php echo __('Show all', 'elixir'); ?></option>

                <option value="ElixirGroup">Elixir Group</option>
                <option value="ElixirZorka">Elixir Zorka</option>
                <option value="ElixirPrahovo">Elixir Prahovo</option>
                <option value="ElixirAgrar">Elixir Agrar</option>
                <option value="ElixirCraft">Elixir Craft</option>
                <option value="ElixirFeed">Elixir Feed</option>
            </select>
        </div>
        <div class="col-md-4 col-lg-3">
        <label for="jobs-location" class="form-label"><?php echo __('Location', 'elixir'); ?></label>
            <select class="form-select" id="jobs-location" autocomplete="off">
                <option selected value=""><?php echo __('Show all', 'elixir'); ?></option>
                <option value="ph">Prahovo</option>
                <option value="sb">Šabac</option>
                <option value="bg">Beograd</option>
                <option value="ns">Novi Sad</option>
            </select>
        </div>
        </div>

        <?php
        echo '<div class="row" id="oglasi-za-posao-mix" style="min-height: 230px;">';
        while ($the_query->have_posts()) {
            $the_query->the_post();
            get_template_part('loop-templates/content', get_post_format(), $params);
        }
        echo '<div id="no-jobs-found" class="col-md-8 col-lg-6 mx-auto pb-100 pt-5 text-center" style="display: none;"><p class="text-muted font-heading fw-700">NEMA REZULTATA PO TRAŽENIM KRITERIJUMIMA</p><button id="reset-job-mix" class="btn btn-outline-primary btn-sm" role="button">PRIKAŽI SVE OTVORENE POZICIJE</button></div>';
        echo '</div>';
    } else {
        echo '<p>Trenutno nema aktivnih pozicija.</p>';
    }
    /* Restore original Post Data */
    wp_reset_postdata();
    return ob_get_clean();
}


add_shortcode('elixir-oglasi-za-posao', 'elixir_oglasi_za_posao');


function prahovo_org_celine(){
    ob_start();
    get_template_part('template-parts/prahovo-org-celine');
    return ob_get_clean();
}

add_shortcode('prahovo-org-celine', 'prahovo_org_celine');


function elixir_reports(){
    $reports = carbon_get_theme_option('elixir_reports');
    if(!is_array($reports)) return;
    ob_start(); ?>
    <ul class="list-group list-group-flush list-unstyled">
        
    <?php 
    $lang = elixir_get_current_language();
    foreach ($reports as $r){
        echo '<li class="list-group-item ps-0"><a href="'.wp_get_attachment_url( $r['report_'.$lang] ).'" target="_blank" class="link-primary">'.$r['title_'.$lang].'<i class="icon-right ms-3"></i></a></li>';
    }
    ?>
    </ul>
    <?php 
    return ob_get_clean();
}

add_shortcode('elixir-reports', 'elixir_reports');

function elixir_company_logo( $atts ){
    $a = shortcode_atts( array(
        'company' => 'ElixirGroup',
        'width' => false,
        'height' => '60px',
        'class' => false,
        ), $atts );

        return get_company_logo($a['company'],  $a['width'], $a['height'], $a['class'], true);
}

add_shortcode('elixir-company-logo', 'elixir_company_logo');


function elixir_menu_logo(){
    $logo = 'ElixirGroup';
		if(is_page('elixir-zorka')){
			$logo = 'ElixirZorka';
		} else if(is_page('elixir-prahovo')){
			$logo = 'ElixirPrahovo';
		} else if(is_page('elixir-agrar')){
			$logo = 'ElixirAgrar';
		} else if(is_page('elixir-craft')){
			$logo = 'ElixirCraft';
		} else if(is_page('elixir-feed')){
			$logo = 'ElixirFeed';
		} else if(is_page('elixir-fondacija')){
			$logo = 'ElixirFondacija';
		}
        return get_company_logo($logo,  false, '40px', false, true);
}

add_shortcode('elixir-menu-logo', 'elixir_menu_logo');