import { Request, Response, request } from "express";
import { PrismaClient } from "@prisma/client";
import logbook_params from "./public/logbookParams";

const prisma = new PrismaClient();
const express = require("express");
import * as path from "path";

const app = express();
const port = 3000;

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.text());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.get("/fetch_drivers", (req: Request, res: Response) => {
  const get_drivers = prisma.driver.findMany({});

  res.json(get_drivers);
});

app.post("/createLogBook", async (req: Request, res: Response) => {
  res.send({ ok: "ok" });
});

app.get("/logbook_entries", async (req: Request, res: Response) => {
  const fetch_entries = await prisma.logbook_entry.findMany();

  res.json(fetch_entries);
});

app.post("/add_hours_to_log_book", async (req: Request, res: Response) => {
  const {
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
  }: logbook_params = JSON.parse(req.body);

  const add_hours = await prisma.logbook_entry.create({
    data: {
      date: date_value,
      vehicle_registration: registration_number_value,
      odometer_end: parseInt(odomoter_end),
      odometer_start: parseInt(odometer_start),
      trip_details: trip_details_value,
      conditions_road: road_conditions,
      conditions_weather: weather_conditions,
      conditions_traffic: traffic_conditions,
      licence_number: license_number_value,
      time_start: time_start,
      time_end: time_end,
    },
  });
  console.log(add_hours);

  res.json(add_hours);
});

app.post("/createDriver", async (request: Request, response: Response) => {
  const { driver, driver_age }: { driver: string; driver_age: string } =
    JSON.parse(request.body);
  const create_driver = await prisma.driver.create({
    data: {
      driver_name: driver,
      driver_age: parseInt(driver_age),
    },
  });

  console.log(create_driver);

  response.json(create_driver);
});
/**
 * function to return the driver logbook details.
 */

app.delete("/delete_entry", async (req: Request, res: Response) => {
  const { id }: { id: string } = JSON.parse(req.body);

  console.log(id);

  try {
    const delete_entry = await prisma.logbook_entry.delete({
      where: {
        id: id,
      },
    });

    res.json({ delete: "delte request received" });
  } catch {
    console.log("Value does not exist");
  }

  // res.json(delete_entry);
});

app.post("/", (req: Request, res: Response) => {
  res.send("got a post request");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
