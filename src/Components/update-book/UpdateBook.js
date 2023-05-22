import "react-datepicker/dist/react-datepicker.css";
import "../../styles.scss";
import "./update-book.scss";
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


const UpdateBook = ({show,setShow,data}) => {
  const handleClose = () => setShow(false);
  const [authorOptions, setauthorOptions] = useState([]);
  const [publisherOptions, setpublisherOptions] = useState([]);
  
 
  useEffect(() => {
    getAuthors();
    getPublishers();
  }, []);

  //call create book api
  const updateBook = async (values,bookId) => {
    try {
      console.log("update book");
       await bookAPI.updateBook(values,bookId);
      handleClose();
      window.location.reload(false);
    } catch (err) {
      console.log("update book error");
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
          title: data.title || "",
          authorList: data.authorsList.length ?  data.authorsList.map(author=>author.id) : [],
          categoryList: data.categoryList || [],
          languageList: data.languageList || [],
          translatorList: data.translatorList || [],
          publisher: data.publisher.id || "",
          publishedDate: data.publishedDate || "",
          coverType: data.coverType || "",
          totalPage: data.totalPage || 0,
          summary: data.summary || "",
          width: data.width || 0,
          height: data.height || 0,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          updateBook(values,data.id)
         
        }}
      >
        {({ errors, touched }) => {
          console.log(errors);
          return (
            <div className="form">
              <Form>
                <span className="create-book-span">Update A Book</span>
  
                <Field name="title" type="text" placeholder="Book Title"/>
                {errors.title && touched.title ? (
                  <div className="error">{errors.title}</div>
                ) : null}
  
                <Field
                  className="custom-select"
                  name={"authorList"}
                  options={authorOptions?authorOptions:[]}
                  value={authorOptions?authorOptions:[]}
                  defaultValue={data?.authorsList.map(author=> {
                    return {
                      label: author.firstName +" "+ author.lastName,
                      value: author.id
                    }
                  })}
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
                  defaultValue={data?.categoryList.map(category=> {
                    return {
                      label:category,
                      value: category
                    }
                  })}
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
                  defaultValue={data?.languageList.map(lang=> {
                    return {
                      label:lang,
                      value: lang
                    }
                  })}
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
                  defaultValue={data?.translatorList.map(translator=> {
                    return {
                      label:translator,
                      value: translator
                    }
                  })}
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
                  defaultValue={data.publisher.publisherName.split(",").map(pub=> {
                    return {
                      label:pub,
                      value: data.publisher.id
                    }
                  })}
                  component={CustomSelect}
                  placeholder="Select Book's Publisher"
                  isMulti={false}
                  errors={errors}
                  touched={touched}
                />
               
                <Field className="custom-datepicker" name="publishedDate" component={CustomDatePicker} defaultDate={data.publishedDate}/>

                <Field name="coverType" type="text" placeholder="Book Cover Type" />
                {errors.coverType && touched.coverType ? (
                  <div className="error">{errors.coverType}</div>
                ) : null}
                 <Field name="totalPage" type="number" placeholder="Book Total Page"/>
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
                <Button className="create-button" type="submit">Update</Button>
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

export default UpdateBook;
