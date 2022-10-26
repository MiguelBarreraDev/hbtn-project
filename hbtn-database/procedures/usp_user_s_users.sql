DELIMITER $$

DROP PROCEDURE IF EXISTS `usp_user_s_users`$$

CREATE PROCEDURE `usp_user_s_users`()
BEGIN
	SELECT 
		`user_id`,
        
	FROM
		`user`
	WHERE 
		`deleted` = 0;
END$$

DELIMITER ;