<?php

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
  $classes[] = $attributes['hide-from-website'] ? 'opacity-50' : '';
  $classes[] = 'elixir-product-hero';


  if (array_filter($classes)) {
    $class = ' class="' . implode(" ", array_unique(array_filter($classes))) . '"';
  }
  if ($styles) {
    $style = ' style="' . implode(";", array_unique(array_filter($styles))) . '"';
  }
?>

  <section<?php echo $id . $class . $style . $animation; ?>>
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
      <div class="row">
        <div class="col-lg-8 content-col">
          <InnerBlocks />
        </div>
        <div class="col-lg-4 product-image-col">
          <?php
          if (isset($attributes['product-image']['id'])) {
            echo wp_get_attachment_image($attributes['product-image']['id'], 'medium', false, array(
              'class' => 'd-block mx-auto mb-5'
            ));
          }
          ?>
        </div>
      </div>
      <?php if (array_filter($inner_classes)) : ?>
      </div>
    <?php endif; ?>
    <div class="container content-box position-relative opacity-100">
      <div class="row">
        <div class="col-lg-8">
          <div class="rounded p-3 p-lg-5 shadow bg-white">
            <?php echo apply_filters('the_content', $attributes['content-box']); ?>
          </div>
        </div>
      </div>
    </div>
    </section>
