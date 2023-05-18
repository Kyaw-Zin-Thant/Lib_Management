import "./custom.btable.scss";


import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const BTPagination = ({data})=> {
 let [active,setActive] =useState(1);
 let items =[];
 for(let index=1;index<=Math.ceil(data/10);index++ ){
   items.push(
    <Pagination.Item key={index} active={index === active} onClick={(item)=>{
        setActive(index);
    }}>
    {index}
  </Pagination.Item>,
  );
 }
  return (
    <Pagination>{items}</Pagination>
  );

}
export default BTPagination;