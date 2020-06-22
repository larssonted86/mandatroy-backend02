import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import '../styles/css/itemcomponent.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ReactComponent as Expand} from '../styles/images/expand_more-24px.svg';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';



export default function Itemcomponent({item,setDeletedItem,setUpdate,}) {
  const [Lists, setLists]=useState([])
  const [open, setOpen] = React.useState(false);
  const iid = item._id;
  const {bid}=useParams();
  const [moveList, setMoveList]=useState('')

  async function getLists() {
    try {
      const res = await axios.get(`/api/lists/${bid}`);
      setLists(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  async function handleChange(e) {
    try {
      console.log(iid)
      setMoveList(e.target.value)
      await axios.patch('/api/items/move/'+iid,{        
        listId:e.target.value
      })
      .then(() =>{
        setOpen(false)
        setUpdate(true)
      })
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleClose = () => {
    setOpen(false);
  };

  async function deleteItem() {
    try {
      await axios.delete('/api/items/'+iid)
      .then(() =>{ 
        setOpen(false)           
      }).then(()=>{
        setDeletedItem(iid)
      })
    } catch (error) {
      console.error(error);
    }
  }

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
  }, [bid]);

  
    if(moveList){
      getLists()
      setMoveList('')  
    }    
      
  

  return <div className='item'>
    <Button 
      className='dialog-button'
      variant="outlined" 
      color="primary" 
      onClick={handleClickOpen}
      disableElevation
    >
      {item.title} 
      <Expand className='expand-icon'/>
    </Button>
    <Dialog
      open={open} 
      onClose={handleClose} aria-labelledby="form-dialog-title"
    >
    <DialogTitle 
      id="form-dialog-title"
      className='dialog-title'
    >
      {item.title}
    </DialogTitle>
    <DialogContent
      className='dialog-content'>
    <DialogContentText>
      {item.desc}      
    </DialogContentText>
    <Divider 
      className='divider' 
    />
      <p 
        id='created-text'
      >
        {item.created}
      </p>    
    <TextField
      className='dialog-input'
      autoFocus
      margin="dense"
      id="descritption"
      label="Enter Descritption"
      type="text"
      fullWidth
    />
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
        onClick={handleClose} 
        >
        Edit
      </Button>      
      <Button
        className='dialog-inner-button'
        onClick={deleteItem} 
        >Delete
      </Button>
      <FormControl className={'dialog-formcontrol'}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Move to:
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={moveList}
          onChange={handleChange}
          displayEmpty
          className={'dialog.select'}
        >
          {Lists.map((list, index) =>  
          <MenuItem
          key={index} 
          value={list._id}          >
            {list.title}
          </MenuItem>)}      
        </Select>
      </FormControl>     
    </DialogActions>
  </Dialog>
</div>
}