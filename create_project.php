<?php
// Inclui o ficheiro php para a conexão com a base de dados
include('db_config.php');

try {
    $db = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recupera o nome do projeto a partir da requisição POST
    $projectName = $_POST['projectName'];

    // Verifica se o nome do projeto está vazio
    if (empty($projectName)) {
        echo "O nome do projeto não pode estar vazio.";
    } else {
        // Insere um novo projeto na tabela 'projects'
        $query = $db->prepare("INSERT INTO projects (project_name) VALUES (:projectName)");
        $query->bindParam(':projectName', $projectName, PDO::PARAM_STR);
        $query->execute();

        // Fornece uma resposta de sucesso
        echo "Projeto criado com sucesso.";
    }
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}
?>
