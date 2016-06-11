<?php

include_once('dal.php');
include_once('global.php');

define('USER', 'dev');
define('PASS', 'open');
define('HOST', 'localhost');
define('DB', 'musicmate');

function getTableAndDTO($tableId, &$table, &$dtoType){
  $tables = array(
    'artists' => 'artistDTO',
    'labels' => 'labelDTO',
    'releases' => 'releaseDTO',
    'tracks' => 'trackDTO',
    'genres' => 'genreDTO'
  );
  try {
    $dtoType = array_values($tables)[$tableId];
    if($dtoType === null){
      die('Table not found: ' . $tableId);
    }else{
      $table = array_keys($tables)[$tableId];
    }
  } catch(Exception $e) {
    die('Exception: '. $e->getMessage());
  }
}

function hashPass($pass){
  $salt = mcrypt_create_iv(22, MCRYPT_DEV_URANDOM);
  $options = [
    'cost' => 8,
    'salt' => $salt,
  ];
  return password_hash($pass, PASSWORD_BCRYPT, $options);
}

function getGUID(){
    if (function_exists('com_create_guid')){
        return com_create_guid();
    }
    else {
        mt_srand((double)microtime()*10000);
        $charid = strtoupper(md5(uniqid(rand(), true)));
        $hyphen = chr(45);
        $uuid = substr($charid, 0, 8).$hyphen
            .substr($charid, 8, 4).$hyphen
            .substr($charid,12, 4).$hyphen
            .substr($charid,16, 4).$hyphen
            .substr($charid,20,12);
        return $uuid;
    }
}

function readSQL($sql, $dtoType){
  $result = false;
  $conn = mysqli_connect(HOST, USER, PASS, DB);

  if (!$conn) {
      echo "Connection failed: " . mysqli_connect_error();
  } else {
    $response = mysqli_query($conn, $sql);
    if(!$response){
      die("Error: " . mysqli_error($conn));
    }
    else if (mysqli_num_rows($response) > 0) {
      if(mysqli_num_rows($response) === 1){
        $row = mysqli_fetch_assoc($response);
        $dto = new $dtoType($row);
        $result = $dto;
      } else {
        $result = array();
        while($row = mysqli_fetch_assoc($response)) {
          $dto = new $dtoType($row);
          array_push($result, $dto);
        }
      }
    }
  }

  mysqli_close($conn);
  return $result;
}

function createSQL($sql) {
  $conn = mysqli_connect(HOST, USER, PASS, DB);
  $result = false;

  if (!$conn) {
      echo "Connection failed: " . mysqli_connect_error();
  } else {
    if (mysqli_query($conn, $sql)) {
      $result = true;
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
  }

  mysqli_close($conn);
  return $result;
}

function getAll($tableId) {
  $table = null;
  $dto = null;

  getTableAndDTO($tableId, $table, $dto);
  $sql = 'SELECT * FROM '.$table.' WHERE Deleted = 0';

  $result = readSQL($sql);
  return $result;
}

function getByGuid($tableId, $guid){
  $table = null;
  $dto = null;

  getTableAndDTO($tableId, $table, $dto);
  $sql = 'SELECT * FROM '.$table.' WHERE Deleted = 0 AND Guid = ' . $guid;

  $result = readSQL($tableId, $sql);
  return $result;
}

function createUser($name, $pass, $email) {
  $result = false;
  $userCheck = 'SELECT * FROM users WHERE UserName = "'.$name.'" OR Email = "'.$email.'"';
  $user = readSQL($userCheck, 'userDTO');

  if(!$user) {
    $hash = hashPass($pass);
    $guid = getGUID();
    $sql = 'INSERT INTO users (Guid, UserName, Pass, Email) VALUES ("'.$guid.'", "'.$name.'", "'.$hash.'", "'.$email.'")';
    $result = createSQL($sql);
  }
  elseif(isset($user)) {
    if($user->name === $name) {
      echo "Username is already taken";
    } else {
      echo "Email is already in use.";
    }
  } else {
    echo "Unkown error creating user.";
  }

  return $result;
}

function login($name, $pass) {
  $sql = 'SELECT * FROM users WHERE UserName = "'.$name.'"';
  $user = readSQL($sql, 'authDTO');
  if(!$user){
    return false;
  } else {
    $hash = $user->pass;
    if (password_verify($pass, $hash)){
      return readSQL($sql, 'userDTO');
    }
  }
}

?>
