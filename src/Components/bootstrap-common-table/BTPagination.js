import "./custom.btable.scss";
import Select from "react-select";
import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

import bookAPI from "../../API/book";

const BTPagination = ({data,active,setActive,setData,search,setPage,setLimit})=> {
  let options = [
    {
      label: "10/page",
      value: 10,
    },
    {
      label: "20/page",
      value: 20
    },
    {
      label: "30/page",
      value: 30
    },
    {
      label: "50/page",
      value: 50
    }
   ];
  
  const [selectedOptions,setSelectedOptions] = useState(options[0]);
  let items = [];
  for(let index=1;index<=Math.ceil(data/selectedOptions.value);index++ ){
     
  items.push(
   <Pagination.Item key={index} active={index === active} onClick={()=>{
      setActive(index);
      setPage(index);
      setLimit(selectedOptions.value);
      fetchBooks(index,selectedOptions.value);  
     
   }}>
   {index}
 </Pagination.Item>
 );
}
 const fetchBooks = async (page,limit) => {
  try {
    const res = await bookAPI.books(page,limit,search);
    if(res.data.data.length){
      setData(res?.data);
    }else{
      console.log("in else active ");
      setActive(page-1);
      fetchBooks(page-1,limit);
    }
  } catch (err) {
    console.log("on get err"+ err.message);
  } finally {
    
  }
};


 const handleSelect = (option) => {
  if (option) {
    console.log(active," on change limit count ");
    setPage(active);
    setLimit(selectedOptions.value);
   setSelectedOptions(option);
   fetchBooks(active,option.value);  
  }
};
  return ( 
    <div className="d-flex align-items-center">
      <span className="react-bootstrap-table-pagination-total">
        Showing {(selectedOptions.value)*(active-1)+1} to {(selectedOptions.value)*active} of {data} Results
      </span>
     <Pagination>
      <Pagination.First onClick={()=>{
      setActive(1);
      setPage(1);
      setLimit(selectedOptions.value);
      fetchBooks(1,selectedOptions.value);  
     
   }}/>
      <Pagination.Prev onClick={()=>{
        if(active > 1){
          setActive(active-1);
          setPage(active-1);
          setLimit(selectedOptions.value);
          fetchBooks(active-1,selectedOptions.value); 
        }else{
          setActive(1);
          setPage(1);
          setLimit(selectedOptions.value);
          fetchBooks(1,selectedOptions.value); 
        }
      }}/>
      {items}
      <Pagination.Next onClick={()=>{
        if(active != items.length && active < items.length){
          setActive(active+1);
          setPage(active+1);
          setLimit(selectedOptions.value);
          fetchBooks(active+1,selectedOptions.value);
        }
        fetchBooks(active,selectedOptions.value);
      }}/>
      <Pagination.Last onClick={()=>{
        setActive(items.length);
        setPage(items.length);
        setLimit(selectedOptions.value);
        fetchBooks(items.length,selectedOptions.value);
      }}/>
      </Pagination>
     <Select
          options={options}
          value={selectedOptions}
          onChange={(handleSelect)}
          isSearchable={false}
          isMulti={false}
          className="custom-select"
        />
    </div>
   
  );

}
export default BTPagination;