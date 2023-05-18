import React, { useEffect, useState } from "react";
import "../../styles.scss";
import "./custom-select.scss";
import Select from "react-select";

const CustomSelect = ({ options, isMulti, placeholder,field,form,defaultValue,disable}) => {
  const [selectedOptions, setSelectedOptions] = useState();
  const[isDisabled,setIsDisabled] = useState(false)
  const handleSelect = (option) => {
    if (option) {
     isMulti ? form.setFieldValue(field.name,option.map((op)=>op.value)) : form.setFieldValue(field.name,option.value)
     setSelectedOptions(option);
    }
  };
  useEffect(()=>{
    setSelectedOptions(defaultValue)
    setIsDisabled(disable)
  })
  return (
    <div className="app">
      <div className="dropdown-container">
        <Select
          name ={field.name}
          options={options}
          placeholder={placeholder}
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti={isMulti}
          className="custom-select"
          isDisabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default CustomSelect;
