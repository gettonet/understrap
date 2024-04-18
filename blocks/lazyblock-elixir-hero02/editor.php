<?php
$img_atts = array(
    'class' => 'fit-cover w-100 h-100  rounded-bottom rounded-start',
    'style' => 'object-position: ' . $attributes['image-position-x'] . '% ' . $attributes['image-position-y'] . '%'
);
?>
<?php if (!isset($attributes['bg-image']['id'])) : ?>
    <section id="elixir-hero" class="bg-elixir-<?php echo $attributes['gradient-color']; ?>-gradient<?php echo $attributes['className'] ? ' '.$attributes['className'] : ''; ?>">
        <div class="container">
        <InnerBlocks />
        </div>
    </section>
<?php else : ?>
    <section id="elixir-hero" class="position-relative<?php echo $attributes['className'] ? ' '.$attributes['className'] : ''; ?>">
        <div class="bg-elixir-<?php echo $attributes['gradient-color']; ?>-gradient w-100 h-90 h-md-80 h-lg-75 position-absolute top-0 left-0 z-0"></div>
        <div class="position-relative z-1">
            <div class="container">
                <InnerBlocks />
            </div>
            <?php if (isset($attributes['bg-image']['id'])) : ?>
                <div class="hero-image ms-auto">
                    <?php echo wp_get_attachment_image($attributes['bg-image']['id'], 'full', '', $img_atts); ?>
                </div>
            <?php endif; ?>
        </div>
    </section>
<?php endif; ?>