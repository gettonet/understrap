<?php
$classes = $wrapper_classes = array();
$additional_class = $attributes['additional-button-class'];
$url = $attributes['url'] ?: '#';
$url = isset($attributes['link-to-file']['url']) ? $attributes['link-to-file']['url'] : $url;
$content = '';
$animation = isset($attributes['aos_animation']) ? elixir_generate_data_aos($attributes) : NULL;
$link_atts = array();

$classes[] = $attributes['size'];

if($attributes['link']){
    $classes[] = 'btn-link';
    $classes[] = $attributes['style'] != '' ? 'text-'.$attributes['style'] : '';
} else {
    if ($attributes['style']) {
        $classes[] = $attributes['outline'] ? 'btn-outline-' . $attributes['style'] : 'btn-'. $attributes['style'];
    }
}

if (isset($attributes['align'])) {
    if (!empty($attributes['align'])) {
        switch ($attributes['align']) {
            case 'full':
                $classes[] = 'w-100';
                break;
            case 'left':
            case 'right':
            case 'center':
                $wrapper_classes[] = 'text-' . $attributes['align'];
                break;
        }
    }
}

if($attributes['additional-button-class']) {
    $class[] = $attributes['additional-button-class'];
}

if($attributes['className']) {
    $wrapper_classes[] = $attributes['className'];
}


$icon = '<i class="icon-right"></i>';
if(str_contains($attributes['link-style'], 'icon')) {
    $icon = isset($attributes['icon']['url']) ? '<img class="btn-icon me-3" src="' . $attributes['icon']['url'] . '" alt="">' : false;
}
$txt = $attributes['text'] ? $icon ? '<span style="flex: 1;">' . $attributes['text'] . '</span>' : $attributes['text'] : 'No text specified';


switch ($attributes['target']) {
    case '_parent':
    case '_blank':    
        $link_atts[] = 'target="'.$attributes['target'].'"';
        $element = 'a';
        break;
    case 'lightbox':
        $link_atts[] = 'data-fancybox';
        $element = 'a';
        break;
    case '_df_custom':
    /*    $classes[] = 'mb-2 _df_custom';
        $output = '<button source="' . $url . '" class="' . $btn_class . ' mb-2 _df_custom" role="button"';
        $output .= !array_filter($wrapper_classes) ? $animation.'>' : '>';
        $output .= '<span class="d-flex align-items-center">' . $content . '</span></button>';
        $element = 'button';*/
        break;
}

switch ($attributes['link-style']){
    case 'text':
        $content = $attributes['text'];
    break;
    case 'arrow':
        $content = '<i class="icon-right"></i>';
        $classes[] = 'btn-arrow';
    break;
    case 'text-arrow':
        $content = $attributes['text'] . '<i class="icon-right ms-3"></i>';
    break;
    case 'text-icon':
        $content = '<span class="d-flex align-items-center">';
        if($attributes['icon-position'] === 'right') {
        $content .= $attributes['text'] . $icon;
        } else if ($attributes['icon-position'] === 'left') {
        $content .= $icon . $attributes['text'];
        }
        $content .= '</span>';
    break;
    case 'icon':
        $content = $icon;
    break;
    default:
        $content = 'Something\'s wrong';
}

$classes = array_filter($classes);
$wrapper_classes = array_filter($wrapper_classes);
$btn_class = implode (' ', array_unique(array_filter($classes)));

echo $wrapper_classes ? '<div class="' . implode(' ', array_unique($wrapper_classes)) . '"'.$animation.'>' : '';
echo '<' . $element;
echo $btn_class ? ' class="' . $btn_class . '"' : '';
echo $wrapper_classes ? '>' : $animation . '>';
echo $content;
echo '</' . $element . '>';
echo $wrapper_classes ? '</div>' : '';

