import React from "react"
import {CheckboxList} from "./FilterCheckBox"
import "./Flights.css"

export const FlightFilters = ({
    filters,
    setFilters
}) => {


    return (
        <div className="filters-container">
            <h3>Filters</h3>
            {Object.entries(filters).map((item, index)=> {
                const [key, value] = item;
                return (
                    <CheckboxList key={index} checkBoxArr={value} title={key} setFilters={setFilters} />
                )
            })}
          
        </div>
    )
}

