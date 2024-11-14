import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'


export function UserList() {
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    useEffect(() => {
        const fetchTotalUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/usuarios/count');
                setTotalUsuarios(response.data.total_usuarios);
            } catch (error) {
                console.error('Error al obtener el total de usuarios:', error);
            }
        };

        fetchTotalUsuarios();
    },[]);

    const [usuarios, setUsuarios] = useState([]);

    const fetchUsuarios = async () => {
        const response = await axios.get('http://localhost:5000/api/usuarios');
        setUsuarios(response.data);
        console.log(response.data);
    }

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/usuarios/${id}`);
        fetchUsuarios();
    }
    
    useEffect( () => {
        fetchUsuarios();
    },[])
  
    return (
    <div class="d-flex justify-content-center">
        <div class="card col-sm-6 p-3">
            <h1 class="text-center">Lista de Usuarios</h1>
            <h3 class="text-center mb-3">Creada por: Jhoan Laguna</h3>
            <div class="text-center mb-3 ">
                <button class="btn btn-success">
                    <Link class="text-reset text-decoration-none" to="/add">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                    Agregar Usuario
                    </Link>
                </button>
                <div class="text-center mb-3">
                    <button class="btn btn-info">
                        <Link class="text-reset text-decoration-none" to="/search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zM12.5 6.5a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"/>
                        </svg>
                        Buscar Usuario
                        </Link>
                    </button>
                </div>

            </div>
            <ul class="list-group">
                {
                    usuarios && usuarios.map(usuario => (
                        <li class="list-group-item mb-3 text-center" key={usuario.id}>
                            <div class="mb-2">
                            {usuario.nombre} - {usuario.correo} - {usuario.edad} años
                            </div>
                            <div class="btn-group" role="group" aria-label="Grupo de botones mixtos">
                                <Link class="btn btn-primary" to={`/edit/${usuario.id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                </svg>
                                Editar</Link>
                                <button class="btn btn-secondary" onClick={() => handleDelete(usuario.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon-fill" viewBox="0 0 16 16">
                                    <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
                                </svg>
                                    Eliminar</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div class="bg-info">
                <p class="text-center align-middle fs-3">Total de usuarios registrados: {totalUsuarios}</p>
            </div>
        </div>
    </div>
  )
}
