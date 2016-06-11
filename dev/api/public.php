<?php

  $cmd = filter_input(INPUT_POST, 'cmd');

  if(!isset($cmd)){
    die('No command supplied.');
  }

  include_once('global.php');
  include_once('sql.php');

  $v = getAll(4);
  echo json_encode($v);

 ?>
