<?php
$img_classes = array(
  'img-fluid',
  $attributes['img-class'],
  $attributes['border-radius']
);
$style = $img_styles = false;
if($attributes['img-style']) {
    $img_styles = array();
  foreach($attributes['img-style'] as $style) {
    $img_styles[] = $style['property'] . ':' . $style['value'];
  }
}

$caption = $attributes['caption'] ?: false;
$wrapper_classes = array();
$wrapper_classes[] = $attributes['className'] ?: '';
if ($caption){
  $wrapper_classes[] = 'position-relative';
}

if ($attributes['aspect-ratio'] != 'original') {
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
  $wrapper_classes[] = 'ratio ratio-' . $ratio;
  $img_classes[] = 'fit-cover w-100 h-100';
}

if (isset($attributes['align'])) {
  $wrapper_classes[] = !empty($attributes['align']) ? 'text-' . $attributes['align'] : '';
}

$wrapper_classes = array_filter($wrapper_classes);
$img_classes = array_filter($img_classes);

if($wrapper_classes){
  if(strpos($attributes['className'], 'mb-') === false && strpos($attributes['className'], 'my-') === false){
    $wrapper_classes[] = 'mb-4';
  }
} else {
  if(strpos($attributes['img-class'], 'mb-') === false && strpos($attributes['img-class'], 'my-') === false){
    $img_classes[] = 'mb-4';
  }
}

$w_class = $wrapper_classes ? ' class="' . implode(" ", $wrapper_classes) . '"' : '';
$w_style = $attributes['inline-styles-wrapper'] ? ' style="' . $attributes['inline-styles-wrapper'] . '"' : false;
$img_class = implode(" ", array_unique($img_classes));
$img_atts = array(
  'class' => $img_class
);

if ($attributes['open-in-lightbox']) {
  $img_atts['data-src'] = esc_url($attributes['image']['url']);
  $img_atts['data-fancybox'] = $attributes['part-of-gallery'];
  $img_atts['role'] = 'button';
}

if($attributes['title-attribute']) {
  $img_atts['title'] = $attributes['title-attribute'];
}

if($img_styles) {
  $img_atts['style'] = implode(';', $img_styles);
}

echo $w_class || $w_style || $caption ? '<div' . $w_class . $w_style . '>' : '';

if (isset($attributes['image']['id'])) {
  echo wp_get_attachment_image($attributes['image']['id'], $attributes['image-size'], '', $img_atts);
} else {
  echo ' <svg class="' . $img_class . ' w-100 h-100" width="16" height="9">
    <rect style="fill:#929292;width:100%;height:100%" />
  </svg>';
}
echo $caption ? '<span class="elixir-caption bg-primary text-white p-2 small position-absolute bottom-0 right-0 top-auto left-auto w-auto h-auto">'.$attributes['caption'].'</span>' : '';
echo $w_class || $w_style || $caption ? '</div>' : '';
