interface Booking {
  name_booker: string;
  date_booked: Date;
  room_number: number;
  allBookings: Bookings[];
}

class Bookings {
  name_booker: string;
  date_booked: Date;
  room_number: number;
  static allBookings: Bookings[] = [];

  constructor(name_booker: string, date_booked: Date, room_number: number) {
    this.name_booker = name_booker;
    this.date_booked = date_booked;
    this.room_number = room_number;
    Bookings.allBookings.push(this);
    Bookings.allBookings.sort((a, b) => a.date_booked.getTime() - b.date_booked.getTime());
  }

  static getBookings(booked?: string | number | Date, secondDate?: Date): string {
    let filteredBookings: Bookings[] = [];

    if (typeof booked == "number") {
      filteredBookings = Bookings.allBookings.filter((booking) => booking.room_number === booked);
    } else if (typeof booked == "string") {
      filteredBookings = Bookings.allBookings.filter((booking) => booking.name_booker === booked);
    } else if (booked instanceof Date && secondDate instanceof Date) {
      filteredBookings = Bookings.allBookings.filter(
        (booking) =>
          booking.date_booked.getTime() >= booked.getTime() && booking.date_booked.getTime() <= secondDate.getTime()
      );
    }
    console.log(filteredBookings.length);
    if (filteredBookings.length <= 0) {
      return "There is no booking for this filter";
    }
    if (filteredBookings.length > 0 || typeof booked == "string") {
      let bookingsString = "";
      for (let booking of filteredBookings) {
        //Format is 'name' booked Room No. 'number' on 'date('Month'-'Day'-'Year')
        console.log(
          `${booking.name_booker} booked Room No.${booking.room_number} on ${booking.date_booked.toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          )}`
        );
        //Format is 'name' booked Room No. 'number' on 'date('Month'-'Day'-'Year')
        bookingsString += `${booking.name_booker} booked Room No.${
          booking.room_number
        } on ${booking.date_booked.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}\n`;
      }
      return bookingsString;
    } else {
      let bookingsString = "";
      for (let booking of Bookings.allBookings) {
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
        bookingsString += `${booking.name_booker} booked No.${
          booking.room_number
        } on ${booking.date_booked.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}\n`;
      }
      return bookingsString;
    }
  }
  static bookingExists(date: Date, room_number: number): boolean {
    for (let booking of Bookings.allBookings) {
      //   console.log("\t" + date + " === " + booking.date_booked + "\n" + room_number + " === " + booking.room_number);
      if (booking.room_number === room_number && booking.date_booked.getTime() == date.getTime()) {
        return true;
      }
    }
    return false;
  }
}

function MakeABooking(name: string, date: Date, room_number: number): boolean {
  console.log("\n");
  if (Bookings.bookingExists(date, room_number)) {
    return true;
    // console.log("There is already a booking on this date and room");
  } else {
    return false;
    // console.log("Boooking successful");
    // console.log(name + " has booked meeting room " + room_number + " on this date");
  }
}

//Print the Calendar Design
function printCalendar(date: Date) {
  //Get the selected month and year
  const month = date.getMonth();
  const year = date.getFullYear();
  const monthName = date.toLocaleString("default", { month: "long" });
  //Get the first day of the Month
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  //   console.log(firstDayOfWeek);
  //Get the last day of the Month
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const lastDateOfMonth = lastDayOfMonth.getDate();
  //   console.log(lastDateOfMonth);

  console.log(monthName + "\t\t" + year);
  console.log("Sun\tMon\tTue\tWed\tThu\tFri\tSat");

  let row = "";
  for (let i = 0; i < firstDayOfWeek; i++) {
    row += "\t";
  }
  for (let i = 1; i <= lastDateOfMonth; i++) {
    if (date.getDate() === i) {
      row += `X\t`;
    } else {
      row += `${i}\t`;
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
const booking1 = new Bookings("JC", new Date(2023, 2, 14), 2);
const booking2 = new Bookings("JC", new Date(2023, 2, 17), 2);
const booking3 = new Bookings("Justine", new Date(2023, 2, 19), 1);
const booking4 = new Bookings("Jim", new Date(2023, 2, 20), 1);
const booking5 = new Bookings("Enzo", new Date(2023, 2, 28), 3);
const booking6 = new Bookings("Enzo", new Date(2023, 2, 15), 3);

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
const form = document?.getElementById("booking-form") as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const roomInput = document.getElementById("room_number") as HTMLInputElement;
const dateInput = document.getElementById("date_booked") as HTMLInputElement;
const bookingsContainer = document.getElementById("bookings") as HTMLDivElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value;
  const roomNumber = parseInt(roomInput.value);
  const date = new Date(dateInput.value);
  // console.log(name);
  // console.log(roomNumber);
  // console.log(date);

  const bookingElement = document.createElement("div");

  if (!MakeABooking(name, date, roomNumber)) {
    console.log("Book successfully");
    printCalendar(date);
    const booking = new Bookings(name, date, roomNumber);

    bookingElement.innerText = `Name: ${booking.name_booker}, Room Number: ${
      booking.room_number
    }, Date: ${booking.date_booked.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })}
    ${printCalendar(date)}`;
    bookingsContainer.innerHTML = "";
    bookingsContainer.appendChild(bookingElement);

    // Clear input fields
    nameInput.value = "";
    roomInput.value = "";
    dateInput.value = "";
  } else {
    bookingElement.innerText = "There is already a booking on this date and room";
    bookingsContainer.innerHTML = "";
    bookingsContainer.appendChild(bookingElement);
    console.log("There is already a booking on this date and room");
  }
});

const showBookings = document?.getElementById("showBookings") as HTMLButtonElement;

showBookings.addEventListener("click", (event: MouseEvent) => {
  const showAll = document.createElement("div");
  showAll.innerText = Bookings.getBookings();
  bookingsContainer.innerHTML = "";
  bookingsContainer.appendChild(showAll);
});

const filterNameRoomNumber = document?.getElementById("filter-by-NaRN") as HTMLFormElement;
const filterForm = document.getElementById("NaRN-filter") as HTMLButtonElement;
const filterInput = document.getElementById("filterInput") as HTMLInputElement;

filterNameRoomNumber.addEventListener("submit", (event) => {
  event.preventDefault();

  const bookingElement = document.createElement("div");
  let filter = filterInput.value;

  let booking: string;

  if (Number(filter)) {
    const filterNumber = Number(filter);
    booking = Bookings.getBookings(filterNumber);
  } else {
    booking = Bookings.getBookings(filter);
  }
  if (filter != "") {
    bookingsContainer.innerHTML = "";
    const filterResults = document.createElement("div");
    bookingsContainer.appendChild(filterResults);
    filterResults.innerText = booking;
    bookingElement.innerHTML = "";
  }
});

const filterDateRange = document?.getElementById("filter-date-range") as HTMLFormElement;
const startDateFilter = document.getElementById("start-date") as HTMLInputElement;
const endDateFilter = document.getElementById("end-date") as HTMLInputElement;
const dateRangeBTN = document.getElementById("date-range-filter") as HTMLButtonElement;

filterDateRange.addEventListener("submit", (event) => {
  event.preventDefault();

  if (startDateFilter.value !== "" && endDateFilter.value !== "") {
    const startDate: Date = new Date(startDateFilter.value);
    const endDate: Date = new Date(endDateFilter.value);

    const dateRangeResult = document.createElement("div");
    const displayRange = document.createElement("h5");
    // console.log(Bookings.getBookings(startDate, endDate));
    startDateFilter.value = "";
    endDateFilter.value = "";

    displayRange.innerHTML = `Date range: ${startDate.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })}
     to 
     ${endDate.toLocaleString("en-US", {
       month: "long",
       day: "numeric",
       year: "numeric",
     })}`;
    dateRangeResult.innerText = Bookings.getBookings(startDate, endDate);
    bookingsContainer.innerHTML = "";
    bookingsContainer.appendChild(displayRange);
    bookingsContainer.appendChild(dateRangeResult);
  }
});
