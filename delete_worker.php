<?php
// Inclui o ficheiro php para a conexão com a base de dados
include('db_config.php');

try {
    $db = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recupera o ID do trabalhador a partir da solicitação POST
    $workerId = $_POST['workerId'];

    // Exclui os registos de tempo associados da tabela 'time_tracking'
    $query = $db->prepare("DELETE FROM time_tracking WHERE worker_id = :workerId");
    $query->bindParam(':workerId', $workerId, PDO::PARAM_INT);
    $query->execute();

    // Exclui o trabalhador da tabela 'workers'
    $query = $db->prepare("DELETE FROM workers WHERE worker_id = :workerId");
    $query->bindParam(':workerId', $workerId, PDO::PARAM_INT);
    $query->execute();

    // Fornece uma resposta de sucesso
    echo "Trabalhador eliminado com sucesso.";
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}
?>
