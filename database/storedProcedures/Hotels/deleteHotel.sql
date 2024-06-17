USE nodeJSProject;
GO
CREATE OR ALTER PROCEDURE deleteHotel
    @id VARCHAR(50)
AS
BEGIN
    DELETE FROM Hotels WHERE id = @id;
END;