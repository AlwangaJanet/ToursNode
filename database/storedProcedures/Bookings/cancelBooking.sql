USE nodeJSProject;
GO
CREATE OR ALTER PROCEDURE cancelBooking
    @id VARCHAR(50)
AS
BEGIN
    UPDATE Bookings
    SET status = 'Cancelled'
    WHERE id = @id;
END;