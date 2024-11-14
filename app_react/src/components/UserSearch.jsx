import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export function UserSearch() {
    const [id, setId] = useState('');
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/usuarios/${id}`);
            setUsuario(response.data);
            setError('');
        } catch (error) {
            setUsuario(null);
            setError('Usuario no encontrado');
        }
    }

    return (
        <div class="d-flex justify-content-center">
            <div class="card col-sm-6 p-3">
                <h1 class="text-center">Buscar Usuario</h1>
                <div class="mb-3">
                    <label class="form-label" for="id">ID del Usuario</label>
                    <input type='text' value={id} onChange={(e) => setId(e.target.value)} class="form-control" id="id" placeholder='ej.: 1'/>
                </div>
                <div class="text-center mb-3">
                    <button class="btn btn-primary" onClick={handleSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                        Buscar
                    </button>
                </div>
                {error && <div class="alert alert-danger text-center">{error}</div>}
                {usuario && (
                    <div>
                        <h3 class="text-center mb-3">Información del Usuario</h3>
                        <p><strong>ID:</strong> {usuario.id}</p>
                        <p><strong>Nombre:</strong> {usuario.nombre}</p>
                        <p><strong>Correo:</strong> {usuario.correo}</p>
                        <p><strong>Edad:</strong> {usuario.edad}</p>
                    </div>
                )}
                <div class="text-center mt-3">
                    <button class="btn btn-secondary">
                        <Link class="text-reset text-decoration-none" to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                            </svg>
                            Volver
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}