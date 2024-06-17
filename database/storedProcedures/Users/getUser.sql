USE nodeJSProject
GO
CREATE OR ALTER PROCEDURE getUser
    @id VARCHAR(50)
AS
BEGIN
    SELECT * FROM users1 WHERE id = @id AND isDeleted = 0;
END