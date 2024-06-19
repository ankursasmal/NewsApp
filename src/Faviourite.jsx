import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setnewsData, setnewsredirect } from './store/newsDetail';
import { useNavigate } from 'react-router-dom';

function Faviourite() {
    let navigate=useNavigate();
  let [spenner, setspenner] = useState(true)
  let dispatch = useDispatch();
 
    let [data,setData]=useState();

   useEffect(()=> {
  const storedFavorites = JSON.parse(localStorage.getItem('favoriteNews')) || [];
  // console.log(storedFavorites)
  setData(storedFavorites);
  setspenner(false);

}, []);
// console.log(data);

// for store in redx and redirect
let DataStoreRedux = (i) => {
    dispatch(setnewsredirect(data[i]));
    dispatch(setnewsData(null))
     navigate('/redirect')
  }


  return (
    <div className='d-flex  ' style={{ justifyContent: 'center',alignItems:'center', flexDirection: 'column' }}>
    <a style={{ fontSize: '4.2vw', fontWeight: '600', margin: '20px 0', alignSelf: 'center' }}>Favorite News</a>

    {data ? (spenner ? <img src='./spin.gif' style={{ width: '10vw' }} /> :
      data?.map((values,i)=>{
return (
  <div key={i} className='shadow-lg p-3 mb-5 bg-body rounded' style={{ display: 'flex', width:'90vw',alignItems: 'center', justifyContent: 'center', margin: '15 ', }}  onClick={() => DataStoreRedux(i)}  >
  <div className='m-3 ' style={{ width: '44vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}   >
    <img src={values.urlToImage} className='rounded-lg' style={{ width: '100%', height: '20vw' }} value={values.id} />
    <h1 style={{ fontWeight: '600', fontSize: '2.6vw', color: '#3495e1', wordWrap: 'break-word', width: '38vw' }}>{values.title || ""} </h1>
    <h3 style={{ fontSize: '2vw', alignSelf: 'start', wordWrap: 'break-word', width: '38vw' }}>{values.publishedAt || ""}</h3>

  </div>

  <div className='mr-10 ' id={values.id} style={{ width: '44vw' }}  >

    <h1 style={{ fontWeight: '600', width: '40vw', fontSize: '3vw', color: '#3495e1', wordWrap: 'break-word' }}>{values.author || ""} </h1>
    <h3 style={{ fontSize: '2.3vw', width: '38vw', wordWrap: 'break-word' }}>{values.description}</h3>
    <h3 style={{ fontSize: '2vw', width: '40vw', wordWrap: 'break-word' }}>{values.publishedAt || ""}</h3>
  </div>
 
</div>
        )
      })
     )

      : <a>loading....</a>}

  </div>
  )
}

export default Faviourite
