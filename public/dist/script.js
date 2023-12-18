var Driver = /** @class */ (function () {
    function Driver(name, age, dateCreated) {
        this.driver_age = age;
        this.driver_name = name;
        this.dateCreated = dateCreated;
    }
    Driver.prototype.addLogbook = function () { };
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
    function Logbook(dateCreated, state, driver) {
        this.dateCreated = dateCreated;
        this.state = state;
    }
    /**
     * Function that adds hours to the logbook database that .
     * @param {object} params - Logbook hours such as the odomoter, start and finish
     * @returns {boolean} returns true if logbook hours are successfully created, returns false if otherwise
     */
    Logbook.prototype.addHoursToLogBook = function (params) {
        //
        return true;
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
var element = document.querySelector("form");
element === null || element === void 0 ? void 0 : element.addEventListener("submit", function (event) {
    var _a, _b;
    event.preventDefault();
    var driver_name = (_a = document.getElementById("driver-name")) === null || _a === void 0 ? void 0 : _a.value;
    var driver_age = (_b = document.getElementById("driver-age")) === null || _b === void 0 ? void 0 : _b.value;
    if (driver_name && driver_age) {
        console.log(driver_name, "is", driver_age, " years old");
    }
});
