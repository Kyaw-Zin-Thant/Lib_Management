import "react-datepicker/dist/react-datepicker.css";
import "../../styles.scss";
import "./detail-book.scss";
import React,{useState,useEffect} from "react";
import { Field, Formik, Form } from "formik";
import CustomSelect from "../custom-dropdown-select/CustomSelect";
import { Modal,Spinner } from "react-bootstrap";
import CustomDatePicker from '../date-picker/DatePicker';
import bookAPI from '../../API/book'


const DetailBook = ({data,show,setShow}) => {
  const handleClose = () => setShow(false);
  const [book,setBook] = useState(null);
  useEffect(() => {
    fetchBooks()
  }, []);
  const fetchBooks = async () => {
    try {
      const res = await bookAPI.detailBook(data);
      setBook(res?.data);
      console.log(book);
    } catch (err) {
     console.log(err);
    } finally {
      
    }
  };
  return  (
  <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
  <Modal.Body>
  { book ?
  (
    <div>
    <div className="detail-book-container">
    <Formik>
        {({ errors, touched }) => {
          return (
            <div className="form">
              <Form>
                <span className="detail-book-span">Detail Book</span>
  
                <Field name="title" type="text" placeholder="Book Title" value={book.title} disabled />
                
  
                <Field
                  className="custom-select"
                  name={"authorList"}
                  options={book?.authorsList.map(author=> {
                    return {
                      label: author.firstName +" "+ author.lastName,
                      value: author.id
                    }
                  })}
                  defaultValue={book?.authorsList.map(author=> {
                    return {
                      label: author.firstName +" "+ author.lastName,
                      value: author.id
                    }
                  })}
                  component={CustomSelect}
                  placeholder="Select Book's Authors" 
                  isMulti={true}
                  disable={true}
                />
               <Field
                    className="custom-select"
                    name={"categoryList"}
                    options={book?.categoryList.map(category=> {
                      return {
                        label:category,
                        value: category
                      }
                    })}
                    defaultValue={book?.categoryList.map(category=> {
                      return {
                        label:category,
                        value: category
                      }
                    })}
                    component={CustomSelect}
                    placeholder="Select Book's Catgories"
                    isMulti={true}
                    disable={true}
                  />
                   <Field
                    className="custom-select"
                    name={"languageList"}
                    options={book?.categoryList.map(category=> {
                      return {
                        label:category,
                        value: category
                      }
                    })}
                    defaultValue={book?.languageList.map(lang=> {
                      return {
                        label:lang,
                        value: lang
                      }
                    })}
                    component={CustomSelect}
                    placeholder="Select Book's Languages"
                    isMulti={true}
                    disable={true}
                  />

                <Field
                    className="custom-select"
                    name={"translatorList"}
                    options={book?.translatorList.map(translator=> {
                      return {
                        label:translator,
                        value: translator
                      }
                    })}
                    defaultValue={book?.translatorList.map(translator=> {
                      return {
                        label:translator,
                        value: translator
                      }
                    })}
                    component={CustomSelect}
                    placeholder="Select Book's Translators"
                    isMulti={true}
                    disable={true}
                  />

              <Field
                    className="custom-select"
                    name={"publisher"}
                    options={book.publisher.split(",").map(pub=> {
                      return {
                        label:pub,
                        value: pub
                      }
                    })}
                    defaultValue={book.publisher.split(",").map(pub=> {
                      return {
                        label:pub,
                        value: pub
                      }
                    })}
                    component={CustomSelect}
                    placeholder="Select Book's Publisher"
                    isMulti={false}
                    disable={true}
                  />
                <Field className="custom-datepicker" name="publishedDate" component={CustomDatePicker}/>
              </Form>
            </div>
          )
        }}
      </Formik>
    </div>
  </div>
  ):(
    <div className="spinner-div">
      <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  )}
  </Modal.Body>
  </Modal>
);
}

export default DetailBook;
