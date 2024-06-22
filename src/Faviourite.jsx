import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setnewsData, setnewsredirect } from './ReduxStore/newsDetail';
import { Link,json,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
function Faviourite() {
    let navigate=useNavigate();
  let [spenner, setspenner] = useState(true)
  let dispatch = useDispatch();
 let [show,setshow]=useState(null);

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

  let toggleShowMore = (i) => {
    setshow(show === i ? null : i); // toggle between index and null
  } 
   
  // remove faviourit news
  let REmoveFaviorit = (i) => {
    // data uppor direct operation kora jaaba na ja opertaion all refferance ta hoba
     const updatedFavorites = [...data];
     updatedFavorites.splice(i, 1);
     setData(updatedFavorites);
     localStorage.setItem('favoriteNews', JSON.stringify(updatedFavorites));
     toast.success('Successfully removed favorite page');
     const storedFavorites = JSON.parse(localStorage.getItem('favoriteNews')) ;

     if(storedFavorites.lenght==0){
      navigate('/')
     }
  };
  return (
<div>
<ToastContainer/>

    <div className='  d-flex ' style={{alignItems:'center',justifyContent:'space-between',marginBottom:'1vw',backgroundColor:'#af9ad6'}}>
      
      <Link to='/' style={{textDecoration:'none',fontSize:'30px',fontWeight:'600',color:'red',padding:' 1vw ', paddingLeft:'3vw'}}>News</Link>
      <div style={{display:'flex',alignContent:'center',padding:'1vw ',paddingLeft:'3vw' }}>
       
<Link to='/favorite' style={{paddingLeft:'5vw',fontSize:'22px',fontWeight:'500',color:'blue',textDecoration:'none'}}>Faviourit</Link>

      </div>
    </div>
    <div className='d-flex  ' style={{ justifyContent: 'center',alignItems:'center', flexDirection: 'column' }}>
 
    {   data ? (spenner ? <img src='./spin.gif' style={{ width: '10vw' }} /> : (
      <>
          <div className='rounded' style={{display:'flex',justifyContent:'center' ,flexWrap:'wrap',width:'100%'}} > 
          {data?.map((values, i) => {
            return (
           
              <div  key={i}  class="card" style={{width: "30rem",margin:'2vw'}}  >
                <div onClick={() => DataStoreRedux(i)} > 
              <img class="card-img-top" src={values.urlToImage} alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">{values.title || ""}</h5>
                <h5 class="card-title " style={{color:'blue'}}>{values.author || ""} </h5>
                <h5 class="card-title" style={{color:'blue'}}> {values.publishedAt || ""}</h5>

               {show===i && <p class=" btn btn-primary card-text" >{values.description}</p>}
                </div>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:'2vw'}}>
 
                <a   class="btn btn-primary mt-1" onClick={()=>toggleShowMore(i)}>Read more...</a>
                <a   class="btn btn-danger mt-1" onClick={()=>REmoveFaviorit(i)}  >Remove Favorite</a>

                </div>
               </div>
            
          
            )
          })

          }
          </div>
        </>
        )

        ) :

       <a style={{fontSize:'30px',color:'blue',marginTop:'3vw',fontWeight:'600'}}>No Favorite News Add....</a>}

  </div>
  </div>
  )
}

export default Faviourite
