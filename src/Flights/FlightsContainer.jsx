import React from "react";
import { itineraries1 } from "../TestData/itineraries1"
import { Flights } from "./Flights"

let currentFilters = ["airline", "stops"]

export const FlightsContainer = () => {
    return (
        <Flights flightData={itineraries1} currentFilters={currentFilters} />
    )

}