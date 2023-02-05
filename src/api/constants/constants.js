export const LOCATIONS_API_URL = "https://api.skypicker.com/locations?term="
export const FLIGHTS_API_URL = "https://api.skypicker.com/flights?v=3&partner=skypicker&locale=en&fly_from="
export const dateFormater = new Intl.DateTimeFormat("en-CA", {
    dateStyle: "short",
  })