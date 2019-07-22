<?php
// show error reporting
error_reporting(E_ALL);
 
// set your default time-zone
date_default_timezone_set('Asia/Manila');
 
// variables used for jwt
$key = "iliketurtles";
$iss = "http://example.org"; // this will be https://avp-backend.com
$aud = "http://example.com"; // this will be http://134.209.3.13
$iat = 1356999524;
$nbf = 1357000000;
?>