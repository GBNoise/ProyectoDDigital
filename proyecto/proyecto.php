<?php 
require_once '../db/db.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $id = $_GET['id'];
        if ($id == NULL)
            echo json_encode(getProyectos());
        else 
            echo json_encode(getProyecto($id));
        break;
    case 'POST':
        $body = file_get_contents('php://input');
        $data = json_decode($body);
        echo json_encode(insertProyecto($data->nombre, $data->inicio, $data->final, $data->estado));
        break;
    case 'DELETE':
        $id = $_GET['id'];
        echo json_encode(deleteProyecto($id));
        break;
    default:
        http_response_code(405);
        echo 'Method not allowed';
}

function getProyectos() {
    $db = DB::getInstance()->db;
    $stmt = $db->prepare("SELECT * FROM proyecto");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getProyecto($id) {
    $db = DB::getInstance()->db;
    $stmt = $db->prepare("SELECT * FROM proyecto WHERE ProyectoID = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function insertProyecto($nombre, $fechaInicio, $fechaFinal, $estado) {
    $db = DB::getInstance()->db;
    $id = uniqid();
    $stmt = $db->prepare("INSERT INTO proyecto VALUES (:ProyectoID, :Nombre, :FechaInicio, :FechaFinal, :Estado)");
    $stmt->bindParam(":ProyectoID", $id);
    $stmt->bindParam(':Nombre', $nombre);
    $stmt->bindParam(':FechaInicio', $fechaInicio);
    $stmt->bindParam(':FechaFinal', $fechaFinal);
    $stmt->bindParam(':Estado', $estado);
    return $stmt->execute();
}

// function updateProjecto($id, $nombre, $fechaInicio, $fechaFinal, $estado) {
//     $db = DB::getInstance()->db;
//     $stmt = $db->prepare("UPDATE proyecto SET Nombre = :nombre, Fecha_inicio = :fechaInicio, Fecha_prev_final = :fechaFinal, Estado = :estado WHERE ProyectoID = :id");
//     $stmt->bindParam(':nombre', $nombre);
//     $stmt->bindParam(':fechaInicio', $fechaInicio);
//     $stmt->bindParam(':fechaFinal', $fechaFinal);
//     $stmt->bindParam(':estado', $estado);
//     $stmt->bindParam(':id', $id);
//     return $stmt->execute();
// }

function deleteMiembro($id) {
    $db = DB::getInstance()->db;
    $stmt = $db->prepare("DELETE FROM proyecto WHERE ProyectoID = :id");
    $stmt->bindParam(':id', $id);
    return $stmt->execute();
}

?>

