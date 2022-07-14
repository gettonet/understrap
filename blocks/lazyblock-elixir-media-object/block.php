<div class="d-flex<?php echo 'center' === $attributes['layout'] ? ' flex-column text-center' : ''; ?>">
  <div class="<?php echo 'ic-co' === $attributes['layout'] ? 'flex-shrink-0' : 'mb-3'; ?>">
      <?php
      if(isset($attributes['custom-icon']['id'])){
        echo wp_get_attachment_image( $attributes['custom-icon']['id'], array(50,50));
      } else {
          echo '<i class="fs-1 lh-1 icon-'.$attributes['icon'].' text-'.$attributes['icon-color'].'"></i>';
      }
      ?>
  </div>
  <div class="<?php echo 'ic-co' === $attributes['layout'] ? 'flex-grow-1 ms-3' : ''; ?>">
    <p class="fs-5 fw-500 lh-1 font-heading"><?php echo $attributes['title']; ?></p>
    <?php echo apply_filters('the_content', $attributes['content']); ?>
    <?php if($attributes['cta-text']) : ?>
        <a class="mb-3 btn btn-<?php echo $attributes['outline'] ? 'outline-'.$attributes['cta-style'] : $attributes['cta-style']; ?>" href="<?php echo $attributes['cta-url'] ?: '#'; ?>">
        <?php echo $attributes['cta-text'] ?>
        </a>
    <?php endif; ?>
  </div>
</div>