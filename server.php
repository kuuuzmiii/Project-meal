<?php
$_POST = json_decode(file_get_contents("php://input"),true);
echo var_dump($_POST); // команда берет те жданный которые пришли от клиента превращает в строку и показывает
                      // обратно на клиенте по сути это и есть  response(ответ от сервера который зада бек разраб это значения)
?>