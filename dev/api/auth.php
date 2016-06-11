<?php

$name = filter_input(INPUT_POST, 'name');
$pass = filter_input(INPUT_POST, 'pass');
$type = filter_input(INPUT_POST, 'type');
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);

if(!isset($type)){
  die("Method not defined");
} elseif (!isset($name)){
  die("No username");
} elseif (!isset($pass)) {
  die("No password");
}

include_once('global.php');
include_once('sql.php');

if($type === 'login'){
  processLogin($name, $pass);
} elseif($type === 'logout') {
  processLogout();
} else {
  processRegister($name, $pass, $email);
}

function processRegister($name, $pass, $email){
  $result = createUser($name, $pass, $email);
  if($result){
    $user = login($name, $pass);
    if(!$user){
      die("Unknown error creating user.");
    } else {
      processLogin($name, $pass);
    }
  }
}

function processLogin($name, $pass){
  $result = login($name, $pass);
  if(!$result) {
    die('Login failed.');
  } else {
    session_start();
    $_SESSION['name'] = $result->name;
    $_SESSION['uid'] = $result->id;
    $uri = 'http://' . $_SERVER['HTTP_HOST'] . '/members/profile.html';
    header('Location: ' . $uri);
    setcookie(COOKIE, json_encode($result), 0, '/');
    exit();
  }
}

function processLogout(){
  $_SESSION = array();
  if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
  }
  session_destroy();
}
 ?>
