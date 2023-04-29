DROP TABLE IF EXISTS miembro_equipo;

CREATE TABLE
  miembro_equipo (
    Miembro_equipoID varchar(255) NOT NULL,
    Nombre varchar(255) DEFAULT NULL,
    email varchar(255) DEFAULT NULL,
    Cargo varchar(255) DEFAULT NULL,
    PRIMARY KEY (Miembro_equipoID)
  )
DROP TABLE IF EXISTS proyecto;

CREATE TABLE
  proyecto (
    ProyectoID varchar(255) NOT NULL,
    Nombre varchar(255) DEFAULT NULL,
    Fecha_inicio varchar(255) DEFAULT NULL,
    Fecha_prev_final varchar(255) DEFAULT NULL,
    Estado varchar(255) DEFAULT NULL,
    PRIMARY KEY (ProyectoID)
  )
DROP TABLE IF EXISTS tarea;

CREATE TABLE
  tarea (
    TareaID varchar(255) NOT NULL,
    Nombre varchar(255) DEFAULT NULL,
    descripcion varchar(255) DEFAULT NULL,
    Fecha_Inicio varchar(255) DEFAULT NULL,
    Fecha_prev_Final varchar(255) DEFAULT NULL,
    Estado varchar(255) DEFAULT NULL,
    Prioridad varchar(255) DEFAULT NULL,
    ProyectoID varchar(255) NOT NULL,
    Miembro_equipoID varchar(255) DEFAULT NULL,
    PRIMARY KEY (TareaID),
    CONSTRAINT FK_Tarea_Miembro_equipoID FOREIGN KEY (Miembro_equipoID) REFERENCES miembro_equipo (Miembro_equipoID),
    CONSTRAINT FK_Tarea_ProyectoID FOREIGN KEY (ProyectoID) REFERENCES proyecto (ProyectoID)
  );