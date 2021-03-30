import React from "react";
import "./Flights.css"

export const FlightsTable = ({headers=[], data=[]}) => {
    return(
        <div>
            <h4>Results</h4>
            <table className="table-comp">
                <thead>
                    <tr>
                {headers.map((item, index)=>{
                    return <th key={index}>{item}</th>
                })}
                </tr>
                </thead>
                <tbody>
                    {data.map((item,index)=>{

                        return (
                            <tr key={index}>
                                {         Object.values(item).map((val, ind) => {
                            return <td key={ind}>{val}</td>
                        })}
                                </tr>
                        )
               
                    })}
               </tbody>

            </table>
        </div>
    )
}


