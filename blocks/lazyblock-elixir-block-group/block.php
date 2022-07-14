
<?php 
$classes = $styles = array();
$animation = isset($attributes['aos_animation']) ? elixir_generate_data_aos($attributes) : NULL;

if ($attributes['bg-color']) {
    $colors = elixir_generate_color_palette();
    $color_class = false;
    if (is_array($colors)) {
      foreach (array_column($colors, 'color') as $k => $v) {
        if ($v === $attributes['bg-color']) {
          $classes[] = 'bg-'. $colors[$k]['slug'];
          $color_class = true;
          continue;
        }
      }
    }
    if(!$color_class){
        $styles[] = 'background-color:' . $attributes['bg-color'];
    }
  }

  $styles[] = $attributes['inline-wrapper-style'] ?: '';
  $classes[] = $attributes['className'] ?: '';
  
  $classes = array_filter($classes);
  $styles = array_filter($styles);
  $class = $classes ? ' class="'.implode(' ', $classes).'"' : '';
  $style = $styles ? ' style="'.implode(';', $styles).'"' : '';
  $id = $attributes['anchor'] ? ' id="'.$attributes['anchor'].'"' : '';
?>
<div<?php echo $id.$class.$style.$animation; ?>>
<?php echo $attributes['content']; ?>
</div>