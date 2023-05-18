import "./custom.btable.scss"

import React,{ useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import {format} from "date-fns";

import BTPagination from './BTPagination';
import DetailBook from '../detail-book/DetailBook';

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing {from} to {to} of {size} Results
  </span>
);

const BTable = ({ data, columns,onPageChange,onSizePerPageChange }) => {

  const [showdetail, setShowDetail] = useState(false);
  const [bookId, setbookId] = useState(null);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                {columns.map(_col=>
                  <th>{_col.text}</th>
                )}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {data.data.map(d=>
                    <tr data-item={d}>
                        <td>{d.id}</td>
                        <td>{d.title}</td>
                        <td>
                          <ul>
                          {d.authorsList.map(_author=>
                            <li>{_author.firstName}</li>
                            )}
                            </ul>
                        </td>
                        <td>{d.publisher}</td>
                        <td>{format(new Date(d.publishedDate),'yyyy-MM-dd')}</td>
                        <td>{format(new Date(d.createdAt),'yyyy-MM-dd')}</td>
                        <td className="action">
                        <button type="button" className="btn btn-primary align-button bi-eye" value={d.id} onClick={ d=>{
                          console.log(d.target.value);
                          setbookId(d.target.value)
                           setShowDetail(true)
                       }} ></button>
                        <button type="button" className="btn btn-success align-button bi-pencil-square"></button>
                        <button type="button" className="btn btn-danger align-button bi-trash"></button>
                        </td>
                    </tr>
                )}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="custom-pagination">
        <BTPagination data={data.totalBooks}/>  
      </div>
     {bookId ?
      <DetailBook data={bookId} show={showdetail} setShow={setbookId} />
      :<></>
     }
    </div>
  )
};

export default BTable;
