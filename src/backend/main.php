// 1. localStorage vietā glabā to JSON failā uz servera un katram pieslēgumam atgriez vienu un to pašu state
// 2. Login sistēma katram lietotājam atgriez personisko state
// 3. 
//
//

<?php
  $dbFile = fopen(".\code\db.json", "r") or die("Cant open that");
  echo fread($dbFile, filesize(".\code\db.json"));

  fclose($dbFile);