<?php if (!$attributes['hide-from-website']) :
  $slider_args = array(
    "cellAlign" => "center",
    "autoPlay" => 6000,
    "prevNextButtons" => false,
    "wrapAround" => true
  );

  echo '<div class="elixir-testimonials-slider pb-4 mb-5" data-flickity=\'' . json_encode($slider_args) . '\'>';
  foreach ($attributes['testimonials'] as $t) : ?>
    <div class="elixir-testimonial">
      <div class="row align-items-center">
        <div class="col-12 col-md-6 order-2 order-md-1">
          <div class="ratio ratio-3x2 mb-4">
            <?php
            if (isset($t['person-image']['id'])) {
              echo wp_get_attachment_image($t['person-image']['id'], 'medium', '', array('class' => 'img-fluid rounded-start rounded-top fit-cover w-100 h-100'));
            }
            ?>
          </div>
        </div>
        <div class="col-12 col-md-6 col-xxl-5 offset-xxl-1 order-1 order-md-2">
            <?php echo apply_filters('the_content', $t['testimonial']); ?>
        </div>
      </div>
    </div>
  <?php endforeach; ?>
  </div>
<?php endif; ?>