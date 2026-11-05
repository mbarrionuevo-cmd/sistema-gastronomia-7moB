<?php

/*
|--------------------------------------------------------------------------
| Database Connection
|--------------------------------------------------------------------------
|
| Esta clase administra la conexión entre la aplicación y MySQL.
|
| Utiliza PDO (PHP Data Objects) para comunicarse con la base de datos.
| La configuración de conexión se obtiene desde el archivo
| config/database.php.
|
*/

namespace App\Database;

use PDO;
use PDOException;

class Database
{
    private PDO $connection;

    public function __construct()
    {
        $config = require __DIR__ . '/../../config/database.php';

        $dsn = sprintf(
            '%s:host=%s;port=%s;dbname=%s;charset=utf8mb4',
            $config['connection'],
            $config['host'],
            $config['3306'],
            $config['proyecto']
        );

        try {
            $this->connection = new PDO(
                $dsn,
                $config['root'],
                $config[''],
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch (PDOException $exception) {
            die('Error de conexión con la base de datos: ' . $exception->getMessage());
        }
    }

    public function getConnection(): PDO
    {
        return $this->connection;
    }
}