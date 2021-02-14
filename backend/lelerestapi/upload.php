<?php
include(dirname(__FILE__).'/../../config/config.inc.php');
try {
  // File Route.
  $fileRoute = _PS_IMG_DIR_;

  // Get filename.
  $filename = explode(".", $_FILES["image"]["name"]);

  // Get temp file name.
  $tmpName = $_FILES["image"]["tmp_name"];
 

  // Get extension. You must include fileinfo PHP extension.
  $extension = end($filename);

  // Generate new random name.
  $name = sha1(microtime()) . "." . $extension;
  $fullNamePath = $fileRoute . $name;

  // Save file in the uploads folder.
  move_uploaded_file($tmpName, $fullNamePath);

  // Generate response.
  $response = new \StdClass;
  $response->success = 1;
  $response->file = new \StdClass;
  $response->file->url =  'https://'.$_SERVER['HTTP_HOST'].'/img/' . $name;

  // Send response.
  echo stripslashes(json_encode($response));

} catch (Exception $e) {
   // Send error response.
   echo $e->getMessage();
   http_response_code(404);
}
?>