import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import { FaSortNumericUpAlt } from 'react-icons/fa'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }else {
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
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
    setList(
      list.map((item) => {
        if (item.id === editID) {
          return { ...item, title: name };
        }
        return item;
      })
    );
    setName('');
    setEditID(null);
    setIsEditing(false);
    showAlert(true, 'success', 'Value changed');
  }else {
    showAlert(true, 'success', 'Your item added to the list')
    const newItem = { id: new Date().getTime().toString(), title: name };
    setList([...list, newItem]);
    setName('');
  }
 }

 const showAlert = (show=false, type='', message='') => {
  setAlert({show, type, message})
 }

 const clearList = () => {
  showAlert(true, 'danger', 'Empty List');
  setList([])
 }

const removeItem = (id) => {
  showAlert(true, 'danger', 'Item removed.');
  setList(list.filter((item) => item.id !== id))
}

const editItem = (id) => {
  const specificItem = list.find((item) => item.id === id);
  setIsEditing(true);
  setEditID(id);
  setName(specificItem.title);
};

useEffect(()=> {
  localStorage.setItem('list', JSON.stringify(list))
}, [list])
 
 return (
  <section className='section-center'>
  <form className='grocery-form' onSubmit={handleSubmit}>
    {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

    <h3>grocery bud</h3>
    <div className='form-control'>
      <input
        type='text'
        className='grocery'
        placeholder='e.g. eggs'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type='submit' className='submit-btn'>
        {isEditing ? 'edit' : 'submit'}
      </button>
    </div>
  </form>
  {list.length > 0 && (
    <div className='grocery-container'>
      <List items={list} removeItem={removeItem} editItem={editItem} />
      <button className='clear-btn' onClick={clearList}>
        clear items
      </button>
    </div>
  )}
</section>
 )
}

export default App;

