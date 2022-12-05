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
$classes = array();
$classes[] = $attributes['className'] ?: '';
$classes[] = $attributes['color'] ?: '';

$class = array_filter($classes) ? implode(' ', $classes) : false;

if($attributes['inline-style-wrapper']){
    echo '<div style="'.$attributes['inline-style-wrapper'].'">';
}
get_company_logo($company, $width, $height, $class);
if($attributes['inline-style-wrapper']){
    echo '</div>';
}