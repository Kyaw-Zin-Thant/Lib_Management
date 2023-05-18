import "react-datepicker/dist/react-datepicker.css";
import "../../styles.scss";
import "./create-book.scss";
import React,{useState,useEffect} from "react";
import * as yup from "yup";
import { Field, Formik, Form } from "formik";
import parse from "date-fns/parse";
import CustomSelect from "../custom-dropdown-select/CustomSelect";
import { Modal,Button } from "react-bootstrap";
import CustomDatePicker from '../date-picker/DatePicker';
import authorAPI from '../../API/author'
import bookAPI from '../../API/book'

const validationSchema = yup.object({
  title: yup.string("Write Book's Title").required("Book's Title is required"),
  authorList: yup
  .array().of(yup.string("Choose Book's Authors"))
    .required("Book's Author is required"),
  categoryList: yup
  .array().of(yup.string("Choose Book's Category")).optional(),
  languageList: yup
  .array().of(yup.string("Choose Book's Language"))
    .required("Book's Language is required"),
  translatorList: yup.array().of(yup.string("Choose Book's Translator")).optional(),
  publisher: yup
    .string("Choose Books's Publisher").optional(),
  publishedDate: yup
    .date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "dd.MM.yyyy", new Date());
      return result;
    })
    .typeError("please enter a valid date").optional(),
    // .required(),
  coverType: yup
    .string("Choose Book's Cover Type ").optional(),
    // .required("Book's Cover Type is required"),
  totalPage: yup
    .number("Write Book's Total Pages").optional(),
    // .required("Book's Total Page is required"),
  summary: yup
    .number("Write Book's Total Pages").optional()
    // .required("Book's Total Page is required")
});

// Some dummy language data
const languageOptions = [
  {
    label: "Myanmar",
    value: "mm-MM"
  },
  {
    label: "English (US)",
    value: "en-US"
  },
  {
    label: "Vietnam",
    value: "vn-VN"
  }
];
// Some dummy category data
const categoryOptions = [
  {
    label: "Fiction",
    value: "Fiction"
  },
  {
    label: "Potery",
    value: "Potery"
  },
  {
    label: "Fantasy",
    value: "Fantasy"
  }
];
// Some dummy author data
// let authorOptions = [
// ];
// Some dummy translator data
const translatorOptions = [
  {
    label: "Zin",
    value: "Zin"
  },
  {
    label: "Vatsyayana",
    value: "Vatsyayana"
  },
  {
    label: "Richard Burton",
    value: "Richard Burton"
  }
];

// Some dummy publisher data
const publisherOptions = [
  {
    label: "Standard Publications Incorporated",
    value: "Standard Publications Incorporated"
  },
  {
    label: "Inner Traditions / Bear & Co",
    value: "Inner Traditions / Bear & Co"
  },
  {
    label: "ReadHowYouWant.com",
    value: "ReadHowYouWant.com"
  }
];
const CreateBook = ({show,setShow}) => {
  const handleClose = () => setShow(false);
  const [authorOptions, setauthorOptions] = useState([]);
  
  useEffect(() => {
    getAuthors()
  }, []);
  //call create book api
  const createBook = async (values) => {
    try {
       await bookAPI.createBook(values);
      handleClose();
      window.location.reload(false);
    } catch (err) {
     
    } 
  };

    //call create book api
    const getAuthors = async (values) => {
      try {
        const authors = [];
        const res = await authorAPI.authors();

        res.data.map(author=>{
          authors.push({
            label: author.firstName +" "+ author.lastName,
            value: author.id
          });
          
        });
        setauthorOptions(authors)
      } catch (err) {
       console.log(err)
      } 
    };


  return (
  <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
  <Modal.Body>
  <div>
    <div className="create-book-container">
      <Formik
        initialValues={{
          title: "",
          authorList: [],
          categoryList: [],
          languageList: [],
          translatorList: [],
          publisher: "",
          publishedDate: "01-01-1995",
          coverType: "",
          totalPage: 0,
          summary: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values)
          values.width =100;
          values.height =100;
          createBook(values)
         
        }}
      >
        {({ errors, touched }) => {
          console.log(errors);
          return (
            <div className="form">
              <Form>
                <span className="create-book-span">Create A Book</span>
  
                <Field name="title" type="text" placeholder="Book Title" />
                {errors.title && touched.title ? (
                  <div className="error">{errors.title}</div>
                ) : null}
  
                <Field
                  className="custom-select"
                  name={"authorList"}
                  options={authorOptions?authorOptions:[]}
                  value={authorOptions?authorOptions:[]}
                  component={CustomSelect}
                  placeholder="Select Book's Authors"
                  isMulti={true}
                />
                {errors.authorList ? (
                  <div className="error">{errors.author}</div>
                ) : null}
  
                <Field
                  className="custom-select"
                  name={"categoryList"}
                  options={categoryOptions}
                  value={categoryOptions}
                  component={CustomSelect}
                  placeholder="Select Book's Catgories"
                  isMulti={true}
                />
  
                <Field
                  className="custom-select"
                  name={"languageList"}
                  options={languageOptions}
                  value={languageOptions}
                  component={CustomSelect}
                  placeholder="Select Book's Languages"
                  isMulti={true}
                />
                {errors.languageList ? (
                  <div className="error">{errors.language}</div>
                ) : null}
  
                <Field
                  className="custom-select"
                  name={"translatorList"}
                  options={translatorOptions}
                  value={translatorOptions}
                  component={CustomSelect}
                  placeholder="Select Book's Translators"
                  isMulti={true}
                />
  
                <Field
                  className="custom-select"
                  name={"publisher"}
                  options={publisherOptions}
                  value={publisherOptions}
                  component={CustomSelect}
                  placeholder="Select Book's Publisher"
                  isMulti={false}
                />
                {errors.publisher && touched.publisher ? (
                  <div className="error">{errors.publisher}</div>
                ) : null}
                <Field className="custom-datepicker" name="publishedDate" component={CustomDatePicker}/>

                <Button className="create-button" type="submit">Create</Button>
              </Form>
            </div>
          )
        }}
      </Formik>
    </div>
  </div>
  </Modal.Body>
  </Modal>
);
 }

export default CreateBook;
