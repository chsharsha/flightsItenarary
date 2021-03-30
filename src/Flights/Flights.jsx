import React, { useState, useEffect } from "react";

import { FlightsTable, FlightFilters } from './index';

import "./Flights.css";

const uniqBy = require('lodash.uniqby');
const orderBy = require('lodash.orderby');

export const Flights = ({ flightData, currentFilters }) => {


    //Extract filter info from json
    const extractFilterVals = (fieldName) => {
        return flightData.reduce((accum, currVal) => {
            accum[currVal?.[fieldName]] = {
                checked: true,
                count: (accum?.[currVal?.[fieldName]]?.count || 0) + 1,
                name: currVal?.[fieldName],
                key: currVal?.[fieldName],
                label: currVal?.[fieldName]
            }
            return accum;
        }, {})
    }

    const initialFilters = currentFilters.reduce((accum, currVal) => {
        accum[currVal] = orderBy(Object.values(extractFilterVals(currVal)), ['name'])
        return accum;
    }, {})

    const [filters, setFilters] = useState(initialFilters)
    const [airLineItineryData, setAirLineItineryData] = useState(flightData)
    const [tableHeaders, setTableHeaders] = useState()

    const handleFilterChanges = (value, prop, filterName) => {
        const currentFilter = filters?.[filterName];
        const modifiedFilters = currentFilter.map(item => {
            if (item?.name === prop) {
                item.checked = value
            }
            return item
        })

        //Update filter checkbox status in the UI
        setFilters({ ...filters, [filterName]: modifiedFilters })

        const extractedFilters = Object.entries(filters).reduce((accum, currVal) => {
            const [key, values] = currVal;

            accum[key] = values.filter(val => val.checked === true).map(val => val?.name);
            return accum;

        }, {})


        //Update Table with new filters
        const currentFilterPoints = Object.keys(extractedFilters).reduce((accum, currVal) => {
            accum = accum.filter(airlineRec => extractedFilters?.[currVal].includes(airlineRec?.[currVal]));
            return accum;
        }, flightData)

        const uniqueFilterPoints = uniqBy(currentFilterPoints, 'id')

        setAirLineItineryData(orderBy(uniqueFilterPoints, 'id'))

        //Update Counts for filters

        const updatedFiltersWithCounts = Object.entries(filters).reduce((accum,currVal) => {
           
            const [key, values] = currVal;
            const newValues = values?.map(value => {
                return { ...value, count: uniqueFilterPoints?.filter(currVal => currVal?.[key] === value.name)?.length }
            })

            accum[key] = newValues;
            return accum

        },{})
        setFilters(updatedFiltersWithCounts)
    }



    useEffect(() => {
        const [sampleRow = {}] = airLineItineryData;
        setTableHeaders(Object.keys(sampleRow))
    }, [airLineItineryData])


    return (
        <div className="container">
            <div><FlightFilters filters={filters} setFilters={handleFilterChanges} /> </div>
            <div className="flights-table"><FlightsTable headers={tableHeaders} data={airLineItineryData} /></div>
        </div>
    )
}