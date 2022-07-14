<?php
$count = $attributes['number'];
$tag = $attributes['element-tag'];
$offset = $attributes['trigger-offset'];
$suffix = $attributes['suffix'];
$classes = array('elixir-countup');
$classes[] = $attributes['className'] ?: '';
$o = '';

if ($suffix) {
    $o .= '<' . $tag . ' class="' . implode(' ', array_unique(array_filter($classes))) . '">';
    $o .= '<span data-aos data-aos-id="elixir-countup" data-aos-offset="' . $offset . '" data-count="' . $count . '">' . $count . '</span>';
    $o .= $suffix;
} else {
    $o .= '<' . $tag . ' class="' . implode(' ', array_unique(array_filter($classes))) . '" data-aos data-aos-id="elixir-countup" data-aos-offset="' . $offset . '" data-count="' . $count . '">'. $count;
}
$o .= '</' . $tag . '>';
echo $o;