<?php
$company = $attributes['company'];
if($attributes['logo-version'] == 'with-space'){
    $company .= '_b';
}
$width = isset($attributes['logo-width']) ? $attributes['logo-width'] != 0 ? $attributes['logo-width'].'px' : false : false;
$height = isset($attributes['logo-height']) ? $attributes['logo-height'] != 0 ? $attributes['logo-height'].'px' : false : false;
if (!$width && !$height) {
    $height = '60px';
}

$animation = isset($attributes['aos_animation']) ? elixir_generate_data_aos($attributes) : false;

$classes = array();
$classes[] = $attributes['className'] ?: '';
$classes[] = $attributes['color'] ?: '';

$class = array_filter($classes) ? implode(' ', $classes) : false;

if($attributes['inline-style-wrapper'] || $animation){
    echo '<div style="'.$attributes['inline-style-wrapper'].'" '.$animation.'>';
}
if($attributes['add-link']){
    echo '<a href="'.$attributes['add-link'].'" target="'.$attributes['link-target'].'">';
}
get_company_logo($company, $width, $height, $class);

if($attributes['add-link']){
    echo '</a>';
}
if($attributes['inline-style-wrapper'] || $animation){
    echo '</div>';
}