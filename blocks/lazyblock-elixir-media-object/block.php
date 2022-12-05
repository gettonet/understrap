<div class="d-flex<?php echo 'center' === $attributes['layout'] ? ' flex-column text-center' : ''; ?>">
  <div class="<?php echo 'ic-co' === $attributes['layout'] ? 'flex-shrink-0' : 'mb-3'; ?>">
      <?php
      if(isset($attributes['custom-icon']['id'])){
        $w = $attributes['custom-icon-width'];
        echo wp_get_attachment_image( $attributes['custom-icon']['id'], array($w,$w), '', array(
          'style' => 'width: '.$w.'px'
        ));
      } else {
          echo '<i class="fs-1 lh-1 icon-'.$attributes['icon'].' text-'.$attributes['icon-color'].'"></i>';
      }
      ?>
  </div>
  <div class="<?php echo 'ic-co' === $attributes['layout'] ? 'flex-grow-1 ms-3' : ''; ?>">
    <p class="fs-5 fw-500 lh-1 font-heading<?php echo isset($attributes['heading-color']) ? ' text-'.$attributes['heading-color'] : ''; ?>"><?php echo $attributes['title']; ?></p>
    <?php echo isset($attributes['text-color']) ? '<div class="text-'.$attributes['text-color'].'">' : ''; ?>
    <?php echo apply_filters('the_content', $attributes['content']); ?>
    <?php echo isset($attributes['text-color']) ? '</div>' : ''; ?>
    <?php if($attributes['cta-text']) : ?>
        <a class="mb-3 btn btn-<?php echo $attributes['outline'] ? 'outline-'.$attributes['cta-style'] : $attributes['cta-style']; ?>" href="<?php echo $attributes['cta-url'] ?: '#'; ?>">
        <?php echo $attributes['cta-text'] ?>
        </a>
    <?php endif; ?>
  </div>
</div>