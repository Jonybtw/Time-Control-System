// Função para preencher a caixa de seleção de trabalhador
function populateWorkerSelectBox() {
  var workerSelect = document.getElementById("workerSelect");

  // Envia um pedido GET para get_workers.php para buscar a lista de trabalhadores
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "get_workers.php", true);
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var workers = JSON.parse(xhr.responseText);

          // Limpa as opções atuais
          workerSelect.innerHTML = "";

          // Adiciona novas opções com base nos dados obtidos
          workers.forEach(function (worker) {
              var option = document.createElement("option");
              option.value = worker.worker_id;
              option.text = worker.worker_name;
              workerSelect.appendChild(option);
          });
      }
  };
  xhr.send();
}

// Função para preencher a caixa de seleção de projeto
function populateProjectSelectBox() {
  var projectSelect = document.getElementById("projectSelect");

  // Envia um pedido GET para get_projects.php para buscar a lista de projetos
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "get_projects.php", true);
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var projects = JSON.parse(xhr.responseText);

          // Limpa as opções atuais
          projectSelect.innerHTML = "";

          // Adiciona novas opções com base nos dados obtidos
          projects.forEach(function (project) {
              var option = document.createElement("option");
              option.value = project.project_id;
              option.text = project.project_name;
              projectSelect.appendChild(option);
          });
      }
  };
  xhr.send();
}

// Função para criar um novo trabalhador
function createWorker() {
  var workerName = document.getElementById("workerName").value;

  if (workerName === "") {
      alert("O nome do trabalhador não pode estar vazio.");
      return;
  }

  // Envia um pedido POST para create_worker.php para inserir o trabalhador
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "create_worker.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          alert(xhr.responseText);
      }
  };
  xhr.send("workerName=" + workerName);
}

// Função para criar um novo projeto
function createProject() {
  var projectName = document.getElementById("projectName").value;

  if (projectName === "") {
      alert("O nome do projeto não pode estar vazio.");
      return;
  }

  // Envia um pedido POST para create_project.php para inserir o projeto
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "create_project.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          alert(xhr.responseText);
      }
  };
  xhr.send("projectName=" + projectName);
}

// Declara a variável timerInterval fora das funções
var timerInterval;

function startTimer() {
    var workerId = document.getElementById("workerSelect").value;
    var projectId = document.getElementById("projectSelect").value;

    // Envia um pedido POST para start_timer.php para começar a acompanhar o tempo
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "start_timer.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText);
        }
    };
    xhr.send("workerId=" + workerId + "&projectId=" + projectId);

    // Atualiza o tempo em tempo real
    var timerElement = document.getElementById("timer");
    var seconds = 0;
    var minutes = 0;
    var hours = 0;

    // Atribui o intervalo à variável global
    timerInterval = setInterval(function () {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }

        var timeString = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
        timerElement.textContent = timeString;
    }, 1000);

    // Função para formatar o tempo
    function formatTime(time) {
        return time < 10 ? "0" + time : time;
    }
}

function stopTimer() {
    var workerId = document.getElementById("workerSelect").value;
    var projectId = document.getElementById("projectSelect").value;

    // Envia um pedido POST para stop_timer.php para parar o acompanhamento do tempo
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "stop_timer.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText);
        }
    };
    xhr.send("workerId=" + workerId + "&projectId=" + projectId);

    // Para o temporizador e limpa o intervalo (usando a variável global)
    clearInterval(timerInterval);
}



// Função para buscar e preencher os registos de tempo
function fetchTimeRecords() {
    var timeRecordsTable = document.getElementById("timeRecords");
    timeRecordsTable.innerHTML = ""; // Limpa o conteúdo da tabela

    // Envia um pedido GET para fetch_time_records.php para recuperar os registos de tempo
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "fetch_time_records.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var timeRecords = JSON.parse(xhr.responseText);

            timeRecords.forEach(function (record) {
                var row = timeRecordsTable.insertRow();
                var workerIdCell = row.insertCell(0);
                var workerNameCell = row.insertCell(1);
                var projectNameCell = row.insertCell(2); // Nova coluna para o nome do projeto
                var startDateCell = row.insertCell(3);
                var endDateCell = row.insertCell(4);
                var totalDurationCell = row.insertCell(5); // Ajustar o índice da coluna

                workerIdCell.innerHTML = record.worker_id;
                workerNameCell.innerHTML = record.worker_name;
                projectNameCell.innerHTML = record.project_name; // Exibir o nome do projeto
                startDateCell.innerHTML = record.start_date;
                endDateCell.innerHTML = record.end_date;
                totalDurationCell.innerHTML = record.total_time;
            });
        }
    };
    xhr.send();
}

// JavaScript code for creating worker list
function createWorkerList() {
    var workerList = document.getElementById("workerList");

    // Clear the existing list
    workerList.innerHTML = "";

    // Send a GET request to fetch_workers.php to retrieve the list of workers
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "get_workers.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var workers = JSON.parse(xhr.responseText);

            // For each worker, create a list item with a worker name and a "Eliminar" button
            workers.forEach(function (worker) {
                var listItem = document.createElement("li");

                var workerName = document.createElement("span");
                workerName.innerHTML = worker.worker_name;

                var deleteButton = document.createElement("button");
                deleteButton.innerText = "Eliminar";
                deleteButton.className = "delete-button"; // Add a class name for styling
                deleteButton.addEventListener("click", function () {
                    deleteWorker(worker.worker_id);
                });

                listItem.appendChild(workerName);
                listItem.appendChild(deleteButton);
                workerList.appendChild(listItem);
            });
        }
    };
    xhr.send();
}


function deleteProject(projectId) {
    // Send a POST request to delete_project.php with the project ID
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "delete_project.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText);
            // Refresh the project list after deleting
            createProjectList();
        }
    };
    xhr.send("projectId=" + projectId);
}

function createProjectList() {
    var projectList = document.getElementById("projectList");

    // Clear the existing list
    projectList.innerHTML = "";

    // Send a GET request to fetch_projects.php to retrieve the list of projects
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "get_projects.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var projects = JSON.parse(xhr.responseText);

            // For each project, create a list item with a delete button
            projects.forEach(function (project) {
                var listItem = document.createElement("li");
                listItem.innerHTML = project.project_name;

                var deleteButton = document.createElement("button");
                deleteButton.innerText = "Eliminar";
                deleteButton.className = "delete-button"; // Add a class name for styling
                deleteButton.addEventListener("click", function () {
                    deleteProject(project.project_id);
                });

                listItem.appendChild(deleteButton);
                projectList.appendChild(listItem);
            });
        }
    };
    xhr.send();
}

// JavaScript code for deleting a worker
function deleteWorker(workerId) {
    // Send a request to delete_worker.php with the worker's ID
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "delete_worker.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.responseText);
            // Refresh the worker list after deletion
            createWorkerList();
            // Refresh the time records table
            fetchTimeRecords();
        }
    };
    xhr.send("workerId=" + workerId);
}


// Chama a função fetchTimeRecords para preencher a tabela quando a página é carregada
window.onload = function () {
  populateWorkerSelectBox();
  populateProjectSelectBox();
  createWorkerList();
  createProjectList()
  fetchTimeRecords();
};


