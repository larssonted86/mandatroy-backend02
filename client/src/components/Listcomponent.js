import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Itemcomponent from './Itemcomponent';
import '../styles/css/listcomponent.css'
import {ReactComponent as Send} from '../styles/images/send-24px.svg';
import TextField from '@material-ui/core/TextField';



export default function Listcomponent({list,setUpdate}) {
  const lid = list._id;
  const [items, setItems]=useState([])
  const [newItem, setNewItem]=useState('')
  const[deletedItem, setDeletedItem]=useState(null) 
  


    const onSubmit = (e) => {
      e.preventDefault()      
      async function updateList() {
        try {
          await axios.post('/api/items/'+lid,{
            title: newItem
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
      
    },[]);

    if(deletedItem){
      setItems(items.filter(x => x._id !== deletedItem));
      setDeletedItem(null)
    }   

    //if(movedItem){
    //  async function getItems(lid) {
    //    try {
    //      const res = await axios.get('/api/items/'+lid);
    //      setItems(res.data);
    //    } catch (error) {
    //      console.error(error);
    //    }
    //  }
    //  getItems(lid) 
    //  setMovedItem(false)
    //}

      console.log('render',lid, items)
  return (
    <div className='listcomponent-wrapper'>
      <h2>{list.title}</h2>
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
        <button className='button-add-list' type='submit'
        onClick={onSubmit}><Send  className = 'navIcon'/></button>
      </form>      
    </div>
  )
}

//axios.post('/api/items/'+lid,{
      //  title: item
      //});
      //setItem('')