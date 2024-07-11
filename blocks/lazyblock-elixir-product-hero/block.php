<?php
if (!$attributes['hide-from-website']) {
  $id = $attributes['anchor'] ? ' id="' . $attributes['anchor'] . '"' : '';
  $style = $class = $bgstyle = $bgclass = $animation = NULL;
  $animation = isset($attributes['aos_animation']) ? elixir_generate_data_aos($attributes) : NULL;
  $classes = $styles = array();
  $inner_classes = array();
  $colors = elixir_generate_color_palette();
  $bg = false;

  if (isset($attributes['align'])) {
    $classes[] = !empty($attributes['align']) ? 'align' . $attributes['align'] : '';
  }

  $classes[] = $attributes['className'] ?: '';
  $classes[] = 'elixir-product-hero';


  if (array_filter($classes)) {
    $class = ' class="' . implode(" ", array_unique(array_filter($classes))) . '"';
  }
  if ($styles) {
    $style = ' style="' . implode(";", array_unique(array_filter($styles))) . '"';
  }
?>

  <section<?php echo $id . $class . $style . $animation; ?>>
    <div class="position-relative">
      <?php
      echo '<div class="bg-image-wrapper w-100 position-absolute start-0 top-0">';
      if (isset($attributes['bg-image']['id'])) {
        echo wp_get_attachment_image($attributes['bg-image']['id'], 'full', '', array(
          'class' => 'bg-image w-100 h-100 fit-cover',
          'style' => 'object-position: ' . $attributes['image-pos-x'] . '% ' . $attributes['image-pos-y'] . '%'
        ));
      }
      echo '</div>';
      echo '<div class="wood-image-wrapper w-100 rounded-bottom overflow-hidden position-absolute start-0 bottom-0">';
      if (isset($attributes['wood-image']['id'])) {
        echo wp_get_attachment_image($attributes['wood-image']['id'], 'full', '', array(
          'class' => 'w-100 h-100 fit-cover',
          'style' => 'object-position: ' . $attributes['wood-image-pos-x'] . '% ' . $attributes['wood-image-pos-y'] . '%'
        ));
      }
      echo '</div>';

      $inner_classes[] = 'container pt-100 position-relative';
      ?>
      <?php if (array_filter($inner_classes)) : ?>
        <div class="<?php echo implode(" ", array_unique(array_filter($inner_classes))); ?>">
        <?php endif; ?>
        <div class="row gy-5">
          <div class="col-lg-8 content-col pe-lg-5">
            <div class="content-wrapper">
              <InnerBlocks />
            </div>
          </div>
          <div class="col-lg-4 product-image-col">
            <?php
            if (isset($attributes['product-image']['id'])) {
              echo wp_get_attachment_image($attributes['product-image']['id'], 'medium', false, array(
                'class' => 'd-block mx-auto mb-5 w-80 w-md-60 w-lg-100'
              ));
            }
            ?>
          </div>
        </div>
        <?php if (array_filter($inner_classes)) : ?>
        </div>
      <?php endif; ?>
    </div>
    <div class="container content-box position-relative">
      <div class="row">
        <div class="col-lg-8 pe-lg-5">
          <div class="rounded p-3 p-lg-5 shadow bg-white">
            <?php echo apply_filters('the_content', $attributes['content-box']); ?>
            <?php if ($attributes['include-contact-modal']) : ?>
              <button data-bs-toggle="modal" data-bs-target="#kontakt-modal" class="btn btn-primary mt-3"><?php echo __('Kontaktirajte nas', 'elixir'); ?></button>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </div>
    </section>
  <?php } ?>
  <?php if ($attributes['include-contact-modal']) : ?>
    <?php ob_start(); ?>
    <div class="modal fade" id="kontakt-modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <p class="modal-title h5"><?php echo __('Kontaktirajte naš prodajni tim', 'elixir'); ?></p>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="mb-5"><?php echo __('Saznajte više o našim proizvodima i preporukama đubrenja. Popunite formu niže i neko od naših eksperata će vas kontaktirati.', 'elixir'); ?></p>
            <?php echo do_shortcode('[contact-form-7 id="8267f77" title="Kontakt - proizvodi"]'); ?>
          </div>
        </div>
      </div>
    </div>
    <?php $modal = ob_get_clean(); ?>
    <?php add_action('wp_footer', function () use ($modal) {
      echo $modal;
    }); ?>
  <?php endif; ?>