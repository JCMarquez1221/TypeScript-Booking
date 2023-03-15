var Bookings = /** @class */ (function () {
    function Bookings(name_booker, date_booked, room_number) {
        this.name_booker = name_booker;
        this.date_booked = date_booked;
        this.room_number = room_number;
        Bookings.allBookings.push(this);
        Bookings.allBookings.sort(function (a, b) { return a.date_booked.getTime() - b.date_booked.getTime(); });
    }
    Bookings.getBookings = function (booked, secondDate) {
        var filteredBookings = [];
        if (typeof booked == "number") {
            filteredBookings = Bookings.allBookings.filter(function (booking) { return booking.room_number === booked; });
        }
        else if (typeof booked == "string") {
            filteredBookings = Bookings.allBookings.filter(function (booking) { return booking.name_booker === booked; });
        }
        else if (booked instanceof Date && secondDate instanceof Date) {
            filteredBookings = Bookings.allBookings.filter(function (booking) {
                return booking.date_booked.getTime() >= booked.getTime() && booking.date_booked.getTime() <= secondDate.getTime();
            });
        }
        console.log(filteredBookings.length);
        if (filteredBookings.length <= 0) {
            return "There is no booking for this filter";
        }
        if (filteredBookings.length > 0 || typeof booked == "string") {
            var bookingsString = "";
            for (var _i = 0, filteredBookings_1 = filteredBookings; _i < filteredBookings_1.length; _i++) {
                var booking = filteredBookings_1[_i];
                //Format is 'name' booked Room No. 'number' on 'date('Month'-'Day'-'Year')
                console.log("".concat(booking.name_booker, " booked Room No.").concat(booking.room_number, " on ").concat(booking.date_booked.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                })));
                //Format is 'name' booked Room No. 'number' on 'date('Month'-'Day'-'Year')
                bookingsString += "".concat(booking.name_booker, " booked Room No.").concat(booking.room_number, " on ").concat(booking.date_booked.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }), "\n");
            }
            return bookingsString;
        }
        else {
            var bookingsString = "";
            for (var _a = 0, _b = Bookings.allBookings; _a < _b.length; _a++) {
                var booking = _b[_a];
                // console.log(
                //   `${booking.name_booker} booked Room No.${booking.room_number} on ${booking.date_booked.toLocaleDateString(
                //     "en-US",
                //     {
                //       month: "long",
                //       day: "numeric",
                //       year: "numeric",
                //     }
                //   )}`
                // );
                bookingsString += "".concat(booking.name_booker, " booked No.").concat(booking.room_number, " on ").concat(booking.date_booked.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }), "\n");
            }
            return bookingsString;
        }
    };
    Bookings.bookingExists = function (date, room_number) {
        for (var _i = 0, _a = Bookings.allBookings; _i < _a.length; _i++) {
            var booking = _a[_i];
            //   console.log("\t" + date + " === " + booking.date_booked + "\n" + room_number + " === " + booking.room_number);
            if (booking.room_number === room_number && booking.date_booked.getTime() == date.getTime()) {
                return true;
            }
        }
        return false;
    };
    Bookings.allBookings = [];
    return Bookings;
}());
function MakeABooking(name, date, room_number) {
    console.log("\n");
    if (Bookings.bookingExists(date, room_number)) {
        return true;
        // console.log("There is already a booking on this date and room");
    }
    else {
        return false;
        // console.log("Boooking successful");
        // console.log(name + " has booked meeting room " + room_number + " on this date");
    }
}
//Print the Calendar Design
function printCalendar(date) {
    //Get the selected month and year
    var month = date.getMonth();
    var year = date.getFullYear();
    var monthName = date.toLocaleString("default", { month: "long" });
    //Get the first day of the Month
    var firstDayOfMonth = new Date(year, month, 1);
    var firstDayOfWeek = firstDayOfMonth.getDay();
    //   console.log(firstDayOfWeek);
    //Get the last day of the Month
    var lastDayOfMonth = new Date(year, month + 1, 0);
    var lastDateOfMonth = lastDayOfMonth.getDate();
    //   console.log(lastDateOfMonth);
    console.log(monthName + "\t\t" + year);
    console.log("Sun\tMon\tTue\tWed\tThu\tFri\tSat");
    var row = "";
    for (var i = 0; i < firstDayOfWeek; i++) {
        row += "\t";
    }
    for (var i = 1; i <= lastDateOfMonth; i++) {
        if (date.getDate() === i) {
            row += "X\t";
        }
        else {
            row += "".concat(i, "\t");
        }
        if ((firstDayOfWeek + i) % 7 === 0) {
            console.log(row);
            row = "";
        }
    }
    if (row !== "") {
        console.log(row);
    }
}
//Creates an instance with parameters --Name of Booker-- --Date of Booking-- --Room Number--
//Date start in 0 so January is equals to 0
var booking1 = new Bookings("JC", new Date(2023, 2, 14), 2);
var booking2 = new Bookings("JC", new Date(2023, 2, 17), 2);
var booking3 = new Bookings("Justine", new Date(2023, 2, 19), 1);
var booking4 = new Bookings("Jim", new Date(2023, 2, 20), 1);
var booking5 = new Bookings("Enzo", new Date(2023, 2, 28), 3);
var booking6 = new Bookings("Enzo", new Date(2023, 2, 15), 3);
// console.log("\nAll Bookings");
// Bookings.getBookings();
// console.log("\nBooking by name");
// Bookings.getBookings("JC");
// console.log("\nBooking by room number");
// Bookings.getBookings(1);
// console.log("\nBooking within range");
// Bookings.getBookings(new Date(2023, 2, 10), new Date(2023, 2, 19));
// console.log("\nDisplay Booked");
// MakeABooking("JC", new Date(2023, 2, 19), 3);
//Gets the Form
var form = document === null || document === void 0 ? void 0 : document.getElementById("booking-form");
var nameInput = document.getElementById("name");
var roomInput = document.getElementById("room_number");
var dateInput = document.getElementById("date_booked");
var bookingsContainer = document.getElementById("bookings");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = nameInput.value;
    var roomNumber = parseInt(roomInput.value);
    var date = new Date(dateInput.value);
    // console.log(name);
    // console.log(roomNumber);
    // console.log(date);
    var bookingElement = document.createElement("div");
    if (!MakeABooking(name, date, roomNumber)) {
        console.log("Book successfully");
        printCalendar(date);
        var booking = new Bookings(name, date, roomNumber);
        bookingElement.innerText = "Name: ".concat(booking.name_booker, ", Room Number: ").concat(booking.room_number, ", Date: ").concat(booking.date_booked.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        }), "\n    ").concat(printCalendar(date));
        bookingsContainer.innerHTML = "";
        bookingsContainer.appendChild(bookingElement);
        // Clear input fields
        nameInput.value = "";
        roomInput.value = "";
        dateInput.value = "";
    }
    else {
        bookingElement.innerText = "There is already a booking on this date and room";
        bookingsContainer.innerHTML = "";
        bookingsContainer.appendChild(bookingElement);
        console.log("There is already a booking on this date and room");
    }
});
var showBookings = document === null || document === void 0 ? void 0 : document.getElementById("showBookings");
showBookings.addEventListener("click", function (event) {
    var showAll = document.createElement("div");
    showAll.innerText = Bookings.getBookings();
    bookingsContainer.innerHTML = "";
    bookingsContainer.appendChild(showAll);
});
var filterNameRoomNumber = document === null || document === void 0 ? void 0 : document.getElementById("filter-by-NaRN");
var filterForm = document.getElementById("NaRN-filter");
var filterInput = document.getElementById("filterInput");
filterNameRoomNumber.addEventListener("submit", function (event) {
    event.preventDefault();
    var bookingElement = document.createElement("div");
    var filter = filterInput.value;
    var booking;
    if (Number(filter)) {
        var filterNumber = Number(filter);
        booking = Bookings.getBookings(filterNumber);
    }
    else {
        booking = Bookings.getBookings(filter);
    }
    if (filter != "") {
        bookingsContainer.innerHTML = "";
        var filterResults = document.createElement("div");
        bookingsContainer.appendChild(filterResults);
        filterResults.innerText = booking;
        bookingElement.innerHTML = "";
    }
});
var filterDateRange = document === null || document === void 0 ? void 0 : document.getElementById("filter-date-range");
var startDateFilter = document.getElementById("start-date");
var endDateFilter = document.getElementById("end-date");
var dateRangeBTN = document.getElementById("date-range-filter");
filterDateRange.addEventListener("submit", function (event) {
    event.preventDefault();
    if (startDateFilter.value !== "" && endDateFilter.value !== "") {
        var startDate = new Date(startDateFilter.value);
        var endDate = new Date(endDateFilter.value);
        var dateRangeResult = document.createElement("div");
        var displayRange = document.createElement("h5");
        // console.log(Bookings.getBookings(startDate, endDate));
        startDateFilter.value = "";
        endDateFilter.value = "";
        displayRange.innerHTML = "Date range: ".concat(startDate.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        }), "\n     to \n     ").concat(endDate.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        }));
        dateRangeResult.innerText = Bookings.getBookings(startDate, endDate);
        bookingsContainer.innerHTML = "";
        bookingsContainer.appendChild(displayRange);
        bookingsContainer.appendChild(dateRangeResult);
    }
});
