<?php
// Inclui o ficheiro php para a conexão com a base de dados
include('db_config.php');

try {
    $db = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recupera o ID do trabalhador e o ID do projeto a partir da requisição POST
    $workerId = $_POST['workerId'];
    $projectId = $_POST['projectId'];

    // Atualiza o registo de controlo de tempo com a hora de término
    $query = $db->prepare("UPDATE time_tracking SET end_time = NOW() WHERE worker_id = :workerId AND project_id = :projectId AND end_time IS NULL");
    $query->bindParam(':workerId', $workerId, PDO::PARAM_INT);
    $query->bindParam(':projectId', $projectId, PDO::PARAM_INT);
    $query->execute();

    // Fornece uma resposta de sucesso
    echo "Temporizador parado.";
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}
?>
