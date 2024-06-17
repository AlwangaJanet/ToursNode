USE nodeJSProject
GO
CREATE OR ALTER PROCEDURE updateUser
    @id VARCHAR(50),
    @name NVARCHAR(255),
    @email NVARCHAR(255),
    @password NVARCHAR(255),
    @isAdmin INT
AS
BEGIN
    UPDATE users1
    SET name = @name, email = @email, password = @password, isAdmin = @isAdmin, updatedAt = GETDATE()
    WHERE id = @id AND isDeleted = 0;
END
GO