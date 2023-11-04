<?php
// Inclui o ficheiro php para a conexão com a base de dados
include('db_config.php');

try {
    $db = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recupera os registos de tempo a partir da tabela 'time_tracking'
    $query = $db->query("
    SELECT
        workers.worker_id,
        workers.worker_name,
        projects.project_name,
        DATE_FORMAT(time_tracking.start_time, '%d/%m/%Y %H:%i:%s') AS start_date,
        DATE_FORMAT(COALESCE(time_tracking.end_time, NOW()), '%d/%m/%Y %H:%i:%s') AS end_date,
        TIMEDIFF(
            COALESCE(time_tracking.end_time, NOW()),
            time_tracking.start_time
        ) AS total_time
    FROM
        time_tracking
    JOIN workers ON time_tracking.worker_id = workers.worker_id
    JOIN projects ON time_tracking.project_id = projects.project_id
    ORDER BY workers.worker_name;
    ");
    $timeRecords = $query->fetchAll(PDO::FETCH_ASSOC);

    // Fornece uma resposta JSON
    header('Content-Type: application/json');
    echo json_encode($timeRecords);
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}
?>
