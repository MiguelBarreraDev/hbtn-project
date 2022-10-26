DELIMITER $$

DROP PROCEDURE IF EXISTS `usp_user_s_user`$$

CREATE PROCEDURE `usp_user_s_user`(
	IN p_user_id INT
)
BEGIN
	SELECT 
		`user_id`,
        
	FROM
		`user`
	WHERE 
		`user_id` = p_user_id;
END$$

DELIMITER ;