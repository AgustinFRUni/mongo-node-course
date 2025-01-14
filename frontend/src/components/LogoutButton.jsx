import { useState, useEffect } from 'react';

const LogoutButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica si el token existe en localStorage al cargar el componente
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Elimina el token
    setIsLoggedIn(false); // Actualiza el estado
    alert("You have been logged out."); // Mensaje de confirmación
  };

  return (
    <div className="container">
      {/* Renderiza el botón solo si isLoggedIn es true */}
      {isLoggedIn && (
        <button className="button is-danger" onClick={handleLogout}>
          Logout
        </button>
      )}

    </div>
  );
}

export default LogoutButton