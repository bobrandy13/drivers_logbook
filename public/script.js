"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var logbook;
var load_driver = function () { return __awaiter(void 0, void 0, void 0, function () {
    var driver, log_book_entries, table, entry, row, entry_data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                driver = new Driver("kevin huang", "24");
                logbook = new Logbook(driver);
                console.log("created");
                return [4 /*yield*/, logbook.fetch_logbook_entries()];
            case 1:
                log_book_entries = _a.sent();
                table = document.getElementById("entry_table");
                for (entry in log_book_entries) {
                    console.log(log_book_entries[entry]);
                    row = document.createElement("tr");
                    entry_data = log_book_entries[entry];
                    row.innerHTML = "\n    <tr\n    class=\"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600\"\n  >\n    <td class=\"w-4 p-4\">\n      <div class=\"flex items-center\">\n        <input\n          id=\"checkbox-table-search-1\"\n          type=\"checkbox\"\n          class=\"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600\"\n        />\n        <label for=\"checkbox-table-search-1\" class=\"sr-only\"\n          >checkbox</label\n        >\n      </div>\n    </td>\n    <th\n      scope=\"row\"\n      class=\"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white\"\n    >\n      ".concat(log_book_entries[entry].date, "\n    </th>\n    <td class=\"px-6 py-4\">").concat(entry_data.vehicle_registration, "</td>\n    <td class=\"px-6 py-4\">").concat(entry_data.odometer_start, "</td>\n    <td class=\"px-6 py-4\">").concat(entry_data.odometer_end, "</td>\n    <td class=\"px-6 py-4\">").concat(entry_data.trip_details, "</td>\n    <td class=\"px-6 py-4\">").concat(entry_data.conditions_road, "</td>\n    <td class=\"px-6 py-4\">").concat(entry_data.conditions_traffic, "</td>\n    <td class=\"px-6 py-4\">").concat(entry_data.conditions_weather, "</td>\n    <td class=\"px-6 py-4\">").concat(entry_data.licence_number, "</td>\n    <td class=\"px-6 py-4\">").concat(entry_data.time_start, "</td>\n    <td class=\"px-6 py-4\">").concat(entry_data.time_end, "</td>\n    <td class=\"px-6 py-4\">\n    <button type=\"button\" class=\"focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-2 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900\" id=\"").concat(log_book_entries[entry].id, "\" onclick=\"delete_entry(event)\">Delete</button>\n    </td>\n  </tr>\n    ");
                    table.appendChild(row);
                }
                return [2 /*return*/];
        }
    });
}); };
var Driver = /** @class */ (function () {
    function Driver(name, age) {
        this.driver_age = age;
        this.driver_name = name;
    }
    Driver.prototype.addLogbook = function () {
        // TODO: calls the database that creates the new function
    };
    Driver.prototype.deleteDriver_details = function () {
        return false;
    };
    /**
     *
     * @returns object - containing all the details of that driver
     */
    Driver.prototype.get_details = function () {
        return {};
    };
    Driver.prototype.set_details = function () { };
    Driver.prototype.saveToDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            var postData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.driver_age, this.driver_name);
                        return [4 /*yield*/, fetch("http://localhost:3000/createDriver", {
                                method: "POST",
                                body: JSON.stringify({
                                    driver: this.driver_name,
                                    driver_age: this.driver_age,
                                }),
                            })];
                    case 1:
                        postData = _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return Driver;
}());
var states;
(function (states) {
    states[states["NSW"] = 0] = "NSW";
    states[states["QLD"] = 1] = "QLD";
    states[states["VIC"] = 2] = "VIC";
    states[states["ACT"] = 3] = "ACT";
})(states || (states = {}));
var Logbook = /** @class */ (function () {
    function Logbook(driver) {
        this.driver = driver;
    }
    /**
      @returns {object} - containing all the logbook entries
    */
    Logbook.prototype.fetch_logbook_entries = function () {
        return __awaiter(this, void 0, void 0, function () {
            var entries, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://localhost:3000/logbook_entries", {
                            method: "GET",
                        })];
                    case 1:
                        entries = _a.sent();
                        return [4 /*yield*/, entries.json()];
                    case 2:
                        response = _a.sent();
                        console.log(response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    Logbook.prototype.delete_logbook_entries = function (delete_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                fetch("http://localhost:3000/delete_entry", {
                    method: "DELETE",
                    body: JSON.stringify({ id: delete_id }),
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * Function that adds hours to the logbook database that .
     * @param {object} logbook_params - Logbook hours such as the odomoter, start and finish
     * @returns {boolean} returns true if logbook hours are successfully created, returns false if otherwise
     */
    Logbook.prototype.addHoursToLogBook = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var post_to_log_book;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://localhost:3000/add_hours_to_log_book", {
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
                        })];
                    case 1:
                        post_to_log_book = _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     *
     * @param params - ID of the logbook to remove from the database
     * @returns
     */
    Logbook.prototype.remove_hours_from_logbook = function (params) {
        return true;
    };
    return Logbook;
}());
function create_driver_button() {
    var _a, _b;
    var driver_name = (_a = document.getElementById("driver-name")) === null || _a === void 0 ? void 0 : _a.value;
    var driver_age = (_b = document.getElementById("driver-age")) === null || _b === void 0 ? void 0 : _b.value;
    console.log(driver_name, driver_age);
    if (driver_name && driver_age) {
        console.log(driver_name, "is", driver_age, "ars old");
        // make this logbook variable global
        var driver = new Driver(driver_name, driver_age);
        if (driver.saveToDb()) {
            // hide the ui
            console.log("created");
            var details = document.getElementById("details-screen");
            details.style.display = "none";
        }
    }
}
function add_logbook_entry() {
    //TODO: get all the values from the entry boxes.
    var date_value = document.getElementById("date-input")
        .value;
    var registration_number_value = (document.getElementById("registration-input")).value;
    var odometer_start = (document.getElementById("start-odometer-input")).value;
    var odomoter_end = (document.getElementById("end-odometer-input")).value;
    var trip_details_value = (document.getElementById("trip-details-input")).value;
    var road_conditions = (document.getElementById("road-conditions-input")).value;
    var weather_conditions = (document.getElementById("weather-conditions-input")).value;
    var traffic_conditions = (document.getElementById("traffic-conditions-input")).value;
    var license_number_value = (document.getElementById("license-number-input")).value;
    var time_start = (document.getElementById("time-start-input")).value;
    var time_end = document.getElementById("time-end-input")
        .value;
    console.log(date_value, registration_number_value, odometer_start, odomoter_end, trip_details_value, road_conditions, weather_conditions, traffic_conditions, license_number_value, time_start, time_end);
    if (date_value !== "" &&
        registration_number_value !== "" &&
        odometer_start !== "" &&
        odomoter_end !== "" &&
        trip_details_value !== "" &&
        road_conditions !== "" &&
        weather_conditions !== "" &&
        traffic_conditions !== "" &&
        license_number_value !== "" &&
        time_start !== "" &&
        time_end !== "") {
        // create databse entry from this
        console.log(logbook);
        logbook.addHoursToLogBook({
            date_value: date_value,
            registration_number_value: registration_number_value,
            odometer_start: odometer_start,
            odomoter_end: odomoter_end,
            trip_details_value: trip_details_value,
            road_conditions: road_conditions,
            weather_conditions: weather_conditions,
            traffic_conditions: traffic_conditions,
            license_number_value: license_number_value,
            time_start: time_start,
            time_end: time_end,
        });
        alert("value added");
        // location.reload();
        location.replace(location.href);
    }
    else {
        // At least one variable is falsy, handle accordingly
        alert("Not all fields have been submitted. ");
    }
    // now we want to send them all to the database if they are all filled in.
    return;
}
function delete_entry(e) {
    // console.log(e);
    // TODO: delete from the database according to this e.target.id that is returned from the js event
    console.log(e.target.id);
    if (e.target.id) {
        logbook.delete_logbook_entries(e.target.id);
    }
    return;
}
