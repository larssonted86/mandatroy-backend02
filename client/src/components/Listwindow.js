import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Listcomponent from './Listcomponent';
import '../styles/css/listwindow.css'
import {ReactComponent as Home} from '../styles/images/home-24px.svg';
import {ReactComponent as Add} from '../styles/images/add-24px.svg';



export default function Listwindow() {
  const {bid}=useParams();
  const [lists, setLists]=useState([]) 
  const[update, setUpdate]=useState(false)
  
  useEffect(() => {
    async function getLists() {
      try {
        const res = await axios.get(`/api/lists/${bid}`);
        setLists(res.data);
        console.log(res.data)
      } catch (error) {
        console.error(error);
      }
    }
    getLists()    
  },[bid, update]);
  console.log(lists)
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
        <button>
          <Add  
            className = 'navIcon'
          />
        </button>
      </header>
      <div className='list-content'>
        {lists.map((list, index) => <Listcomponent 
          key={index} 
          list={list}
          setUpdate={setUpdate} 
        />)}  
      </div>
          
    </div>
  )
}

  //useEffect(() => {
  //  if(update){
  //  axios.get(`/api/lists/${bid}`)
  //    .then(res => {
  //      const newlists = res.data
  //      setLists(newlists);
  //    });
  //  }
  //},[bid]); 