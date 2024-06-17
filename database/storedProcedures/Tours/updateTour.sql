USE nodeJSProject
GO
CREATE OR ALTER PROCEDURE updateTour
    @id VARCHAR(50),
    @name NVARCHAR(255),
    @description NVARCHAR(MAX),
    @price DECIMAL(10, 2),
    @duration INT
AS
BEGIN
    UPDATE Tours
    SET name = @name, description = @description, price = @price, duration = @duration, updatedAt = GETDATE()
    WHERE id = @id;
END
GO