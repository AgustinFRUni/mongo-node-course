import { useState } from "react"

const BookForm = ({ onSubmit }) => {
  const initialFormData = {
    title: "",
    isbn: "",
    category: "",
    price: "",
    pages: "",
    authorName: "",
    yearOfRelease: "",
    sinopsis: ""
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: name === "price" || name === "pages" || name === "yearOfRelease" ? Number(value) : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData(initialFormData)
  }

  return (
    <form onSubmit={handleSubmit} className="box">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Isbn</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="Enter book isbn"
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Category</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter book category"
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Price</label>
        <div className="control">
          <input
            className="input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter book price"
            required
            min="0"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Number of pages</label>
        <div className="control">
          <input
            className="input"
            type="number"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
            placeholder="Enter number of pages"
            required
            min="1"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Author name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            placeholder="Enter book author name"
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Year of release</label>
        <div className="control">
          <input
            className="input"
            type="number"
            name="yearOfRelease"
            value={formData.yearOfRelease}
            onChange={handleChange}
            placeholder="Enter book year of release"
            required
            min="1"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Sinopsis</label>
        <div className="control">
          <textarea
            className="textarea"
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleChange}
            placeholder="Enter book sinopsis"
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

export default BookForm