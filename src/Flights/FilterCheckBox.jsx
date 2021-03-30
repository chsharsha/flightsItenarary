import React from "react";
import "./Flights.css";
const startCase = require('lodash.startcase');
const Checkbox = ({ type = "checkbox", name, checked = false, onChange }) => {
    return (
        <input type={type} name={name} checked={checked} onChange={onChange} />
    );
};

export const CheckboxList = ({ checkBoxArr, title, setFilters }) => {


    const handleChange = (event, name, title) => {
        setFilters(event.target.checked, name, title)
    };

    return (
        <div>
            <h4>{startCase(title)} </h4>
            <br />
            {checkBoxArr.map(item => (
                <div key={item.key}>

                    <label>
                        <div className="checkbox-container">
                            <div className="chkbox-element"><Checkbox
                                name={item.name}
                                checked={item.checked}
                                onChange={(event) => handleChange(event, item.name, title)}
                            /></div>
                            <div className="chkbox-label">{item.name}</div>
                            <div className="count-variable">{item.count}</div>
                        </div>

                    </label>
                </div>

            ))}
            <hr></hr>
        </div>
    );
};


