export default interface logbook_params {
  date_value: {
    day: number;
    month: number;
    year: number;
    fullDate: Date;
  };
  registration_number_value: string;
  odometer_start: string;
  odomoter_end: string;
  trip_details_value: string;
  road_conditions: string;
  weather_conditions: string;
  traffic_conditions: string;
  license_number_value: string;
  time_start: string;
  time_end: string;
}

export interface prisma_params {
  id: string;

  date: string;
  vehicle_registration: string;
  odometer_start: number;
  odometer_end: number;

  trip_details: number;

  conditions_road: number;
  conditions_weather: number;
  conditions_traffic: number;

  licence_number: string;

  time_start: string;
  time_end: string;
  // Logbook    Logbook? @relation(fields: [logbookId], references: [id])
  // logbookId  String?  @db.ObjectId
}
