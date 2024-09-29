

function Profile() {
  // Recuperar los datos del usuario desde localStorage
  const user = JSON.parse(localStorage.getItem('user'));
console.log(user)

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Perfil del Usuario</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600">Nombre de Usuario:</label>
          <p className="bg-gray-100 p-2 rounded-md">{user?.usuarioName || 'No disponible'}</p>
        </div>
        <div>
          <label className="block text-gray-600">Correo Electrónico:</label>
          <p className="bg-gray-100 p-2 rounded-md">{user?.usuarioEmail || 'No disponible'}</p>
        </div>
        <div>
          <label className="block text-gray-600">Rol:</label>
          <p className="bg-gray-100 p-2 rounded-md">{user?.usuarioRol || 'No disponible'}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;