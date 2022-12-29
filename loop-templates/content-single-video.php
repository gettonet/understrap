<?php

/**
 * Single video post partial template
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;
?>

<article <?php post_class('mb-5'); ?> id="post-<?php the_ID(); ?>">

    <section id="elixir-hero" class="position-relative alignfull" data-aos="fade" style="min-height: 562px">
    <div class="bg-elixir-gradient w-100 h-90 h-md-80 h-lg-75 position-absolute top-0 left-0 z-0" style="max-height: 552px;"></div>
        <div class="container position-relative">
            <div class="elixir-spacer" style="--minh-xs:40px; --minh-sm:60px; --minh-md:80px; --minh-lg:80px; --minh-xl:80px; --minh-xxl:80px;">
            </div>
            <?php the_title('<h1 class="text-white">', '</h1>'); ?>
            <div class="elixir-spacer" style="--minh-xs:40px; --minh-sm:60px; --minh-md:80px; --minh-lg:80px; --minh-xl:80px; --minh-xxl:80px;">
            </div>
            <div class="entry-content" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-out-back" data-aos-delay="600">

        <?php
        the_content();
        elixir_link_pages();
        ?>

    </div><!-- .entry-content -->
        </div>
    </section>

</article><!-- #post-## -->
