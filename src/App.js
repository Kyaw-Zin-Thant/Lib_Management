import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles.scss";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import BookList from "./Components/book-list/BookList";
import CreateBook from "./Components/create-book/CreateBook";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book" element={<CreateBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
