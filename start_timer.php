<?php
// Inclui o ficheiro php para a conexão com a base de dados
include('db_config.php');

try {
    $db = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recupera o ID do trabalhador e o ID do projeto a partir da requisição POST
    $workerId = $_POST['workerId'];
    $projectId = $_POST['projectId'];

    // Insere um novo registro de controlo de tempo com a hora de início
    $query = $db->prepare("INSERT INTO time_tracking (worker_id, project_id, start_time) VALUES (:workerId, :projectId, NOW())");
    $query->bindParam(':workerId', $workerId, PDO::PARAM_INT);
    $query->bindParam(':projectId', $projectId, PDO::PARAM_INT);
    $query->execute();

    // Fornece uma resposta de sucesso
    echo "Temporizador iniciado.";
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}
?>
