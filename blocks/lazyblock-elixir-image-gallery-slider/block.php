<?php
  $ratio = $attributes['aspect-ratio'];
  if ($attributes['flip-orientation']) {
    switch ($attributes['aspect-ratio']) {
      case '3x2':
        $ratio = '2x3';
        break;
      case '4x3':
        $ratio = '3x4';
        break;
      case '16x9':
        $ratio = '9x16';
        break;
      case '21x9':
        $ratio = '9x21';
        break;
    }
  }
    $slider_args = array(
        "cellAlign" => "center", 
        "autoPlay" => 6000,
        "prevNextButtons" => false,
        "wrapAround" => true
    );
    
    echo '<div class="elixir-image-slider pb-4 mb-5" data-flickity=\''.json_encode($slider_args).'\'>';
    foreach ($attributes['images'] as $image){
        echo '<div class="w-100 w-lg-75 w-xl-60 w-xxl-50 p-2">';
        echo '<div class="ratio ratio-'.$ratio.' rounded-top rounded-start overflow-hidden">';
        echo wp_get_attachment_image($image['id'], 'xlarge', '', array('class' => 'w-100 h-100 fit-cover'));
        echo '</div></div>';
    }
    echo '</div>';
