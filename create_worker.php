<?php
// Inclui o ficheiro php para a conexão com a base de dados
include('db_config.php');

try {
    $db = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recupera o nome do trabalhador da requisição POST
    $workerName = $_POST['workerName'];

    // Verifica se o nome do trabalhador está vazio
    if (empty($workerName)) {
        echo "O nome do trabalhador não pode estar vazio.";
    } else {
        // Insere um novo trabalhador na tabela 'workers'
        $query = $db->prepare("INSERT INTO workers (worker_name) VALUES (:workerName)");
        $query->bindParam(':workerName', $workerName, PDO::PARAM_STR);
        $query->execute();

        // Fornece uma resposta de sucesso
        echo "Trabalhador criado com sucesso.";
    }
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}
?>
