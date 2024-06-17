USE nodeJSProject;
GO
CREATE OR ALTER PROCEDURE addHotel
    @id VARCHAR(50),
    @name NVARCHAR(255),
    @location NVARCHAR(255),
    @price DECIMAL(10, 2)
AS
BEGIN
    INSERT INTO Hotels (id, name, location, price)
    VALUES (@id, @name, @location, @price);
END;
GO