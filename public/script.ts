import logbook_params from "./logbookParams";
var logbook: Logbook;
const load_driver = async () => {
  // load the driver when the page is loaded
  var driver = new Driver("kevin huang", "24");

  logbook = new Logbook(driver);
  console.log("created");

  // load logbook entries
  const log_book_entries = await logbook.fetch_logbook_entries();

  // hydrate the ui
  const table = document.getElementById("entry_table");
  for (const entry in log_book_entries) {
    console.log(log_book_entries[entry]);
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
      ${log_book_entries[entry].date}
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
    <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-2 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" id="${log_book_entries[entry].id}" onclick="delete_entry(event)">Delete</button>
    </td>
  </tr>
    `;
    table.appendChild(row);
  }
};

class Driver {
  driver_name: string;
  driver_age: string;

  constructor(name: string, age: string) {
    this.driver_age = age;
    this.driver_name = name;
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
    const postData = await fetch(`http://localhost:3000/createDriver`, {
      method: "POST",
      body: JSON.stringify({
        driver: this.driver_name,
        driver_age: this.driver_age,
      }),
    });

    return true;
  }
}

enum states {
  "NSW",
  "QLD",
  "VIC",
  "ACT",
}
class Logbook {
  driver: Driver;
  constructor(driver: Driver) {
    this.driver = driver;
  }
  /**
    @returns {object} - containing all the logbook entries 
  */
  async fetch_logbook_entries() {
    const entries = await fetch("http://localhost:3000/logbook_entries", {
      method: "GET",
    });
    const response = await entries.json();
    console.log(response);

    return response;
  }

  async delete_logbook_entries(delete_id: string) {
    fetch(`http://localhost:3000/delete_entry`, {
      method: "DELETE",
      body: JSON.stringify({ id: delete_id }),
    });
    return;
  }

  /**
   * Function that adds hours to the logbook database that .
   * @param {object} logbook_params - Logbook hours such as the odomoter, start and finish
   * @returns {boolean} returns true if logbook hours are successfully created, returns false if otherwise
   */
  async addHoursToLogBook(params: logbook_params): Promise<boolean> {
    // save them to db

    const post_to_log_book = await fetch(
      "http://localhost:3000/add_hours_to_log_book",
      {
        method: "POST",
        body: JSON.stringify({
          date_value: params.date_value,
          registration_number_value: params.registration_number_value,
          odometer_start: params.odometer_start,
          odomoter_end: params.odomoter_end,
          trip_details_value: params.trip_details_value,
          road_conditions: params.road_conditions,
          weather_conditions: params.weather_conditions,
          traffic_conditions: params.traffic_conditions,
          license_number_value: params.license_number_value,
          time_start: params.time_start,
          time_end: params.time_end,
        }),
      }
    );
    return true;
  }
  /**
   *
   * @param params - ID of the logbook to remove from the database
   * @returns
   */
  remove_hours_from_logbook(params: object): boolean {
    return true;
  }
}

function create_driver_button() {
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

function add_logbook_entry() {
  //TODO: get all the values from the entry boxes.
  const date_value = (<HTMLInputElement>document.getElementById("date-input"))
    .value;
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
  const time_end = (<HTMLInputElement>document.getElementById("time-end-input"))
    .value;
  console.log(
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
    time_end
  );

  if (
    date_value !== "" &&
    registration_number_value !== "" &&
    odometer_start !== "" &&
    odomoter_end !== "" &&
    trip_details_value !== "" &&
    road_conditions !== "" &&
    weather_conditions !== "" &&
    traffic_conditions !== "" &&
    license_number_value !== "" &&
    time_start !== "" &&
    time_end !== ""
  ) {
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

    alert("value added");
    // location.reload();
    location.replace(location.href);
  } else {
    // At least one variable is falsy, handle accordingly
    alert("Not all fields have been submitted. ");
  }

  // now we want to send them all to the database if they are all filled in.

  return;
}

function delete_entry(e: any) {
  // console.log(e);
  // TODO: delete from the database according to this e.target.id that is returned from the js event

  console.log(e.target.id);

  if (e.target.id) {
    logbook.delete_logbook_entries(e.target.id);
  }

  return;
}
