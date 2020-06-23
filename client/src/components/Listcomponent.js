import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Itemcomponent from './Itemcomponent';
import '../styles/css/listcomponent.css'
import {ReactComponent as Send} from '../styles/images/send-24px.svg';
import TextField from '@material-ui/core/TextField';



export default function Listcomponent({list,update,setUpdate,setDeletedList}) {
  const lid = list._id;
  const bid = list.boardId;
  const [items, setItems]=useState([])
  const [newItem, setNewItem]=useState('')
  const[deletedItem, setDeletedItem]=useState(null) 

  async function deleteList() {
    try {
      await axios.delete('/api/lists/'+list._id)
      .then(()=>{
        setDeletedList(list._id)
      })
    } catch (error) {
      console.error(error);
    }
  }


    const onSubmit = (e) => {
      e.preventDefault()      
      async function updateList() {
        try {
          await axios.post('/api/items/'+lid,{
            title: newItem,
            boardId: bid,
          })
          .then((res) =>{
            setItems([...items, res.data.item]);          
          })
        } catch (error) {
          console.error(error);
        }
      }
      updateList()
      setNewItem('');
     };   

     useEffect(() => {
      async function getItems(lid) {
        try {
          const res = await axios.get('/api/items/'+lid);
          setItems(res.data);
        } catch (error) {
          console.error(error);
        }
      }
      getItems(lid)
    },[lid,update]);

    if(deletedItem){
      setItems(items.filter(x => x._id !== deletedItem));
      setDeletedItem(null)
    }

  return (
    <div className='listcomponent-wrapper'>
      <div className='listcomponent-Header'>
      <h2>{list.title}</h2>
      <button 
      className='listcomponent-delete-button'
      onClick={deleteList}>
        X
      </button>
      </div>
      <div className='items-wrapper'> 
        {items.map((item, index) =>
        <Itemcomponent 
        key={index} 
        item={item}
        setUpdate={setUpdate}
        setDeletedItem={setDeletedItem}
      /> )}
      </div>
      <form 
        style={{width: "100%"}}
        className='list-form' 
        onSubmit = {onSubmit}>
        <TextField
          onChange={e => 
          setNewItem(e.target.value)} 
          value={newItem}
          label="Enter Item" 
          variant="filled" 
          className='list-input' 
        />
        <button className='button-add-item' type='submit'
        onClick={onSubmit}><Send  className = 'navIcon'/></button>
      </form>      
    </div>
  )
}