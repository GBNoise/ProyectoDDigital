<?php 
require_once '../db/db.php';

header('Content-Type: application/json');

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        echo json_encode(getMiembros());
        break;
    case 'POST':
        $body = file_get_contents('php://input');
        $data = json_decode($body);
        echo json_encode(insertMiembro($data->nombre, $data->email, $data->cargo));
        break;
    case 'DELETE':
        $id = $_GET['id'];
        echo json_encode(deleteMiembro($id));
        break;
    default:
        http_response_code(405);
        echo 'Method not allowed';
}

// Read (get all miembros)
function getMiembros() {
    $db = DB::getInstance()->db;
    $stmt = $db->prepare("SELECT * FROM miembro_equipo");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Read (get one miembro)
function getMiembro($id) {
    $db = DB::getInstance()->db;
    $stmt = $db->prepare("SELECT * FROM miembro_equipo WHERE Miembro_equipoID = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// Create (insert new miembro)
function insertMiembro($nombre, $email, $cargo) {
    $db = DB::getInstance()->db;
    $id = uniqid();
    $stmt = $db->prepare("INSERT INTO miembro_equipo (Miembro_equipoID, Nombre, email, Cargo) VALUES (:id, :nombre, :email, :cargo)");
    $stmt->bindParam(":id", $id);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':cargo', $cargo);
    return $stmt->execute();
}

// Update (update existing miembro)
// function updateMiembro($nombre, $email, $cargo) {
//     $db = DB::getInstance()->db;
//     $stmt = $db->prepare("UPDATE miembro_equipo SET Nombre = :nombre, email = :email, Cargo = :cargo WHERE Miembro_equipoID = :id");
//     $stmt->bindParam(':nombre', $nombre);
//     $stmt->bindParam(':email', $email);
//     $stmt->bindParam(':cargo', $cargo);
//     $stmt->bindParam(':id', $id);
//     return $stmt->execute();
// }

// Delete (delete existing miembro)
function deleteMiembro($id) {
    $db = DB::getInstance()->db;
    $stmt = $db->prepare("DELETE FROM miembro_equipo WHERE Miembro_equipoID = :id");
    $stmt->bindParam(':id', $id);
    return $stmt->execute();
}

?>

