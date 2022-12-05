<?php 
$i = 1;
$n = count($attributes['items']);
$icon = $attributes['invert-direction'] ? 'icon-up-open' : 'icon-down-open';
foreach($attributes['items'] as $item): ?>
<div class="row no-gutters">
    <?php 
    $title = '<h4>'.$item['title'].'</h4>';
    $content = apply_filters('the_content', $item['content']);
    if($i<$n){
        $col1 = !is_even($i) ? false : '<div class="mb-5">'.$title.$content.'</div>';
        $col2 = is_even($i) ? false : '<div class="mb-5">'.$title.$content.'</div>';
        $col_mid_class = 'elixir-process-number d-inline-block rounded-circle p-2';
        $col_mid_class .= $i === 1 ? ' first' : '';
        $col_mid = '<div class="'.$col_mid_class.'"><span class="rounded-circle d-flex justify-content-center align-items-center bg-'.$attributes['color-palette'].' text-white fw-700">';
        if(!$attributes['hide-numbers']) {
            $col_mid .= $attributes['invert-direction'] ? $n - $i : $i;
        }
        $col_mid .= '</span></div>';
        echo $col1 ? '<div class="col text-sm-end order-last order-sm-first">'.$col1.'</div>' : '<div class="d-none d-sm-block col-sm"></div>';
        echo '<div class="col-auto elixir-process position-relative text-center">'.$col_mid.'</div>';
        echo $col2 ? '<div class="col">'.$col2.'</div>' : '<div class="d-none d-sm-block col-sm"></div>';
    } else {
        $col_mid = '<div class="elixir-process-number d-inline-block rounded-circle p-2 last"><span class="rounded-circle d-flex justify-content-center align-items-center bg-'.$attributes['color-palette'].' text-white fw-700"><i class="'.$icon.'"></span></i></div>';
        echo '<div class="col-12 elixir-process position-relative text-sm-center last">'.$col_mid.'</div>';
        echo '<div class="col-md-10 col-lg-6 offset-md-1 offset-lg-3 py-4 text-sm-center">'.$title.$content.'</div>';
    }?>
</div>
<?php
$i++;
endforeach;
?>