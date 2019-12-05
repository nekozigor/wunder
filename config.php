<?php

return [
    'db' => [
        'dsn' => 'mysql:host=localhost;dbname=test',
        'username' => 'root',
        'password' => '',
        'options' => [
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
        ],
    ]
];
