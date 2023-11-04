<?php
$host = 'localhost:3307';
$database = 'mytimetracker';
$username = 'root';
$password = 'usbw';

try {
    // Cria uma conexão com o banco de dados usando PDO
    $db = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
    $db->exec("set names utf8");
    
    // Define o modo de erro e relatórios para o modo de exceção
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro ao ligar à base de dados: " . $e->getMessage();
}
?>
