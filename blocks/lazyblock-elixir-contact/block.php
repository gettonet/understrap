<div class="d-flex">
    <div class="flex-shrink-0">
        <i class="icon-<?php echo $attributes['type']; ?>"></i>
    </div>
    <div class="flex-grow-1 ms-3">
        <?php echo apply_filters('the_content', $attributes['content']); ?>
    </div>
</div>