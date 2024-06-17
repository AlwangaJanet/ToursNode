USE nodeJSProject;
GO
CREATE OR ALTER PROCEDURE addUser
    @id VARCHAR(50),
    @name NVARCHAR(255),
    @Email NVARCHAR(255),
    @password NVARCHAR(255),
    @isAdmin INT,
    @isDeleted INT,
    @isEmailSent INT
AS
BEGIN
    INSERT INTO users1 (id, name, email, password, isAdmin, isDeleted, isEmailSent)
    VALUES (@id, @name, @Email, @password, @isAdmin, @isDeleted, @isEmailSent);
END
GO