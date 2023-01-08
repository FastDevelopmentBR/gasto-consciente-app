CREATE TABLE IF NOT EXISTS movimentations(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT, 
    `type` TINYINT DEFAULT 1,
    `title` VARCHAR(255), 
    `value` FLOAT, 
    `movimentation_date` DATE
);

CREATE TABLE IF NOT EXISTS categories(
    `id` INTEGER PRIMARY KEY AUTOINCREMENT, 
    `title` VARCHAR(255)
);

INSERT or IGNORE INTO movimentations(`id`, `type`, `title`, `value`, `movimentation_date`) VALUES (1, 0, 'Salário', 6400.00, '2023-01-06');
INSERT or IGNORE INTO movimentations(`id`, `type`, `title`, `value`, `movimentation_date`) VALUES (2, 1, 'Conta de Luz', 250.00, '2023-01-03');
INSERT or IGNORE INTO movimentations(`id`, `type`, `title`, `value`, `movimentation_date`) VALUES (3, 1, 'Lazer', 100.00, '2023-01-08');