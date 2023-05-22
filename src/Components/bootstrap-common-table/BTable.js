import "./custom.btable.scss"

import React,{ useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import {format} from "date-fns";

import BTPagination from './BTPagination';
import DetailBook from '../detail-book/DetailBook';
import DeleteBook from "../delete-book/DeleteBook";
import bookAPI from "../../API/book"

const BTable = ({ data, columns,setData,setShowUpdate,setupdateBook,search,setPage,setLimit }) => {

  const [showdetail, setShowDetail] = useState(false);
  const [bookId, setbookId] = useState(null);
  const [deleteBookId, setdeleteBookId] = useState(null);
  const [active, setActive] = useState(1);
  const [showDelete,setshowDelete] = useState(false);
  const fetchBookDetail = async (bookId) => {
    try {
      console.log("Fecccc");
      const res = await bookAPI.detailBook(bookId);
      setupdateBook(res?.data);
      console.log(res.data);
    } catch (err) {
     console.log(err);
    } finally {
      
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                {columns.map(_col=>
                  <th>{_col}</th>
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
                        <td>{d.publisher.publisherName}</td>
                        <td>{format(new Date(d.publishedDate),'yyyy-MM-dd')}</td>
                        <td>{format(new Date(d.createdAt),'yyyy-MM-dd')}</td>
                        <td className="action">
                        <button type="button" className="btn btn-primary align-button bi-eye" value={d.id} onClick={ d=>{
                           setbookId(d.target.value)
                           setShowDetail(true)
                       }} ></button>
                        <button type="button" className="btn btn-success align-button bi-pencil-square" value={d.id} onClick={d=>{
                          fetchBookDetail(d.target.value)
                          setShowUpdate(true);
                        }}></button>
                        <button type="button" className="btn btn-danger align-button bi-trash" value={d.id} onClick={d=>{
                           setdeleteBookId(d.target.value);
                           setshowDelete(true)
                        }}></button>
                        </td>
                    </tr>
                )}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="custom-pagination">
        <BTPagination data={data.totalBooks} active={active} setActive={setActive} setData={setData} search={search} setPage={setPage}setLimit={setLimit}/>  
      </div>
     {bookId ?
      <DetailBook data={bookId} show={showdetail} setShow={setbookId} />
      :<></>
     }
     {showDelete ? <DeleteBook show={showDelete} setShow={setshowDelete} data={deleteBookId}/> :<></>}
    </div>
  )
};

export default BTable;
