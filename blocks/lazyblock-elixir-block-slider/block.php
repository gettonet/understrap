<?php 
  $slider_args = array(
    "cellAlign" => "center",
    "autoPlay" => 6000,
    "prevNextButtons" => false,
    "fade" => true
  );

  echo '<div class="elixir-block-slider" data-flickity=\'' . json_encode($slider_args) . '\'>';
    echo $attributes['slides'];
  echo '</div>';
?>