import logbook_params, { prisma_params } from "./logbookParams";

enum states {
  "NSW",
  "QLD",
  "VIC",
  "ACT",
}

var logbook: Logbook;
var driver: Driver;
var logbook_entries: Logbook_entries;
function map_pagination_buttons(num_entries: number, per_page: number): void {
  const buttons = document.getElementById("pagination-buttons");
  console.log(num_entries / per_page);
  buttons.innerHTML = "";
  for (let i = 0; i < Math.ceil(num_entries / per_page); i++) {
    buttons.innerHTML += `<li>
      <button
          id="${i + 1}"
          onclick="handle_pagination(event)"
          class="flex items-center justify-center px-3 h-8 leading-tight text-blue-500 bg-white border border-gray-300 hover:text-blue-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          ${i + 1}
        </button>
      </li>`;
  }
}

// check when the url changes for pagination
window.addEventListener("locationchange", () => {
  console.log("location changed");
  const queryString = window.location.search;
  console.log(queryString);
});

// load the driver when the page is loaded
const load_driver = async (start = 0, end = 10, page = 1) => {
  function reformatDateString(date: string) {
    console.log(date);
    const format_date = new Date(date);
    var day = format_date.getUTCDate() + 1;
    var month = format_date.getUTCMonth();
    var year = format_date.getFullYear();

    var formattedDay = day < 10 ? "0" + day : day;
    var formattedMonth = month < 10 ? "0" + month : month;

    // Create the reformatted date string
    var reformattedDateString =
      formattedDay + "/" + formattedMonth + "/" + year;

    return reformattedDateString;
  }
  const per_page: number = 12;
  driver = new Driver("kevin huang", "24");
  logbook_entries = new Logbook_entries();
  logbook = new Logbook(driver);

  start = (page - 1) * per_page;
  end = page * per_page;

  // load logbook entries
  const log_book_entries = await logbook.fetch_logbook_entries();

  map_pagination_buttons(log_book_entries.length, per_page);

  // hydrate the ui
  const table = document.getElementById("table-body");

  // clear all existing rows
  let table_rows = document.querySelectorAll("#table-body tr");
  table_rows.forEach((tr) => tr.remove());

  document.getElementById("current-showing").innerHTML = `${start}-${end}`;
  document.getElementById("showing-total").innerHTML =
    `${log_book_entries.length}`;

  for (
    let entry = page * per_page - per_page;
    entry < per_page * page;
    entry++
  ) {
    // console.log(log_book_entries[entry]);
    const row = document.createElement("tr");
    const entry_data = log_book_entries[entry];
    row.innerHTML = `
    <tr
    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
  >
    <td class="w-4 p-4">
      <div class="flex items-center">
        <input
          id="checkbox-table-search-1"
          type="checkbox"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label for="checkbox-table-search-1" class="sr-only"
          >checkbox</label
        >
      </div>
    </td>
    <th
      scope="row"
      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      ${reformatDateString(entry_data.date).toString()}
    </th>
    <td class="px-6 py-4">${entry_data.vehicle_registration}</td>
    <td class="px-6 py-4">${entry_data.odometer_start}</td>
    <td class="px-6 py-4">${entry_data.odometer_end}</td>
    <td class="px-6 py-4">${entry_data.trip_details}</td>
    <td class="px-6 py-4">${entry_data.conditions_road}</td>
    <td class="px-6 py-4">${entry_data.conditions_traffic}</td>
    <td class="px-6 py-4">${entry_data.conditions_weather}</td>
    <td class="px-6 py-4">${entry_data.licence_number}</td>
    <td class="px-6 py-4">${entry_data.time_start}</td>
    <td class="px-6 py-4">${entry_data.time_end}</td>
    <td class="px-6 py-4">
    <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-2 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" id="${
      log_book_entries[entry].id
    }" onclick="delete_entry(event)">Delete</button>
    </td>
  </tr>
    `;
    table.appendChild(row);
  }
};

class Driver {
  driver_name: string;
  total_hours_driven: number;
  driver_age: string;

  constructor(name: string, age: string) {
    this.driver_age = age;
    // TODO: update this with the running count from the database;
    this.total_hours_driven = 0;
    this.driver_name = name;
  }

  async update_logbook_hours(hours_driven: Number) {
    const update_hours = await fetch("http://localhost:3000/logbook", {
      method: "PATCH",
      body: JSON.stringify({
        hours_driven: "20",
      }),
    });
    console.log("update hours", update_hours);

    return update_hours;
  }

  addLogbook(): void {
    // TODO: calls the database that creates the new function
  }
  deleteDriver_details(): boolean {
    return false;
  }

  /**
   *
   * @returns object - containing all the details of that driver
   */
  get_details(): object {
    return {};
  }

  set_details(): void {}

  async saveToDb(): Promise<boolean> {
    console.log(this.driver_age, this.driver_name);
    const postData = await fetch(`http://loalhost:3000/drivers`, {
      method: "POST",
      body: JSON.stringify({
        driver: this.driver_name,
        driver_age: this.driver_age,
      }),
    });
    return true;
  }
}

class Logbook {
  driver: Driver;
  constructor(driver: Driver) {
    this.driver = driver;
  }
  private parse_conditions_keys(conditions: string): string {
    // Convert the input condition to uppercase
    let description;

    switch (conditions) {
      case "Se":
        description = "Sealed";
        break;
      case "U":
        description = "Unsealed";
        break;
      case "QS":
        description = "Quiet Street";
        break;
      case "MR":
        description = "Main Road";
        break;
      case "ML":
        description = "Multi Laned";
        break;
      case "F":
        description = "Fog";
        break;
      case "R":
        description = "Rain";
        break;
      case "Sn":
        description = "Snow";
        break;
      case "I":
        description = "Ice";
        break;
      case "FG":
        description = "Fog";
        break;
      case "L":
        description = "Light";
        break;
      case "M":
        description = "Moderate";
        break;
      case "H":
        description = "Heavy";
        break;
      default:
        description = "Unknown condition";
    }
    return description;
  }
  /**
   * Function that fetches the logbook entries from the api details 
    @returns {object} - containing all the logbook entries 
  */
  async fetch_logbook_entries(): Promise<Array<prisma_params>> {
    const entries = await fetch("http://localhost:3000/logbook", {
      method: "GET",
    });
    const response = await entries.json();
    console.log("response", response);

    return response;
  }

  async delete_logbook_entries(delete_id: string) {
    return await fetch(`http://localhost:3000/entries`, {
      method: "DELETE",
      body: JSON.stringify({ id: delete_id }),
    });
  }

  /**
   * Function that adds hours to the logbook database that .
   * @returns {boolean} returns true if logbook hours are successfully created, returns false if otherwise
   * @param params
   */
  async addHoursToLogBook(params: logbook_params): Promise<boolean> {
    // save them to db

    // TODO: try parseInt the odometer value;

    try {
      parseInt(params.odometer_start);
      parseInt(params.odomoter_end);
    } catch {
      return;
    }

    const post_to_log_book = await fetch("http://localhost:3000/create", {
      method: "POST",
      body: JSON.stringify({
        date_value: params.date_value,
        registration_number_value: params.registration_number_value,
        odometer_start: params.odometer_start,
        odomoter_end: params.odomoter_end,
        trip_details_value: params.trip_details_value,
        road_conditions: this.parse_conditions_keys(params.road_conditions),
        weather_conditions: this.parse_conditions_keys(
          params.weather_conditions,
        ),
        traffic_conditions: this.parse_conditions_keys(
          params.traffic_conditions,
        ),
        license_number_value: params.license_number_value,
        time_start: params.time_start,
        time_end: params.time_end,
      }),
    });
    return true;
  }
}

class Logbook_entries {
  private isNumeric(value) {
    return /^\d+$/.test(value);
  }
  private calculateTimeDifference(start: string, end: string) {
    let startTime = this.parseTime(start);
    let endTime = this.parseTime(end);

    let durationInMinutes =
      (endTime.hours - startTime.hours) * 60 +
      (endTime.minutes - startTime.minutes);

    let durationInHours = Math.floor(durationInMinutes / 60);
    let remainingMinutes = durationInMinutes % 60;

    return { hours: durationInHours, minutes: remainingMinutes };
  }
  private parseTime(timeString: string) {
    let [hours, minutes] = timeString.split(":").map(Number);
    return { hours, minutes };
  }
  private reformatDateString(date: Date) {
    var day = date.getUTCDate();
    var month = date.getUTCMonth();
    var year = date.getFullYear;

    var formattedDay = day < 10 ? "0" + day : day;
    var formattedMonth = month < 10 ? "0" + month : month;

    // Create the reformatted date string
    var reformattedDateString =
      formattedDay + "/" + formattedMonth + "/" + year;

    return reformattedDateString;
  }
  private parseDateString(dateString: string): {
    day: number;
    month: number;
    year: number;
    fullDate: Date;
  } {
    const dateArray = dateString.split("/");

    const day = parseInt(dateArray[0], 10);
    const month = parseInt(dateArray[1], 10);
    const year = parseInt(dateArray[2], 10);

    const parsedDate = new Date(year, month, day);

    return { day: day, month: month, year: year, fullDate: parsedDate };
  }
  /**
   *
   * @params no params mate
   * @returns this.entries
   */
  // TODO: Do type checking and error checking
  add_logbook_entries() {
    let date_value: {
      month: number;
      day: number;
      year: number;
      fullDate: Date;
    } = this.parseDateString(
      (<HTMLInputElement>document.getElementById("date-input")).value,
    );
    const registration_number_value = (<HTMLInputElement>(
      document.getElementById("registration-input")
    )).value;
    const odometer_start = (<HTMLInputElement>(
      document.getElementById("start-odometer-input")
    )).value;
    const odomoter_end = (<HTMLInputElement>(
      document.getElementById("end-odometer-input")
    )).value;
    const trip_details_value = (<HTMLInputElement>(
      document.getElementById("trip-details-input")
    )).value;
    const road_conditions = (<HTMLInputElement>(
      document.getElementById("road-conditions-input")
    )).value;
    const weather_conditions = (<HTMLInputElement>(
      document.getElementById("weather-conditions-input")
    )).value;
    const traffic_conditions = (<HTMLInputElement>(
      document.getElementById("traffic-conditions-input")
    )).value;
    const license_number_value = (<HTMLInputElement>(
      document.getElementById("license-number-input")
    )).value;
    const time_start = (<HTMLInputElement>(
      document.getElementById("time-start-input")
    )).value;
    const time_end = (<HTMLInputElement>(
      document.getElementById("time-end-input")
    )).value;

    console.log(
      this.reformatDateString,
      registration_number_value,
      odometer_start,
      odomoter_end,
      trip_details_value,
      road_conditions,
      weather_conditions,
      traffic_conditions,
      license_number_value,
      time_start,
      time_end,
    );

    if (
      date_value !== null &&
      registration_number_value !== "" &&
      odometer_start !== "" &&
      odomoter_end !== "" &&
      trip_details_value !== "" &&
      road_conditions !== "" &&
      weather_conditions !== "" &&
      traffic_conditions !== "" &&
      license_number_value !== "" &&
      time_start !== "" &&
      time_end !== "" &&
      this.isNumeric(odometer_start) == true &&
      this.isNumeric(odomoter_end) == true
    ) {
      this.isNumeric("24");
      // create databse entry from this
      console.log(logbook);
      logbook.addHoursToLogBook({
        date_value,
        registration_number_value,
        odometer_start,
        odomoter_end,
        trip_details_value,
        road_conditions,
        weather_conditions,
        traffic_conditions,
        license_number_value,
        time_start,
        time_end,
      });
      // TODO: Update the current driver hours and save them in database
      let duration = this.calculateTimeDifference(time_start, time_end);

      console.log(
        "Duration: ",
        duration.hours,
        "hours and",
        duration.minutes,
        "minutes",
      );
      driver.total_hours_driven += duration.hours * 60 + duration.minutes;
      console.log(driver.total_hours_driven);

      console.log("WEROIUWERIOUWER", driver.update_logbook_hours(5));

      alert("value added");
      // location.reload();
      // location.replace(location.href);
    } else {
      // At least one variable is falsy, handle accordingly
      alert("Not all fields are validily entered");
    }
  }
}

function create_driver_button(): void {
  const driver_name = (
    document.getElementById("driver-name") as HTMLInputElement
  )?.value;
  const driver_age = (document.getElementById("driver-age") as HTMLInputElement)
    ?.value;
  console.log(driver_name, driver_age);
  if (driver_name && driver_age) {
    console.log(driver_name, "is", driver_age, "ars old");

    // make this logbook variable global
    let driver = new Driver(driver_name, driver_age);

    if (driver.saveToDb()) {
      // hide the ui
      console.log("created");
      let details = document.getElementById("details-screen");
      details.style.display = "none";
    }
  }
}

function add_logbook_entry(): void {
  logbook_entries.add_logbook_entries();
}

function delete_entry(e: any) {
  // console.log(e);
  // TODO: delete from the database according to this e.target.id that is returned from the js event

  console.log(e.target.id);

  if (e.target.id) {
    logbook.delete_logbook_entries(e.target.id);
  }

  location.reload();
}

function handle_pagination(e: any) {
  if (e.target.id) {
    load_driver(0, 10, e.target.id);
  }
}
