<?php

/**
 * Post rendering content according to caller of get_template_part
 *
 * @package Elixir
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;


$count = isset($args['count']) ? $args['count'] : false;
$class = $count == 1 ? 'col-12 first-video mb-5' : 'col-md-6 col-lg-4 mb-4';
$videoblock = false;
$blocks = parse_blocks($post->post_content);
foreach ($blocks as $block) {
    if ($block['blockName'] == 'lazyblock/elixir-video') {
        $videoblock = $block;
        break;
    }
    if (isset($block['innerBlocks'])) {
        foreach ($block['innerBlocks'] as $block) {
            if ($block['blockName'] == 'lazyblock/elixir-video') {
                $videoblock = $block;
                break;
            }
        }
    }
}

?>
<article <?php post_class($class); ?> id="post-<?php the_ID(); ?>">
    <div class="shadow rounded-top rounded-start overflow-hidden h-100 d-flex flex-column">
        <?php if ($videoblock) :
            $attributes = $videoblock['attrs'];
            $poster_quality = isset($attributes['youtube-poster-quality']) ? $attributes['youtube-poster-quality'] : 'maxres';
            $custom_poster = json_decode(urldecode($attributes['poster-image']), true);
            if ($v = $attributes['youtube-video-url']) :
                preg_match('%(?:youtube(?:-nocookie)?.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu.be/)([^"&?/ ]{11})%i', $v, $match);

        ?>
                <div class="ratio ratio-16x9">
                    <div>
                        <div class="position-relative pointer w-100 h-100" data-src="https://www.youtube.com/watch?v=<?php echo $match[1]; ?>" data-fancybox="" data-width="1600" data-height="900" href="">
                            <span class="elixir-video-icon"><img src="/wp-content/themes/elixir/img/v.svg" data-aos="zoom-in"></span>
                            <?php if (isset($custom_poster['id'])) {
                                echo wp_get_attachment_image($custom_poster['id'], 'medium', '', array(
                                    'class' => 'w-100 h-100 fit-cover'
                                ));
                            } else { ?>
                                <img src="https://img.youtube.com/vi/<?php echo $match[1] . '/' . $poster_quality; ?>default.jpg" class="w-100 h-100 fit-cover">
                        </div>
                    <?php } ?>
                    </div>
                </div>
            <?php else : ?>
                <div class="ratio ratio-16x9">
                    <div>
                        <span class="position-relative">
                            <span class="elixir-video-icon"><img src="/wp-content/themes/elixir/img/v.svg" data-aos="zoom-in" data-aos-once="false" data-aos-mirror="true" class="aos-init aos-animate"></span>
                            <?php if (isset($custom_poster['id'])) {
                                echo wp_get_attachment_image($custom_poster['id'], 'medium', '', array(
                                    'class' => 'img-fluid rounded-top rounded-start fit-cover'
                                ));
                            } else { ?>
                                <div class="bg-lgrey rounded-top rounded-start fit-cover"></div>
                        </span>
                    <?php } ?>
                    </div>
                </div>
            <?php endif; ?>
        <?php else : ?>
            <div class="ratio ratio-16x9">
                <div class="rounded-top rounded-start bg-lgrey">
                </div>
            </div>
        <?php endif; ?>
        <div class="h-100 p-3 p-lg-4 bg-white">
            <?php the_title(
                sprintf('<h2 class="entry-title h4 fw-500"><a href="%s" rel="bookmark" class="text-dark">', esc_url(get_permalink())),
                '</a></h2>'
            ); ?>
        </div>
    </div>
</article>