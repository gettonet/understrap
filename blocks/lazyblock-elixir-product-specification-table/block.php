<?php
$w_classes = array('table-responsive');
$w_classes[] = $attributes['className'] ?: '';
$w_classes = array_filter($w_classes);
?>
<?php echo $w_classes ? '<div class="' . implode(' ', $w_classes) . '">' : '<div>'; ?>
<table class="table table-hover">
    <?php if ($attributes['col1-header'] || $attributes['col2-header']) : ?>
        <?php if ($attributes['header-color']) {
            $colors = elixir_generate_color_palette();
            $color_class = false;
            if (is_array($colors)) {
                foreach (array_column($colors, 'color') as $k => $v) {
                    if ($v === $attributes['header-color']) {
                        $header_classes[] = 'bg-' . $colors[$k]['slug'];
                        $color_class = true;
                        continue;
                    }
                }
            }
            if (!$color_class) {
                $header_styles[] = 'background-color:' . $attributes['header-color'];
            }
        }
        if ($attributes['header-text-color']) {
            $colors = elixir_generate_color_palette();
            $color_class = false;
            if (is_array($colors)) {
                foreach (array_column($colors, 'color') as $k => $v) {
                    if ($v === $attributes['header-text-color']) {
                        $classes[] = 'text-' . $colors[$k]['slug'];
                        $color_class = true;
                        continue;
                    }
                }
            }
            if (!$color_class) {
                $header_styles[] = 'color:' . $attributes['header-text-color'];
            }
        }
        $header_classes = array_filter($header_classes);
        $header_styles = array_filter($header_styles);
        $header_class = $header_classes ? ' class="'.implode(' ', $header_classes).'"' : '';
        $header_style = $header_styles ? ' style="'.implode(';', $header_styles).'"' : '';
        ?>
        <thead>
            <tr<?php echo $header_class.$header_style; ?>>
                <th scope="col"><?php echo $attributes['col1-header']; ?></th>
                <th scope="col"><?php echo $attributes['col2-header']; ?></th>
            </tr>
        </thead>
    <?php endif; ?>
    <tbody>
        <?php
        foreach ($attributes['specification'] as $specification) :
            switch ($specification['row-color']) {
                case 'primary':
                case 'secondary':
                    $class = 'bg-' . $specification['row-color'] . ' text-white';
                    break;
                case 'gray':
                    $class = 'bg-light';
                    break;
                case 'colored':
                    $class = 'bg-primary text-white';
                    break;
                default:
                    $class = 'bg-' . $specification['row-color'];
            } ?>
            <tr class="<?php echo $class; ?>">
                <td><?php echo isset($specification['specification-title']) ? $specification['specification-title'] : ''; ?></td>
                <td><?php echo isset($specification['value']) ? $specification['value'] : ''; ?></td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
</div>