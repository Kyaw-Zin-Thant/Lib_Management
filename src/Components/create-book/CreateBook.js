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
import publisherAPI from '../../API/publisher'

const validationSchema = yup.object({
  title: yup.string("Write Book's Title").required("Book's Title is required"),
  authorList: yup
  .array().of(yup.string("Choose Book's Authors")).min(1)
    .required("Book's Author is required"),
  categoryList: yup
  .array().of(yup.string("Choose Book's Category")).optional(),
  languageList: yup
  .array().of(yup.string("Choose Book's Language")).min(1)
    .required("Book's Language is required"),
  translatorList: yup.array().of(yup.string("Choose Book's Translator")).optional(),
  publisher: yup
    .string("Choose Books's Publisher").required(),
  publishedDate: yup
    .date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "dd.MM.yyyy", new Date());
      return result;
    })
    .typeError("please enter a valid date")
    .required(),
  coverType: yup
    .string("Choose Book's Cover Type ").required("Book's Cover Type is required"),
  totalPage: yup
    .number("Write Book's Total Pages").required("Book's Total Page is required"),
  width: yup
    .number("Write Book's Width").required("Book's Width is required"),
  height: yup
    .number("Write Book's Height").required("Book's Heightis required"),
  summary: yup
    .string("Write Book's Summary").required("Book's Summary is required")
});

// Some dummy language data
const languageOptions = [
  {
    label: "Myanmar",
    value: "Myanmar"
  },
  {
    label: "English (US)",
    value: "English (US)"
  },
  {
    label: "Vietnam",
    value: "Vietnam"
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


const CreateBook = ({show,setShow}) => {
  const handleClose = () => setShow(false);
  const [authorOptions, setauthorOptions] = useState([]);
  const [publisherOptions, setpublisherOptions] = useState([]);
  
  useEffect(() => {
    getAuthors();
    getPublishers();
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

    //call authors api
    const getAuthors = async () => {
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

     //call publishers api
     const getPublishers = async () => {
      try {
        const publishers = [];
        const res = await publisherAPI.publishers()
       
        res.data.map(publisher=>{
          publishers.push({
            label: publisher.publisherName,
            value: publisher.id
          });
          
        });
        setpublisherOptions(publishers)
        console.log(publisherOptions+" opt");
      } catch (err) {
      //  console.log(err)
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
          console.log(touched);
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
                  errors={errors}
                  touched={touched}
                />
  
                <Field
                  className="custom-select"
                  name={"categoryList"}
                  options={categoryOptions}
                  value={categoryOptions}
                  component={CustomSelect}
                  placeholder="Select Book's Catgories"
                  isMulti={true}
                  errors={errors}
                  touched={touched}
                />
  
                <Field
                  className="custom-select"
                  name={"languageList"}
                  options={languageOptions}
                  value={languageOptions}
                  component={CustomSelect}
                  placeholder="Select Book's Languages"
                  isMulti={true}
                  errors={errors}
                  touched={touched}
                />
  
                <Field
                  className="custom-select"
                  name={"translatorList"}
                  options={translatorOptions}
                  value={translatorOptions}
                  component={CustomSelect}
                  placeholder="Select Book's Translators"
                  isMulti={true}
                  errors={errors}
                  touched={touched}
                />
  
                <Field
                  className="custom-select"
                  name={"publisher"}
                  options={publisherOptions}
                  value={publisherOptions}
                  component={CustomSelect}
                  placeholder="Select Book's Publisher"
                  isMulti={false}
                  errors={errors}
                  touched={touched}
                />
                <Field className="custom-datepicker" name="publishedDate" component={CustomDatePicker}/>

                <Field name="coverType" type="text" placeholder="Book Cover Type" />
                {errors.coverType && touched.coverType ? (
                  <div className="error">{errors.coverType}</div>
                ) : null}
                 <Field name="totalPage" type="number" placeholder="Book Total Page" />
                {errors.totalPage && touched.totalPage ? (
                  <div className="error">{errors.totalPage}</div>
                ) : null}
                 <Field name="width" type="number" placeholder="Book Width" />
                {errors.width && touched.width ? (
                  <div className="error">{errors.width}</div>
                ) : null}
                 <Field name="height" type="number" placeholder="Book Height" />
                {errors.height && touched.height ? (
                  <div className="error">{errors.height}</div>
                ) : null}
                 <Field name="summary" type="textarea" placeholder="Book Summary" />
                {errors.summary && touched.summary ? (
                  <div className="error">{errors.title}</div>
                ) : null}

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
