<?php
// Inclui o ficheiro php para a conexão com a base de dados
include('db_config.php');

try {
    $db = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recupera a lista de projetos a partir da tabela 'projects'
    $query = $db->query("SELECT project_id, project_name FROM projects");
    $projects = $query->fetchAll(PDO::FETCH_ASSOC);

    // Fornece uma resposta em formato JSON
    echo json_encode($projects);
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}
?>
