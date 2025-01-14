import { getStatsBooks } from "../services/apiBooks.js"
import Layout from "../components/Layout.jsx"
import { useEffect, useState } from "react"

const Stats = () => {
  const [stats, setStats] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const fetchStats = async () => {
    try {
      const dataStats = await getStatsBooks()
      setStats(dataStats)
    } catch (error) {
      console.error(error)
    }
  }
  console.log(stats)

  useEffect(() => {
    fetchStats()
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [])

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title is-4">Book Stats</h1>
          {
            stats && stats.length > 0 ? (
              stats.map((stat, index) => (
                <div key={index} className="box">
                  <p><strong >Category: {stat.category} </strong></p>
                  <p><strong>Average price: ${stat.averagePrice.toFixed(2)}  </strong></p>
                  <p><strong>Average pages: {stat.averagePages}</strong></p>
                  <p><strong>Book count: {stat.bookCount}</strong></p>
                </div>
              ))
            ) : <p>No data available</p>
          }
          {!isLoggedIn && (
            <p>User not logged in or session expired</p>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default Stats