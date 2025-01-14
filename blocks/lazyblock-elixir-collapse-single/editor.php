<?php

defined( 'ABSPATH' ) || exit;
$id = $attributes['title'] ? sanitize_title($attributes['title']) : generateRandomString(5)

?>
<a class="px-3 d-flex align-items-center justify-content-between collapsed" data-bs-toggle="collapse" href="#<?php echo $id; ?>" role="button" aria-expanded="false" aria-controls="<?php echo $id; ?>">
<?php 
echo sprintf(
    '<%1$s%2$s>%3$s</%1$s>',
    $attributes['title-tag'], // %1$s: The title tag (e.g., h1, h2, etc.)
    $attributes['className'] ? ' class="' . $attributes['className'] . '"' : '', // %2$s: The class attribute if it exists
    $attributes['title'] // %4$s: The title content
);
?>
<i class="h6 mb-0 icon-elixir-collapse"></i>
</a>
<div class="collapse show" id="<?php echo $id; ?>">
<InnerBlocks />
</div>
