<?php

switch ($attributes['element']) {
    case 'n':
        $atomic_number = 7;
        $element_name = __('Nitrogen', 'elixir');
        break;
    case 'p':
        $atomic_number = 15;
        $element_name = __('Phosphorus', 'elixir');
        break;
    case 'k':
        $atomic_number = 19;
        $element_name = __('Potassium', 'elixir');
        break;
    case 'ca':
        $atomic_number = 20;
        $element_name = __('Calcium', 'elixir');
        break;
    case 'mg':
        $atomic_number = 12;
        $element_name = __('Magnesium', 'elixir');
        break;
    case 's':
        $atomic_number = 16;
        $element_name = __('Sulphur', 'elixir');
        break;
    case 'b':
        $atomic_number = 5;
        $element_name = __('Boron', 'elixir');
        break;
    case 'cu':
        $atomic_number = 29;
        $element_name = __('Copper', 'elixir');
        break;
    case 'mn':
        $atomic_number = 25;
        $element_name = __('Manganese', 'elixir');
        break;
    case 'fe':
        $atomic_number = 26;
        $element_name = __('Iron', 'elixir');
        break;
    case 'cn':
        $atomic_number = 20;
        $element_name = __('Zinc', 'elixir');
        break;
}

?>
<div class="elixir-element">
    <span><?php echo $atomic_number; ?></span>
    <span><?php echo ucfirst($attributes['element']); ?></span>
    <span><?php echo $element_name; ?></span>
</div>