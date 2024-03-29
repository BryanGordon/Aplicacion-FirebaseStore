import React,{useState,useEffect} from "react";
import {store} from './firebaseConfig'

function App() {

  const[idUsuario,setIdUsuario]=useState('')
  const[edicion,setEdicion]=useState(null)
  const[nombre,setNombre]=useState('')
  const[telefono,setTelefono]=useState('')
  const[usuarios,setUsuarios]=useState([])
  const[msgError,setMsgError]=useState('')

  useEffect(()=>{
    
    const getUsuarios=async()=>{
      const {docs}=await store.collection('contactos').get()
      const array=docs.map(item=>({id:item.id,...item.data()}))
      setUsuarios(array)
    }
    getUsuarios()
  },[])

  const setUsuario= async (e)=>{
    e.preventDefault()

    if(!nombre.trim()){
      setMsgError('El campo nombre esta vacio')
    }
    if(!telefono.trim()){
      setMsgError('El campo telefono esta vacio')
    }
    const usuario={
      nombre:nombre,
      telefono:telefono
    }
    try{
      const data=await store.collection('contactos').add(usuario)
      const {docs}=await store.collection('contactos').get()
      const array=docs.map(item=>({id:item.id,...item.data()}))
      setUsuarios(array)
      alert("Usuario añadido")
      
    }catch(e){
      console.log(e)
    }
    setNombre('')
    setTelefono('')
  
  }

  const BorrarUsuario=async (id)=>{
    try{
      await store.collection('contactos').doc(id).delete()
      const {docs}=await store.collection('contactos').get()
      const array=docs.map(item=>({id:item.id,...item.data()}))
      setUsuarios(array)
      alert('Usuario eliminado')
    }
    catch(e){
      console.log(e)
    }
  }

  const SeleccionarUsuario= async (id)=>{
 
    try{
      const data=await store.collection('contactos').doc(id).get()
      const usuario=data.data()
      setNombre(usuario.nombre)
      setTelefono(usuario.telefono) 
      setIdUsuario(usuario.id)
      setEdicion(true)
    }
    catch(e){
      console.log(e)
    }

  }

  const ActualizarUsuario= async(e)=>{

    e.preventDefault()

    if(!nombre.trim()){
      setMsgError('El campo nombre esta vacio')
    }
    if(!telefono.trim()){
      setMsgError('El campo telefono esta vacio')
    }
    const usuarioUpdate={
      nombre:nombre,
      telefono:telefono
    }

    try{
      await store.collection('contactos').doc(idUsuario).set(usuarioUpdate)
      const {docs}=await store.collection('contactos').get()
      const array=docs.map(item=>({id:item.id,...item.data()}))
      setUsuarios(array)
      alert("Usuario actualizado")
      
    }catch(e){
      console.log(e)
    }
    setNombre('')
    setTelefono('')
    setIdUsuario('')
    setEdicion(false)
  
  }
  

  return (
    <div className='container'>
      <div className='row'>
        <div className="col">
          <h2>Formulario de usuarios</h2>
          <form className='form-group' onSubmit={edicion? ActualizarUsuario: setUsuario}>
            <input type="text"
              value={nombre} 
              placeholder="Introduce el nombre"
              className='form-control'
              onChange={(e)=>{setNombre(e.target.value)}}
            />
            <input type="text"
              value={telefono}
              placeholder="Introduce el telefono"
              className='form-control mt-3'
              onChange={(e)=>{setTelefono(e.target.value)}}
            />
            {
              edicion?
              (
                <input type="submit" 
                  value='Editar'
                  className='btn btn-dark btn-block mt-4 mb-4' 
              />
              )
              :
              (
                <input type="submit" 
                  value='Registrar'
                  className='btn btn-dark btn-block mt-4 mb-4' 
            />
              )
            }
            
          </form>
          {
            msgError?
            (
              <div>
                {msgError}
              </div>
            )
            :
            (
              <span></span>
            )
          }
        </div>
        <div className="col">
          <h2>Lista de contactos</h2>
          <ul className='list-group'>
            {
            usuarios.length !==0?
            (
              usuarios.map(item=>(
                <li key={item.id}
                  className='list-group-item'
                >
                  <button onClick={(id)=>{BorrarUsuario(item.id)}} className='btn btn-danger float-right'>Borrar</button>
                  <button onClick={(id)=>{SeleccionarUsuario(item.id)}} className='btn btn-info float-right mr-2'>Actualizar</button>
                  <label>Nombre: {item.nombre}</label>
                  <br/>
                  <label>Telefono: {item.telefono}</label>
                </li>
              ))
            )
            :
            (
              <span>
                No existen usuarios
              </span>
            )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}


export default App;
