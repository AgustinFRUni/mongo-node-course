import { useState } from "react"
import BookUpdateForm from "./BookUpdateForm"

const BookCard = ({ book, onDelete, onUpdate }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false)

  return (
    <div className="card">
      <div className="card-content">
        <h3 className="title">{book.title}</h3>
        <p className="mb-3">{book.sinopsis}</p>
        <p>Price: ${book.price}</p>
      </div>
      <footer className="card-footer">
        <button className="card-footer-item button is-warning" onClick={() => {
          setShowUpdateForm(!showUpdateForm)
        }}>{showUpdateForm ? "Cancel" : "Edit"}</button>
        <button className="card-footer-item button is-danger" onClick={() => onDelete(book._id)}>Delete</button>
      </footer>
      <div>{
        showUpdateForm && <BookUpdateForm onSubmit={onUpdate} book={book} />
      }</div>
    </div>


  )
}

export default BookCard