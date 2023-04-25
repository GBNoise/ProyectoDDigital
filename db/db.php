<?php

    class DB {
        private static $instance = null;
        public $db = null;
        private function __construct() {
            try {
                $host = 'dpg-cgj5svndvk4lfi6qnqo0-a.ohio-postgres.render.com';
                $dbname = 'testdb_08p5';
                $user = 'admin';
                $password = 'DUGc1r24FoypGCaDsz6ujaR2WPnbauGU';
                $this->db = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
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