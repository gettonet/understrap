<?php
if (!$attributes['hide-from-website']) {
  $id = $attributes['anchor'] ? ' id="' . $attributes['anchor'] . '"' : '';
  $style = $class = $bgstyle = $bgclass = $animation = NULL;
  $animation = isset($attributes['aos_animation']) ? elixir_generate_data_aos($attributes) : NULL;
  $classes = $styles = $bgclasses = $bgstyles = array();
  $inner_classes = array();
  $colors = elixir_generate_color_palette();
  $bg = false;

  $bgh = isset($attributes['bg-height']) ? $attributes['bg-height'] < 100 ? 'h-' . $attributes['bg-height'] : 'h-100' : 'h-100';
  $bgh_md = isset($attributes['bg-height-md']) ? $attributes['bg-height-md'] < 100 ? 'h-md-' . $attributes['bg-height-md'] : false : false;
  $bgh_lg = isset($attributes['bg-height-lg']) ? $attributes['bg-height-lg'] < 100 ? 'h-lg-' . $attributes['bg-height-lg'] : false : false;


  if (isset($attributes['align'])) {
    $classes[] = !empty($attributes['align']) ? 'align' . $attributes['align'] : '';
  }

  if ($attributes['bg-color'] || isset($attributes['bg-image']['url'])) {
    $inner_classes[] = 'position-relative z-1';
    $bgclasses[] = 'bg-layer position-absolute z-0 w-100 left-0';
    $bgclasses[] = $attributes['bg-position'];
    $bgclasses[] = $bgh;
    $bgclasses[] = $bgh_md ?: '';
    $bgclasses[] = $bgh_lg ?: '';
    $classes[] = 'position-relative';

    /*if (isset($attributes['bg-image']['url'])) {
      //$bgclasses[] = 'bg-cover';
      //$bgclasses[] = 'bg-center';
      //$bgclasses[] = $attributes['fixed-bg'] ? 'bg-fixed' : '';
      //$bgstyles[] = 'background-image:url(\'' . $attributes['bg-image']['url'] . '\')';
      //$bgstyles[] = 'background-position: ' . $attributes['image-pos-x'] . '% ' . $attributes['image-pos-y'] . '%';
    }*/
  }

  $classes[] = $attributes['className'] ?: '';



  if (array_filter($classes)) {
    $class = ' class="' . implode(" ", array_unique(array_filter($classes))) . '"';
  }
  if ($styles) {
    $style = ' style="' . implode(";", array_unique(array_filter($styles))) . '"';
  }
  if (array_filter($bgclasses)) {
    $bgclass = ' class="' . implode(" ", array_unique(array_filter($bgclasses))) . '"';
  }
  if ($bgstyles) {
    $bgstyle = ' style="' . implode(";", array_unique(array_filter($bgstyles))) . '"';
  }
?>

  <section<?php echo $id . $class . $style . $animation; ?>>
    <?php if ($bgclasses) {
      echo '<div' . $bgclass . $bgstyle . '>';
      if ($attributes['bg-color']) {
        $color_class = false;
        if (is_array($colors)) {
          foreach (array_column($colors, 'color') as $k => $v) {
            if ($v === $attributes['bg-color']) {
              $color_class = 'bg-' . $colors[$k]['slug'];
              continue;
            }
          }
        }
        echo $color_class ? '<div class="w-100 h-100 position-absolute ' . $color_class . '"></div>' : '<div class="w-100 h-100 position-absolute" style="background-color: ' . $attributes['bg-color'] . '"></div>';
      }
      if (isset($attributes['bg-image']['id'])) {
        echo wp_get_attachment_image($attributes['bg-image']['id'], 'full', '', array(
          'class' => 'w-100 h-100 fit-cover',
          'style' => 'object-position: ' . $attributes['image-pos-x'] . '% ' . $attributes['image-pos-y'] . '%'
        ));
      }
      echo '</div>';
    }
    if ($attributes['add-container']) {
      $inner_classes[] = $attributes['additional-container-class'] ?: '';
      $inner_classes[] = 'container';
    }
    ?>
    <?php if (array_filter($inner_classes)) : ?>
      <div class="<?php echo implode(" ", array_unique(array_filter($inner_classes))); ?>">
      <?php endif; ?>
      <InnerBlocks />
      <?php if (array_filter($inner_classes)) : ?>
      </div>
    <?php endif; ?>
    </section>
  <?php } ?>