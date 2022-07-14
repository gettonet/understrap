<?php
$unique_id = 'q-and-a-' . generateRandomString(5);
echo $attributes['anchor'] ? '<div id="' . $attributes['anchor'] . '">' : '';
$size = $attributes['icon-size'];


?>

<ul class="elixir-collapse list-group list-group-flush<?php echo $attributes['className'] ? ' ' . $attributes['className'] : ''; ?>" id="<?php echo $unique_id; ?>">
    <?php foreach ($attributes['item'] as $item) : ?>

        <?php $id = slugify($item['heading']);
        $icon = isset($item['custom-icon']['id']) ? wp_get_attachment_image($item['custom-icon']['id'], array($size, $size), '', array('class' => 'elixir-collapse-icon me-3')) : false;
        if (!$icon && isset($item['icon'])) {
            $icon = $item['icon'] ? '<i class="icon-' . $item['icon'] . ' text-' . $item['icon-color'] . ' d-inline-block lh-1 me-3" style="font-size:' . $size . 'px"></i>' : false;
        } ?>
        <li class="list-group-item bg-transparent py-4">
            <a class="px-3 d-flex align-items-center justify-content-between collapsed" data-bs-toggle="collapse" href="#<?php echo $id; ?>" role="button" aria-expanded="false" aria-controls="<?php echo $id; ?>">
                <div class="d-flex align-items-center">
                    <?php echo $icon ?: ''; ?>
                    <h6 class="mb-0 text-<?php echo $attributes['heading-color']; ?>">
                        <?php echo $item['heading']; ?>
                    </h6>
                </div><i class="h6 mb-0 icon-elixir-collapse"></i>
            </a>
            <div class="collapse" id="<?php echo $id; ?>" data-bs-parent="#<?php echo $unique_id; ?>">
                <div class="px-3 pt-3">
                    <div><?php echo $item['content']; ?></div>
                </div>
            </div>
        </li>
    <?php endforeach; ?>
</ul>
<?php echo $attributes['anchor'] ? '</div>' : ''; ?>