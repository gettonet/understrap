<?php
$img_atts = array(
    'class' => 'fit-cover w-100 h-100  rounded-bottom rounded-start',
    'style' => 'object-position: ' . $attributes['image-position-x'] . '% ' . $attributes['image-position-x'] . '%'
);
?>
<?php if (!isset($attributes['bg-image']['id'])) : ?>
    <section id="elixir-hero" class="bg-elixir-<?php echo $attributes['gradient-color']; ?>-gradient<?php echo $attributes['className'] ? ' '.$attributes['className'] : ''; ?>" data-aos="fade">
        <div class="container">
            <?php echo $attributes['content']; ?>
        </div>
    </section>
<?php else : ?>
    <section id="elixir-hero" class="position-relative<?php echo $attributes['className'] ? ' '.$attributes['className'] : ''; ?>" data-aos="fade">
        <div class="bg-elixir-<?php echo $attributes['gradient-color']; ?>-gradient w-100 h-90 h-md-80 h-lg-75 position-absolute top-0 left-0 z-0"></div>
        <div class="position-relative z-1">
            <div class="container">
                <?php echo $attributes['content']; ?>
            </div>
            <?php if (isset($attributes['bg-image']['id'])) : ?>
                <div class="hero-image ms-auto" data-aos="fade-left" data-aos-duration="1000" data-aos-easing="ease-out-back" data-aos-delay="600">
                    <?php echo wp_get_attachment_image($attributes['bg-image']['id'], 'full', '', $img_atts); ?>
                </div>
            <?php endif; ?>
        </div>
    </section>
<?php endif; ?>