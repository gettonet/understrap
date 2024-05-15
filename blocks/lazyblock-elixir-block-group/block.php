<?php 
$classes = $styles = array();
$animation = isset($attributes['aos_animation']) ? elixir_generate_data_aos($attributes) : NULL;
$data = '';
if($attributes['data-attributes']){
  foreach ($attributes['data-attributes'] as $att) {
    $data .= ' data-'.$att['title'].'="'.$att['value'].'"';
  }
}
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

  $styles[] = preg_match('~[0-9]+~',$attributes['custom-width']) ? 'width: '.$attributes['custom-width']: ''; 
  $styles[] = preg_match('~[0-9]+~',$attributes['custom-width']) ? 'max-width: 100%' : ''; 
  $styles[] = $attributes['inline-wrapper-style'] ?: '';
  $classes[] = $attributes['className'] ?: '';
  
  $classes = array_filter($classes);
  $styles = array_filter($styles);
  $class = $classes ? ' class="'.implode(' ', $classes).'"' : '';
  $style = $styles ? ' style="'.implode(';', $styles).'"' : '';
  $id = $attributes['anchor'] ? ' id="'.$attributes['anchor'].'"' : '';
?>
<div<?php echo $id.$class.$style.$animation.$data; ?>>
<InnerBlocks />
</div>