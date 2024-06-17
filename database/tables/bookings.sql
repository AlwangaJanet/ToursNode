USE nodeJSProject;

CREATE TABLE Bookings (
    id VARCHAR(50) PRIMARY KEY,
    userId VARCHAR(50) NOT NULL,
    tourId VARCHAR(50) NOT NULL,
    hotel_Id VARCHAR(50) NOT NULL,
    bookingDate DATETIME DEFAULT GETDATE(),
    status NVARCHAR(50) DEFAULT 'Pending',
    FOREIGN KEY (userId) REFERENCES users1(id),
    FOREIGN KEY (tourId) REFERENCES Tours(id),
    FOREIGN KEY (hotel_Id) REFERENCES Hotels(id)
);