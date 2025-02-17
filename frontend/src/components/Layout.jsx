import { Link } from "react-router-dom"

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            {/* a -> recarga la página || Link -> SPA */}
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/books" className="navbar-item">Books</Link>
            <Link to="/stats" className="navbar-item">Stats</Link>
            <Link to="/users" className="navbar-item">Users</Link>
          </div>
        </nav>
      </header>
      <main style={{ minHeight: "100vh" }} className="">
        {
          children
        }
      </main>
      <footer className="p-5 has-background-grey-dark has-text-white-ter">
        <div className="content has-text-centered">
          <p>
            Sitio desarrollado por Rios Agustin
          </p>
        </div>
      </footer>
    </>
  )
}

export default Layout