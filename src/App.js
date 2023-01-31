import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import { FaSortNumericUpAlt } from 'react-icons/fa'

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show:false, 
    message:'',
    type:'' })

 const handleSubmit = (e) => {
  e.preventDefault()
  if(!name){
   showAlert(true, 'danger', 'Please enter value.')
  }else if (name && isEditing){
    //deal with edit
  }else {
    //show alert
    const newItem = { id: new Date().getTime().toString(), title: name };
    setList([...list, newItem]);
    setName('');
  }
 }

 const showAlert = (show=false, type='', message='') => {
  setAlert({show, type, message})
 }

 return (
  <section className='section-center'>
    <form className='grocery-form' onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
      <h3>Grocery bud</h3>
      <div className='form-control'>
        <input type='text' className='grocery' placeholder='e.g. eggs' value={name} onChange={(e) => setName(e.target.value)}/>
        <button type='submit' className='submit-btn' >Submit</button>
      </div>
    </form>
    {list.length > 0 && (
      <div className='grocery-container'>
      <List items={list} />
      <button className='clear-btn'>Clear Items</button>
    </div>
    )}
    
  </section>
 )
}

export default App;

