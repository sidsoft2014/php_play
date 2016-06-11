<?php
class artistDTO {
  public $id;
  public $name;
  public $description = '';
  public $image = '';

  public function __construct($row){
    $this->id = $row['Guid'];
    $this->name = $row['Moniker'];

    $d = $row['Description'];
    if($d != null && $d != ''){
      $this->description = $d;
    }
    
    $i = $row['Image'];
    if($i != null && $i != ''){
      $this->image = $i;
    }
  }
}

class genreDTO {
  public $id;
  public $name;

  public function __construct($row){
    $this->id = $row['Id'];
    $this->name = $row['Name'];
  }
}

class labelDTO {
  public $id;
  public $name;
  public $description = '';
  public $genres = array();


  public function __construct($row){
    $this->id = $row['Guid'];
    $this->name = $row['Name'];

    $d = $row['Description'];
    if($d != null && $d != ''){
      $this->description = $d;
    }
    $g = $row['Genres'];
    if($g != null && $g != ''){
      $this->genres = explode('|', $g);
    }
  }
}

class releaseDTO {
  public $id;
  public $name;
  public $artist = '';
  public $genre;
  public $description = '';
  public $label = '';
  public $cat = '';

  public function __construct($row){
    $this->id = $row['Guid'];
    $this->name = $row['Name'];
    $this->genre = $row['Genre'];

    $a = $row['Artist'];
    if($a != null && $a != ''){
      $this->artist = $a;
    }
    $c = $row['Cat'];
    if($c != null && $c != ''){
      $this->cat = $c;
    }
    $d = $row['Description'];
    if($d != null && $d != ''){
      $this->description = $d;
    }
    $l = $row['Label'];
    if($l != null && $l != ''){
      $this->label = $l;
    }
  }
}

class trackDTO {
  public $id;
  public $name;
  public $genre;
  public $duration;
  public $description = '';
  public $artists = array();
  public $labels = array();

  public function __construct($row) {
    $this->id = $row['Guid'];
    $this->name = $row['Name'];
    $this->genre = $row['Genre'];
    $this->duration = $row['Duration'];

    $d = $row['Description'];
    if($d != null && $d != ''){
      $this->description = $d;
    }

    $a = $row['Artists'];
    $l = $row['Labels'];
    if($a != NULL && $a != ''){
      $this->artists = explode('|', $a);
    }
    if($l != null && $l != ''){
      $this->labels = explode('|', $l);
    }
  }
}

class userDTO {
  public $id;
  public $guid;
  public $name;
  public $email;

  public function __construct($row){
    $this->id = $row['Id'];
    $this->guid = $row['Guid'];
    $this->name = $row['UserName'];
    $this->email = $row["Email"];
  }
}

class authDTO {
  public $id;
  public $pass;

  public function __construct($row){
    $this->id = $row['Id'];
    $this->pass = $row['Pass'];
  }
}
?>
