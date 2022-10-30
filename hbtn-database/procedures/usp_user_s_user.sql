USE `holberton_db`;
-- =========================================================
-- Autor - Fecha Crea  :  Rogelio Conde - 2022-27-10
-- Descripcion         : select a record from the table
-- Autor - Fecha Modif :
-- Descripcion         :
-- =========================================================


DELIMITER $$

DROP PROCEDURE IF EXISTS `usp_user_s_user`$$

CREATE PROCEDURE `usp_user_s_user`(
	IN p_user_id INT
)
BEGIN
	SELECT 
		`nombre`,
		`apellido`,
		`email`,
		`id_rol`,
		`estado`
        
	FROM
		`usuarios`
	WHERE 
		`id` = p_user_id;
END$$

DELIMITER ;


DROP PROCEDURE IF EXISTS users_login;

DELIMITER $$
CREATE PROCEDURE users_login
( IN pvemail varchar(50) )
BEGIN

    DECLARE v_user_id bigint;
    SELECT id INTO v_user_id
    FROM usuarios
    WHERE
        email = pvemail;

    IF (v_user_id IS NOT NULL)
    THEN
        CALL usp_user_s_user(
            v_user_id
        );
    END IF;

END $$
DELIMITER ;
