use `holberton_db`;
DELIMITER $$
DROP PROCEDURE IF EXISTS `usp_user_s_users`$$

CREATE PROCEDURE `usp_user_s_users`()
BEGIN

	SELECT 
		*
        
	FROM usuarios;
END $$
DELIMITER ;
