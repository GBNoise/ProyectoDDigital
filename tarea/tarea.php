<?php 
require_once '../db/db.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $id = $_GET['id'];
        if ($id == NULL)
            echo getTareas();
        else 
            echo json_encode(getTarea($id));
        break;
    case 'POST':
        $body = file_get_contents('php://input');
        $data = json_decode($body);
        echo json_encode(insertTarea($data->nombre, $data->descripcion, $data->inicio, $data->final, $data->estado, $data->prioridad, $data->proyecto, $data->miembroEquipo));
        break;
    case 'DELETE':
        $id = $_GET['id'];
        deleteTarea($id);
        echo http_response_code(200);
        break;
    case 'PUT':
        $id = $_GET['id'];
        $estado = $_GET['estado'];
        updateTarea($id, $estado);
        echo http_response_code(200);
    default:
        http_response_code(405);
        echo 'Method not allowed';
}

function getTareas() {
    $db = DB::getInstance()->db;
    $stmt = $db->prepare("SELECT * FROM tarea");
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $tareas = [];

    foreach ($results as $row) {
        $proyectoID = $row['proyectoid'];

        if (!isset($tareas[$proyectoID])) {
            $tareas[$proyectoID] = [];
        }

        $tareas[$proyectoID][] = [
            'TareaID' => $row['tareaid'],
            'Nombre' => $row['nombre'],
            'descripcion' => $row['descripcion'],
            'fecha_inicio' => $row['fecha_inicio'],
            'fecha_prev_final' => $row['fecha_prev_final'],
            'estado' => $row['estado'],
            'prioridad' => $row['prioridad'],
            'proyectoid' => $row['proyectoid'],
            'miembro_equipoid' => $row['miembro_equipoid']
        ];
    }
    return stripslashes(json_encode($tareas));
}

function getTarea($id) {
    $db = DB::getInstance()->db;
    $stmt = $db->prepare("SELECT * FROM proyecto WHERE TareaID = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);

}

function insertTarea($nombre, $descripcion, $fechaInicio, $fechaFinal, $estado, $prioridad = "", $proyectoID, $miembroEquipo) {
    $db = DB::getInstance()->db;
    $id = uniqid();
    $stmt = $db->prepare("INSERT INTO tarea VALUES (:TareaID, :Nombre, :descripcion, :FechaInicio, :FechaFinal, :Estado, :Prioridad, :ProyectoID, :MiembroEquipoID)");
  
    echo "$id, $nombre, $descripcion, $fechaInicio, $fechaFinal, $estado, $prioridad, $proyectoID, $miembroEquipo";
    $stmt->bindParam(":TareaID", $id);
    $stmt->bindParam(':Nombre', $nombre);
    $stmt->bindParam(':descripcion', $descripcion);
    $stmt->bindParam(':FechaInicio', $fechaInicio);
    $stmt->bindParam(':FechaFinal', $fechaFinal);
    $stmt->bindParam(':Estado', $estado);
    $stmt->bindParam(':Prioridad', $prioridad);
    $stmt->bindParam(':ProyectoID', $proyectoID);
    $stmt->bindParam(':MiembroEquipoID', $miembroEquipo);

    return $stmt->execute();
}

function updateTarea($id, $estado) {
    $db = DB::getInstance()->db;
    $stmt = $db->prepare("UPDATE tarea SET Estado = :Estado WHERE TareaID = :id");
    $stmt->bindParam(":TareaID", $id);
    $stmt->bindParam(':Estado', $estado);
    return $stmt->execute();
}

function deleteTarea($id) {
    $db = DB::getInstance()->db;
    $stmt = $db->prepare("DELETE FROM tarea WHERE TareaID = :id");
    $stmt->bindParam(':id', $id);
    return $stmt->execute();
}

?>

