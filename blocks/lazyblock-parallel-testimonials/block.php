<?php if(!$attributes['hide-from-website']) : ?>
<div class="parallel-testimonials-wrapper">
<svg class="testimonial-quotes" fill="none" viewBox="0 0 230 180" xmlns="http://www.w3.org/2000/svg">
<path d="m129.36 179.34v-44.1c13.72-3.136 24.892-8.82 33.516-17.052 9.016-8.624 14.896-18.62 17.64-29.988h-39.396v-88.2h88.2v51.156c0 34.496-8.428 62.916-25.284 85.26-16.856 21.952-41.748 36.26-74.676 42.924zm-129.36 0v-44.1c13.72-3.136 24.892-8.82 33.516-17.052 9.016-8.624 14.896-18.62 17.64-29.988h-39.396v-88.2h88.2v51.156c0 34.496-8.428 62.916-25.284 85.26-16.856 21.952-41.748 36.26-74.676 42.924z" fill="#0E41BF"/>
</svg>
<div class="parallel-testimonials rounded p-4 p-lg-5 mb-5">
<?php foreach( $attributes['testimonial'] as $t) : ?>
<div class="parallel-testimonial-wrapper w-100">
  <div class="parallel-testimonial mb-4 h3">
    <?php echo apply_filters('the_content', $t['testimonial']); ?>
  </div>
  <div class="d-flex flex-wrap align-items-center">
  <?php if (isset( $t['person-image']['id'] )) {
    echo '<div class="parallel-testimonial-image-wrapper ratio ratio-1x1 rounded-circle border border-white border-3 overflow-hidden me-3">';
    echo wp_get_attachment_image($t['person-image']['id'], 'thumbnail', '', array('class' => 'parallel-testimonial-image fit-cover'));
    echo '</div>';
  } ?>
  <div>
  <p class="lead mb-0 font-800"><?php echo $t['person-name']; ?></p>
  <?php echo (isset( $t['person-title'] )) ? '<p class="ls-20pc text-uppercase mb-0 font-800">'.$t['person-title'].'</p>' : ''; ?>
  </div>
  </div>
</div>
<?php endforeach; ?>
</div>
<div class="d-flex flex-wrap justify-content-center">
  <button class="btn btn-outline-primary text-white testimonial-previous mx-2"><svg class="me-3" width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.99121 14.0179L3.97334 8L9.99121 1.98213L8.00908 -8.66415e-08L0.00908435 8L8.00908 16L9.99121 14.0179Z" fill="white"/>
</svg>PREVIOUS</button>
  <button class="btn btn-outline-primary text-white testimonial-next mx-2">NEXT<svg class="ms-3" width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.00878845 1.98213L6.02666 8L0.00878898 14.0179L1.99092 16L9.99091 8L1.99091 8.67033e-07L0.00878845 1.98213Z" fill="white"/></svg></button>
</div>
</div>
<?php endif; ?>