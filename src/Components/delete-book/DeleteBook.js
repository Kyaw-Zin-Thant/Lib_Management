import "../../styles.scss";
import "./delete-book.scss";
import { Modal } from "react-bootstrap";

import bookAPI from "../../API/book";


const DeleteBook = ({show,setShow,data})=>{

    
  const handleClose = () => setShow(false);
    return (

    <Modal size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        >
             <Modal.Body>
             <div className="modal-body">
                <p>Are you sure you want to delete?</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" id="close-modal" onClick={()=>{
                    handleClose();
                }}>No</button>
                <button type="button" className="btn btn-danger" onClick={()=>{
                    bookAPI.deleteBook(data)
                }}>Yes</button>
            </div>
             </Modal.Body>
                
    </Modal>
       
    );
}
export default DeleteBook;