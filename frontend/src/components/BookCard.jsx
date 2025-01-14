const BookCard = ({ book, onDelete }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h3 className="title">{book.title}</h3>
        <p className="mb-3">{book.sinopsis}</p>
        <p>Price: ${book.price}</p>
      </div>
      <footer className="card-footer">
        <button className="card-footer-item button is-warning">Edit</button>
        <button className="card-footer-item button is-danger" onClick={() => onDelete(book._id)}>Delete</button>
      </footer>
    </div>
  )
}

export default BookCard