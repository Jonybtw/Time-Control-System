<?php
// Inclui o ficheiro php para a conexão com o base de dados
include('db_config.php');

try {
    $db = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recupere o ID do projeto a partir da solicitação POST
    $projectId = $_POST['projectId'];

    // Exclua o projeto da tabela 'projects'
    $query = $db->prepare("DELETE FROM projects WHERE project_id = :projectId");
    $query->bindParam(':projectId', $projectId, PDO::PARAM_INT);
    $query->execute();

    // Forneça uma resposta de sucesso
    echo "Projeto excluído com sucesso.";
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}
?>
