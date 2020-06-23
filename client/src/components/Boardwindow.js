import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../styles/css/boardwindow.css'
import {ReactComponent as Home} from '../styles/images/home-24px.svg';
import {ReactComponent as Add} from '../styles/images/add-24px.svg';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';


function RenderBoards ({board, setDeletedBoard}){

  async function deleteBoard() {
    try {
      await axios.delete('/api/boards/'+board._id)
      .then(()=>{
        setDeletedBoard(board._id)
      })
    } catch (error) {
      console.error(error);
    }
  }

  return <div className='board' >
    <Link to={"/api/lists/" + board._id}>
      {board.title}
    </Link>
    
    <button 
      className='board-delete-button'
      onClick={deleteBoard}
      >
        Delete Board
      </button>
    
    
  </div>
}

export default function Boardwindow() {
  const [boards, setBoards] = useState([])
  const [open, setOpen] = React.useState(false);
  const [newBoard, setNewBoard]=useState('')
  const[deletedBoard, setDeletedBoard]=useState(null) 

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault()      
    async function updateBoards() {
      try {
        console.log('posting')
        await axios.post('/api/boards/',{
          title: newBoard
        })
        .then((res) =>{
          setBoards([...boards, res.data.board]);          
        })
      } catch (error) {
        console.error(error);
      }
    }
    updateBoards()
    setNewBoard('');
    setOpen(false);

   };

  useEffect(() => {
    axios.get('/api/boards')
      .then(res => {
        setBoards(res.data);
      });
  }, []);

  if(deletedBoard){
    setBoards(boards.filter(x => x._id !== deletedBoard));
    setDeletedBoard(null)
  }

  return (
    <div className='board-container' >
      <header>
        <button>
          <Link to={"/"}>
            <Home className='navIcon'/>
          </Link>
        </button>        
        <h2>Boards</h2>
        <h2 id='brandText'>Trolle</h2>

      </header>
      <div className='boards-wrapper'>
        {boards.map((board,index)=> <RenderBoards 
          key={index}
          board={board}
          setDeletedBoard={setDeletedBoard} 
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
      Add Board
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
      setNewBoard(e.target.value)} 
      value={newBoard}
      label="Enter Board Title"
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