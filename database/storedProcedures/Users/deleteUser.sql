USE nodeJSProject;
GO
CREATE OR ALTER PROCEDURE deleteUser
    @id VARCHAR(36)
AS
BEGIN
    UPDATE users1
    SET isDeleted = 1, updatedAt = GETDATE()
    WHERE id = @id;
END
GO