import Layout from "../components/Layout.jsx"
import { useEffect, useState } from "react"
import BookCard from "../components/BookCard.jsx"
import { getBooks, createBook, updateBook, deleteBook, getFilteredBooks, getStatsBooks } from "../services/apiBooks.js"
import BookForm from "../components/BookForm.jsx"

const Books = () => {
  const [books, setBooks] = useState([])
  const [showForm, setShowForm] = useState(false)

  const fetchBook = async () => {
    try {
      const data = await getBooks()
      setBooks(data)
    } catch (error) {
      console.log("Error fetching books:", error)
    }
  }

  const handleCreate = async (bookData) => {
    try {
      await createBook(bookData)
      fetchBook()
      setShowForm(false)
    } catch (error) {
      console.log("Error adding book:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete the book?"))
        await deleteBook(id)
      fetchBook()
    } catch (error) {
      console.log("Error erasing book:", error)
    }
  }

  const handleUpdate = async (id, bookData) => {
    try {
      await updateBook(id, bookData)
      fetchBook()
    } catch (error) {
      console.log("Error updatin book:", error)
    }
  }

  const handleFilter = async (filteredBooks) => {
    try {
      const data = await getFilteredBooks(filteredBooks)
      setBooks(data)
    } catch (error) {
      console.log("Error fetching books:", error)
    }
  }

  useEffect(() => {
    fetchBook()
  }, [])

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title">Books</h1>

          <button className="button is-primary mb-5" onClick={() => {
            setShowForm(!showForm)
          }}>{showForm ? "Cancel" : "Add book"}</button>


          {
            showForm && <BookForm onSubmit={handleCreate} />
          }


          <div className="columns is-multiline">
            {
              books.map(book => {
                return (
                  <div className="column is-one-quarter" key={book._id}>
                    <BookCard book={book} onDelete={handleDelete} onUpdate={handleUpdate} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Books