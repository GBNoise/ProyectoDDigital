<?php

    class DB {
        private static $instance = null;
        public $db = null;
        private function __construct() {
            try {
                $host = 'db';
                $dbname = 'db';
                $user = 'admin';
                $password = 'pwd';
                $db = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
            } catch (PDOException $e) {
                echo "Connection failed: " . $e->getMessage();
            }
        }

        public static function getInstance() {
            if (!self::$instance){
                self::$instance = new self();
            }
            return self::$instance;
        }

    }

?>