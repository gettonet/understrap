<?php if(is_array($attributes['gallery'])): ?>
<div class="row" data-masonry='{"percentPosition": true }'>
<?php
foreach( $attributes['gallery'] as $img ): ?>
<div class="col-sm-6 col-lg-4 mb-3 mb-lg-4 text-center">
<?php echo wp_get_attachment_image( $img['id'], 'medium', "", array(
    "class" => "rounded-top rounded-start img-fluid",
    "data-src" => esc_url( $img['url'] ),
    "data-fancybox" => $attributes['gallery-name'],
    "role" => "button"
)); ?>
</div>
<?php endforeach; ?>
</div>
<?php endif; ?>