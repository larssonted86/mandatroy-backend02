import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../styles/css/boardwindow.css'
import {ReactComponent as Home} from '../styles/images/home-24px.svg';
import {ReactComponent as Add} from '../styles/images/add-24px.svg';


function RenderBoards ({board}){
  return <div className='board' >
    <Link to={"/api/lists/" + board._id}>
      {board.title}
    </Link>
  </div>
}

export default function Boardwindow() {
  const [boards, setBoards] = useState([])

  useEffect(() => {
    axios.get('/api/boards')
      .then(res => {
        setBoards(res.data);
      });
  }, []);
  return (
    <div className='board-container' >
      <header>
        <button>
          <Link to={"/"}>
            <Home className='navIcon'/>
          </Link>
        </button>        
        <h2>Boards</h2>
        <button>
          <Add className='navIcon'/>
        </button>
      </header>
      <div className='boards-wrapper'>
        {boards.map((board,index)=> <RenderBoards 
          key={index}
          board={board} 
        />)}
      </div>      
    </div>
  )
}