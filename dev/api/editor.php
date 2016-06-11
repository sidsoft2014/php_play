<?php
    $type = filter_input(INPUT_POST, 'type');
    $dto = filter_input(INPUT_POST, 'dto');
    $name = filter_input(INPUT_POST, 'editor-name');
    
    if(!isset($type)){
        die('Type not defined');
    }
    
    echo 'Type: ' . $type, '<br/>', 'DTO: ' . $dto, '<br/>', 'Name: ' . $name;
?>