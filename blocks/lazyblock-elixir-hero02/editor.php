
<?php

$img_atts = array(
    'class' => 'fit-cover w-100 h-100  rounded-bottom rounded-start',
    'style' => 'object-position: ' . $attributes['image-position-x'] . '% ' . $attributes['image-position-x'] . '%'
);

?>
<?php if (isset($attributes['bg-image']['id'])) : ?>
 <div class="hero-image ms-auto">
        <?php echo wp_get_attachment_image($attributes['bg-image']['id'], 'full', '', $img_atts); ?>
  </div>
<?php endif; ?>
