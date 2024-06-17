USE nodeJSProject;
GO
CREATE OR ALTER PROCEDURE addBooking
    @id VARCHAR(36),
    @userId VARCHAR(36),
    @tourId VARCHAR(36),
    @hotel_Id VARCHAR(36),
    @bookingDate DATETIME
AS
BEGIN
    INSERT INTO Bookings (id, userId, tourId, hotel_Id, bookingDate)
    VALUES (@id, @userId, @tourId, @hotel_Id, @bookingDate);
END;