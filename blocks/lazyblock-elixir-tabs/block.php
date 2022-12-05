<?php
$nav_classes = array('nav', 'w-100', 'mb-5');
$nav_styles = array();
if('vertical' === $attributes['tabs-orientation']){
  $nav_classes[] = 'flex-lg-column';
    $nav_classes[] = 'col-lg-auto';
    if($attributes['navigation-width'] != 0){
      $nav_classes[] = 'w-lg-'. $attributes['navigation-width'];
    } else {
      $nav_classes[] = 'w-lg-auto';
    }
}

$nav_class = ' class="'.implode(' ', $nav_classes).'"';
$nav_style = $nav_styles ? ' style="'.implode('; ', $nav_styles).'"' : '';
$nav = '<nav'.$nav_class.$nav_style.' role="tablist">';
$content = '<div class="tab-content col">';
$i = 1;
foreach ($attributes['tab'] as $tab){
  $title = get_the_title( $tab['tab-id'] );
  if(isset($tab['tab-title'])){
    $title = !empty($tab['tab-title']) ? $tab['tab-title'] : $title;
  }
  $btn_class = 'nav-link';
  $btn_class .= $i === 1 ? ' active' : '';
  $btn_class .= $attributes['capitalize-titles'] ? ' text-uppercase' : '';
  $btn_class .= $attributes['nav-font-size'] ? ' '.$attributes['nav-font-size'] : '';
  $slug = sanitize_title($title);
  $nav.= '<span class="'.$btn_class.'" id="'.$slug.'-nav" data-bs-toggle="tab" data-bs-target="#tab-'.$slug.'" type="button" role="tab">'.$title.'</span>';
  
  $content_class = $i === 1 ? 'tab-pane fade show active' : 'tab-pane fade';
  $content .= '<div class="'.$content_class.'" id="tab-'.$slug.'" role="tabpanel">';
  $content .= apply_filters( 'the_content', get_post_field( 'post_content', $tab['tab-id'] ) );
  $content .= '</div>';
  $i++;
}
$nav .= '</nav>';
$content .= '</div>';


echo '<div class="elixir-tabs d-flex flex-wrap align-items-start">';
echo $nav.$content;
echo '</div>';

