<?php
if($v = $attributes['youtube-video-url']):
preg_match('%(?:youtube(?:-nocookie)?.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu.be/)([^"&?/ ]{11})%i', $v, $match);
?>
<div class="ratio ratio-16x9">
    <div>
        <span class="position-relative" data-src="https://www.youtube.com/watch?v=<?php echo $match[1]; ?>" data-fancybox="" data-width="1600" data-height="900" role="button">
            <span class="elixir-video-icon"><img src="/wp-content/themes/elixir/img/v.svg" data-aos="zoom-in" data-aos-once="false" data-aos-mirror="true" class="aos-init aos-animate"></span>
            <?php if (isset($attributes['poster-image']['id'])){
                echo wp_get_attachment_image($attributes['poster-image']['id'], $attributes['poster-size'], '', array(
                    'class' => 'img-fluid rounded-top rounded-start w-100 h-100 fit-cover'
                ));
                } else { ?>
            <img src="https://img.youtube.com/vi/<?php echo $match[1].'/'.$attributes['youtube-poster-quality']; ?>default.jpg" class="img-fluid rounded-top rounded-start w-100 h-100 fit-cover">
        </span>
            <?php } ?>
    </div>
</div>
<?php else: ?>
    <div class="ratio ratio-16x9">
    <div>
        <span class="position-relative">
            <span class="elixir-video-icon"><img src="/wp-content/themes/elixir/img/v.svg" data-aos="zoom-in" data-aos-once="false" data-aos-mirror="true" class="aos-init aos-animate"></span>
            <?php if (isset($attributes['poster-image']['id'])){
                echo wp_get_attachment_image($attributes['poster-image']['id'], $attributes['poster-size'], '', array(
                    'class' => 'img-fluid rounded-top rounded-start w-100 h-100 fit-cover'
                ));
                } else { ?>
            <div class="bg-lgrey rounded-top rounded-start w-100 h-100 fit-cover"></div>
        </span>
            <?php } ?>
    </div>
</div>

 <?php endif; ?>