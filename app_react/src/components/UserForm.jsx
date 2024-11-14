import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'

export function UserForm() {
  const { register, handleSubmit, reset } = useForm(); // Variables para formulario
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchUsuario = useCallback (async () => {
    if ( id ) {
      const response = await axios.get(`http://localhost:5000/api/usuarios/${id}`);
      reset(response.data)
    };
  },[id, reset])


  useEffect(() => {
    fetchUsuario();
  }, [fetchUsuario]);

  const onSubmit = async (data) => {
    if (id) {
        await axios.put(`http://localhost:5000/api/usuarios/${id}`, data)
    } else {
        await axios.post('http://localhost:5000/api/usuarios', data)
    }
    navigate('/');
  } 

  return (
    <div class="d-flex justify-content-center">
      <div class="card col-sm-6 p-3">
        <h1 class="text-center">Agregar/Editar Datos de Usuario:</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="mb-3">
            <label class="form-label" for="nombre">Nombre</label>
            <input type='text' {...register('nombre', {required: true})} class="form-control" id="nombre" placeholder='ej.: Luis Daniel González Martínez.'/>
            <div id="nameHelp" class="form-text">Escribe tu nombre completo (ambos nombres y apellidos).</div>
          </div>
          <div class="mb-3">
            <label class="form-label" for="correo">Correo electrónico</label>
            <input type='email' {...register('correo', {required: true})} class="form-control" id="correo" placeholder='ej.: lmartinez@gmail.com'/>
            <div id="emailHelp" class="form-text">Nunca compartiremos tu correo con otra persona.</div>
          </div>
          <div class="mb-3">
            <label class="form-label" for="edad">Edad (en números).</label>
            <input type='number' {...register('edad', {required: true})} class="form-control" id="edad" placeholder='ej.: 20.' min={0} max={150} />
          </div>
          <div class="text-center" >
            <button type='submit' class="btn btn-success btn-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                </svg>
                {id ? 'Editar' : 'Agregar'}
            </button>
            <button class="btn btn-danger btn-lg">
                <Link class="text-reset text-decoration-none" to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                </svg>
                Cancelar
                </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
