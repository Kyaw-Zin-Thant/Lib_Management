import BTable from "../bootstrap-common-table/BTable";
import { Button,Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import CreateBook from "../create-book/CreateBook";

import {format} from "date-fns";
import bookAPI from "../../API/book";

import "../../styles.scss";
import "./book-list.scss";

const BookList = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const handleClose = () => setShow(false);

  const [data, setData] = useState(null);
  useEffect(() => {
    console.log("effect")
    fetchBooks()
  }, []);
  const fetchBooks = async () => {
    try {
      const res = await bookAPI.books(page,limit);
      setData(res?.data);
    } catch (err) {
     
    } finally {
      
    }
  };
 
  const columns = [
    {
      dataField: "id",
      text: "Book ID",
      sort: true
    },
    {
      dataField: "title",
      text: "Title",
      sort: true
    },
    {
      dataField: "authorsList",
      text: "Authors",
      formatter: (cell) => {
        return cell ? (
          <>
            {cell.map((label) => (
              <li>{label}</li>
            ))}
          </>
        ): (
          <>
           
          </>
        );
      }
    },
    {
      dataField: "publisher",
      text: "Publisher"
    },
    {
      dataField: "publishedDate",
      text: "Published Date",
      formatter: (cell) =>{
        console.log(cell," published date")
        return format(new Date(cell),'yyyy-MM-dd') 
      }
    },
    {
      dataField: "createdAt",
      text: "Create Date",
      formatter: (cell) =>{
        console.log(cell)
        return format(new Date(cell),'yyyy-MM-dd')
      }
    }
  ];

  const createBookPage = () => setShow(true);
  const pageChange =(e,sizePerPage)=>{
    setPage(e)
    setLimit(sizePerPage)
  }

  const sizePerPageChange =(e,sizePerPage)=>{
    setPage(e);
    setLimit(sizePerPage);
  }
  return   (
    <div>
        <CreateBook show={show} setShow={setShow} />
      <div className="table-title">Book List</div>
      <div>
          <Button className="create-button" onClick={createBookPage}>
                    Create
          </Button>
      </div>
      {!data ? ( 
    <div className="spinner-div">
      <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  ):(
        <div className="book-list">
        <div className="book-table">
        <BTable data={data} columns={columns} onPageChange={pageChange} onSizePerPageChange={sizePerPageChange}/>
        </div>
      </div>
      )}
    </div>
  );
};

export default BookList;
