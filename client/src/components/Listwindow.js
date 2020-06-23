import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Listcomponent from './Listcomponent';
import '../styles/css/listwindow.css'
import {ReactComponent as Home} from '../styles/images/home-24px.svg';
import {ReactComponent as Add} from '../styles/images/add-24px.svg';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';



export default function Listwindow() {
  const {bid}=useParams();
  const [lists, setLists]=useState([]) 
  const[update, setUpdate]=useState(false)
  const [open, setOpen] = React.useState(false);
  const [newList, setNewList]=useState('')
  const[deletedList, setDeletedList]=useState(null) 




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault()      
    async function updateLists() {
      try {
        await axios.post(`/api/lists/${bid}`,{
          boardId: {bid},
          title: newList
        })
        .then((res) =>{
          setLists([...lists, res.data.list]);          
        })
      } catch (error) {
        console.error(error);
      }
    }
    updateLists()
    setNewList('');
    setOpen(false);
   };
  
  useEffect(() => {
    async function getLists() {
      try {
        const res = await axios.get(`/api/lists/${bid}`);
        setLists(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    getLists()
    setUpdate(false)    
  },[bid, update]);

  if(deletedList){
    setLists(lists.filter(x => x._id !== deletedList));
    setDeletedList(null)
  }

  return (    
    <div className='list-container' >
      <header>
      <button>
          <Link to={"/"}>
            <Home  
              className = 'navIcon'
              />
          </Link>
        </button>        
        <h2>Lists</h2>
        <h2 id='brandText'>Trolle</h2>
      </header>
      <div className='list-content'>
        {lists.map((list, index) => <Listcomponent 
          key={index} 
          list={list}
          update={update}
          setUpdate={setUpdate}
          setDeletedList={setDeletedList} 
        />)}  
      </div>
      <footer>
    <button
    className='dialog-button'
    onClick={handleClickOpen}
    >
      <Add  
        className = 'add-icon'
      /> 
    </button>
    <Dialog
      open={open} 
      onClose={handleClose} aria-labelledby="form-dialog-title"
    >
    <DialogTitle 
      id="form-dialog-title"
      className='dialog-title'
    >
      Add List
    </DialogTitle>
    <DialogContent
      className='dialog-content'>
    <Divider 
      className='divider' 
    />
      <p 
        id='created-text'
      >
        
      </p>
      <form
      onSubmit={onSubmit}
      >
      <TextField
      className='dialog-input'
      autoFocus
      margin="dense"
      id="descritption"
      type="text"
      fullWidth
      onChange={e => 
      setNewList(e.target.value)} 
      value={newList}
      label="Enter List Title"
      />
      </form>     
    </DialogContent>
    <DialogActions 
      className='dialog-actions'
    >
      <Button 
        className='dialog-inner-button'
        onClick={handleClose} 
        >
          Cancel
      </Button>
      <Button
        className='dialog-inner-button'
        onClick={onSubmit} 
        >
        Add
      </Button>      
      
    </DialogActions>
  </Dialog>
      </footer>   
    </div>
  )
}