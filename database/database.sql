
-- Creacion tabla informacion del usuario
use app_turnos

CREATE TABLE informacion_user(
    id INT(255) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre_apellido VARCHAR(25) NOT NULL,
    numero_documento VARCHAR(15) NOT NULL,
    correo VARCHAR(25) NOT NULL,
    telefono VARCHAR(25) NOT NULL,
    contraseña VARCHAR(100) NOT NULL
);


ALTER TABLE informacion_user
ADD confirmarContraseña VARCHAR(100) NOT NULL AFTER contraseña;

DESCRIBE informacion_user;


-- Creación de la tabla profesional_medico
CREATE TABLE profesional_medico (
    id_medico INT PRIMARY KEY,
    nombre VARCHAR(50),
    especialidad VARCHAR(50),
    horario_trabajo VARCHAR(100),
    informacion_contacto VARCHAR(100)
);
DESCRIBE profesional_medico;


-- Creación de la tabla cita
CREATE TABLE cita (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    hora_cita DATETIME,
    fecha_cita DATETIME,
    tipo_cita VARCHAR(255),
    ubicacion_cita VARCHAR(255),
    id INT,
    id_medico INT,
    FOREIGN KEY (id) REFERENCES informacion_user(id),
    FOREIGN KEY (id_medico) REFERENCES profesional_medico(id_medico)
);



ALTER TABLE cita
MODIFY COLUMN hora_cita TIME;

-- Modificar el campo fecha_cita a DATE
ALTER TABLE cita
MODIFY COLUMN fecha_cita DATE;


DESCRIBE cita;
-- Modificar el campo hora_cita a TIME

-- Primero, agregamos el nuevo campo 'correo_medico'
ALTER TABLE profesional_medico
ADD correo_medico VARCHAR(100);

-- Luego, renombramos 'informacion_contacto' a 'cel_medico'
ALTER TABLE profesional_medico
CHANGE informacion_contacto cel_medico VARCHAR(100);



-- Insertando ejemplos de médicos en la tabla 'profesional_medico'

-- Medicina General
INSERT INTO profesional_medico (id_medico, nombre, especialidad, horario_trabajo, cel_medico, correo_medico)
VALUES
    (1, 'Dr. Juan Pérez', 'Medicina General', 'Lunes a Viernes 8AM-4PM', '123-456-7890', 'juanperez@example.com'),
    (2, 'Dra. Ana García', 'Medicina General', 'Lunes a Viernes 9AM-5PM', '987-654-3210', 'anagarcia@example.com');

-- Pediatría
INSERT INTO profesional_medico (id_medico, nombre, especialidad, horario_trabajo, cel_medico, correo_medico)
VALUES
    (3, 'Dr. Roberto Sánchez', 'Pediatría', 'Lunes a Viernes 9AM-3PM', '111-222-3333', 'robertosanchez@example.com'),
    (4, 'Dra. Laura Martínez', 'Pediatría', 'Lunes a Viernes 10AM-4PM', '444-555-6666', 'lauramartinez@example.com');

-- Cardiología
INSERT INTO profesional_medico (id_medico, nombre, especialidad, horario_trabajo, cel_medico, correo_medico)
VALUES
    (5, 'Dr. Carlos Rodríguez', 'Cardiología', 'Lunes a Viernes 8AM-5PM', '777-888-9999', 'carlosrodriguez@example.com'),
    (6, 'Dra. María López', 'Cardiología', 'Lunes a Viernes 10AM-6PM', '123-987-6543', 'marialopez@example.com');

-- Dermatología
INSERT INTO profesional_medico (id_medico, nombre, especialidad, horario_trabajo, cel_medico, correo_medico)
VALUES
    (7, 'Dr. Pedro Gómez', 'Dermatología', 'Lunes a Viernes 9AM-4PM', '555-444-3333', 'pedrogomez@example.com'),
    (8, 'Dra. Sofía Hernández', 'Dermatología', 'Lunes a Viernes 11AM-6PM', '222-333-4444', 'sofiahernandez@example.com');

-- Ginecología
INSERT INTO profesional_medico (id_medico, nombre, especialidad, horario_trabajo, cel_medico, correo_medico)
VALUES
    (9, 'Dr. Manuel Pérez', 'Ginecología', 'Lunes a Viernes 10AM-5PM', '999-888-7777', 'manuelperez@example.com'),
    (10, 'Dra. Carolina Ruiz', 'Ginecología', 'Lunes a Viernes 11AM-6PM', '666-777-8888', 'carolinaruiz@example.com');

-- Oftalmología
INSERT INTO profesional_medico (id_medico, nombre, especialidad, horario_trabajo, cel_medico, correo_medico)
VALUES
    (11, 'Dr. Alejandro Díaz', 'Oftalmología', 'Lunes a Viernes 8AM-4PM', '333-222-1111', 'alejandrodiaz@example.com'),
    (12, 'Dra. Valeria Torres', 'Oftalmología', 'Lunes a Viernes 9AM-5PM', '777-666-5555', 'valeriatorres@example.com');


ALTER TABLE profesional_medico
ADD descripcion_medico VARCHAR(255);





-- Ejemplos para 12 médicos con sus descripciones (cambiar según sea necesario)
UPDATE profesional_medico
SET descripcion_medico = 'El Dr. Juan Pérez tiene más de 10 años de experiencia en Medicina General y está comprometido a proporcionar atención médica integral a sus pacientes.'
WHERE id_medico = 1;

UPDATE profesional_medico
SET descripcion_medico = 'La Dra. Ana García se especializa en medicina preventiva y tiene una sólida formación en atención primaria para personas de todas las edades.'
WHERE id_medico = 2;

UPDATE profesional_medico
SET descripcion_medico = 'El Dr. Roberto Sánchez es un pediatra dedicado y amigable, con habilidades excepcionales para tratar a niños y adolescentes.'
WHERE id_medico = 3;

UPDATE profesional_medico
SET descripcion_medico = 'La Dra. Laura Martínez es una pediatra con una pasión por proporcionar cuidado compasivo a los niños y sus familias.'
WHERE id_medico = 4;

UPDATE profesional_medico
SET descripcion_medico = 'El Dr. Carlos Rodríguez es un cardiólogo altamente calificado con enfoque en la prevención y tratamiento de enfermedades cardíacas.'
WHERE id_medico = 5;

UPDATE profesional_medico
SET descripcion_medico = 'La Dra. María López es una cardióloga comprometida con el cuidado del corazón y el bienestar general de sus pacientes.'
WHERE id_medico = 6;

UPDATE profesional_medico
SET descripcion_medico = 'El Dr. Pedro Gómez es un dermatólogo experimentado que se enfoca en ofrecer tratamientos efectivos para problemas de la piel.'
WHERE id_medico = 7;

UPDATE profesional_medico
SET descripcion_medico = 'La Dra. Sofía Hernández es una dermatóloga apasionada por ayudar a sus pacientes a lograr una piel saludable y radiante.'
WHERE id_medico = 8;

UPDATE profesional_medico
SET descripcion_medico = 'El Dr. Manuel Pérez es un ginecólogo comprometido con la salud de las mujeres y ofrece atención médica integral.'
WHERE id_medico = 9;

UPDATE profesional_medico
SET descripcion_medico = 'La Dra. Carolina Ruiz es una ginecóloga enfocada en el bienestar femenino y el cuidado de la salud reproductiva.'
WHERE id_medico = 10;

UPDATE profesional_medico
SET descripcion_medico = 'El Dr. Alejandro Díaz es un oftalmólogo experto en el diagnóstico y tratamiento de enfermedades oculares.'
WHERE id_medico = 11;

UPDATE profesional_medico
SET descripcion_medico = 'La Dra. Valeria Torres es una oftalmóloga comprometida con la preservación de la salud visual y el bienestar ocular.'
WHERE id_medico = 12;



SELECT * FROM profesional_medico;