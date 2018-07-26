<?php

if(!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['phone'])){
  
  $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
  $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
  $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
  
  if( empty($name) || empty($email) || empty($phone) ) {
    return false;   
  }
  
  $date = date('Y-m-d H:i:s');
  $db = new PDO('mysql:host=localhost;dbname=landing_pages_users;charset=utf8', 'root', ''); 
  $contact = $db->prepare("INSERT INTO lp_forms VALUES('', ?, ?, ?, ?)");
  $result = $contact->execute(array($name, $email, $phone, $date));
  
  if($result) {
    
    echo true;
    
  } else {
    
    echo false;
    
  }
  
}