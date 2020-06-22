import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';


function RenderItems ({item}){
  return <div className='item'>
          <h3 className='listtitle'>{item.title}</h3>
          {/*<h2 className = 'listcontent'>{item.cons}</h2>*/}
        </div>
}

export default function Itemwindow() {
  const {lid} = useParams();
  let [items, setItems] = useState([])

  useEffect(() => {
    axios.get(`/api/rooms/${lid}`)
      .then(res => {
        console.log(res)
        setItems(res.data);
      });
  }, [lid]);

  //useEffect(() => {
  //  axios.get('/api/items/:lid')
  //    .then(res => {
  //      setItems(res.data);
  //    });
  //}, []);

  return (
    <div className='itemsContainer' >
      {items.map((item, index) => <RenderItems key={index} item={item} />)}
    </div>
  )
}