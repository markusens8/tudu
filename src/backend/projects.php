<?php
// 1. localStorage vietā glabā to JSON failā uz servera un katram pieslēgumam atgriez vienu un to pašu state
// 2. Login sistēma katram lietotājam atgriez personisko state
// 3. 
header('Content-Type: application/json');
readfile("db.json");
