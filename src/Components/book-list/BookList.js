import BTable from "../bootstrap-common-table/BTable";
import { Button,Spinner } from "react-bootstrap";
import { useState, useEffect,useRef } from "react";
import CreateBook from "../create-book/CreateBook";

import bookAPI from "../../API/book";

import "../../styles.scss";
import "./book-list.scss";
import UpdateBook from "../update-book/UpdateBook";

const BookList = () => {
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [updateBook, setupdateBook] = useState(null);
  const inputRef = useRef(null);
  const [search,setSearch] = useState("");

  const [data, setData] = useState(null);
  useEffect(() => {
    fetchBooks()
  }, [search]);
  const fetchBooks = async () => {
    try {
      console.log(page,limit,search);
      const res = await bookAPI.books(page,limit,search);
      setData(res?.data);
    } catch (err) {
     
    } finally {
      
    }
  };
 
  const columns = [
    "Book ID",
    "Title",
    "Authors",
    "Publisher",
    "Published Date",
    "Create Date"
  ];

  const createBookPage = () => setShow(true);
  return   (
    <div>
        <CreateBook show={show} setShow={setShow} />
       {
       updateBook ? <UpdateBook show={showUpdate} setShow={setShowUpdate} data={updateBook} />
       :<></>}
      <div className="table-title">Book List</div>
      <div className="align-search-create">
          <div className="search-box">
            <input  ref={inputRef} type="text" placeholder="Search.." name="search2"/>
            <button type="button" className="btn btn-success align-button bi-search"onClick={()=>{
                        setSearch(inputRef.current.value);
                        // console.log(search+" click search "+ inputRef.current.value);
                        fetchBooks();
            }}>
            </button>
          </div>
          <div>
          <Button className="create-button" onClick={createBookPage}>
                    Create
          </Button>
          </div>
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
        <BTable data={data} columns={columns} setData={setData} setShowUpdate={setShowUpdate} setupdateBook={setupdateBook} search={search} setSearch={setSearch} setPage={setPage} setLimit={setLimit}/>
        </div>
      </div>
      )}
    </div>
  );
};

export default BookList;
