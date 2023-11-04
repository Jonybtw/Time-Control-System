<?php
// Inclui o ficheiro php para a conexão com a base de dados
include('db_config.php');

try {
    $db = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recupera a lista de trabalhadores a partir da tabela 'workers'
    $query = $db->query("SELECT worker_id, worker_name FROM workers");
    $workers = $query->fetchAll(PDO::FETCH_ASSOC);

    // Fornece uma resposta em formato JSON
    echo json_encode($workers);
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}
?>
