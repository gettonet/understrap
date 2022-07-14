<?php
if($v = $attributes['youtube-video-url']):
preg_match('%(?:youtube(?:-nocookie)?.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu.be/)([^"&?/ ]{11})%i', $v, $match);
?>
<div class="ratio ratio-16x9">
    <div>
        <span class="position-relative" data-src="https://www.youtube.com/watch?v=<?php echo $match[1]; ?>" data-fancybox="" data-width="1600" data-height="900" role="button">
            <span class="elixir-video-icon"><img src="/wp-content/themes/elixir/img/v.svg" data-aos="zoom-in" data-aos-once="false" data-aos-mirror="true" class="aos-init aos-animate"></span>
            <img src="https://img.youtube.com/vi/<?php echo $match[1]; ?>/maxresdefault.jpg" class="img-fluid rounded-top rounded-start fit-cover"></span>
    </div>
</div>
<?php endif; ?>