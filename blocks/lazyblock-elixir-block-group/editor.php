<?php 
$classes = $styles = array();
$classes[] = $attributes['className'] ?: '';
$classes[] = 'h-100';

if ($attributes['bg-color']) {
    $colors = elixir_generate_color_palette();
    $color_class = false;
    if (is_array($colors)) {
      foreach (array_column($colors, 'color') as $k => $v) {
        if ($v === $attributes['bg-color']) {
          $classes[] = 'bg-'. $colors[$k]['slug'];
          continue;
        }
      }
    } 
    if(!$color_class){
        $styles[] = 'background-color:' . $attributes['bg-color'];
      } 
  }

  $styles[] = $attributes['inline-wrapper-style'] ?: '';
  
  $classes = array_filter($classes);
  $styles = array_filter($styles);
  $class = $classes ? ' class="'.implode(' ', $classes).'"' : '';
  $style = $styles ? ' style="'.implode(';', $styles).'"' : '';
  $id = $attributes['anchor'] ? ' id="'.$attributes['anchor'].'"' : '';
?>
<div<?php echo $id.$class.$style; ?>>
</div>