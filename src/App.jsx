
import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { CiSearch } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { setnewsData, setnewsredirect } from './ReduxStore/newsDetail';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
 
function App() {
  let navigate = useNavigate();
  let [spenner, setspenner] = useState(true)
  let [News, setNews] = useState([]);
  let [searchNew, setsearchNew] = useState('');
  let [date, setDate] = useState(undefined);
  let newtopic = ['all', 'india', 'World', 'Business', 'Technology', 'Health', 'Sports', 'invention', 'Entertainment', 'government', 'economy', 'education', 'environment', 'desester', 'accident', 'fashion'];
  let [topic, setTopics] = useState('World');
  let dispatch = useDispatch();
  let [addFaviourit,setFaviorit]=useState([]);
let [show,setshow]=useState(null);
   // function for destructruing data fron api
  async function Apidata() {
    try {
       let res = await fetch(`https://newsapi.org/v2/everything?q=${topic}&from=${date}&sortBy=publishedAt&apiKey=c91e0ca520a74dca95d010945dc58a67`);
      let data = await res.json();
      // console.log(data);
      //  for spinner
      setspenner(false);
      setNews(data.articles);
    }
    catch (error) {
      console.log('Data not fetch from Api due to:');
    }
  }


  // For api  date 
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day - 2}`;
  }

  // for call one time when page 1st time load
  useEffect(() => {
    Apidata();
    // user define date
    const date = new Date();
    formatDate(date)
    const formattedDate = formatDate(date);
    setDate(formattedDate);
    setTopics(searchNew);
  }, [topic, searchNew])

  // for different topics news
  let handleValueChange = (id) => {
    setTopics(newtopic[id])
  }

  // redux toolkit data store
  let DataStoreRedux = (i) => {
    dispatch(setnewsData(News[i]));
    dispatch(setnewsredirect(null));

     navigate('/redirect')
  }
  // console.log(topic)


// save faviourit news
let AddFevioritNews = (i) => {
  const favoriteNewsItem = News[i];
   const updatedFavorites = [...addFaviourit, favoriteNewsItem];
  // console.log("updatedFavorites",addFaviourit)
  setFaviorit(updatedFavorites);
  localStorage.setItem('favoriteNews', JSON.stringify(updatedFavorites));
  toast.success('Successfully added fevorite page');
   
}  
 
let toggleShowMore = (i) => {
  setshow(show === i ? null : i); // toggle between index and null
} 
 

  return (
    <>    
     <ToastContainer/>
    <div style={{width:'100vw'}} >
<div className='  d-flex ' style={{alignItems:'center',justifyContent:'space-between',marginBottom:'2vw',backgroundColor:'#af9ad6'}}>
      
      <Link to='/' style={{textDecoration:'none',fontSize:'30px',fontWeight:'600',color:'red',padding:' 1vw ', paddingLeft:'3vw'}}>News</Link>
      <div style={{display:'flex',alignContent:'center',padding:'1vw ',paddingLeft:'3vw' }}>
      <div className='d-none d-sm-block'> 
      <form className='d-flex rounded-pill align-items-center' style={{ justifyContent: 'space-between', width: '20vw',  border: '1.5px solid black', }}>
          <input type="text" placeholder='search News on your choices' className='rounded-pill' style={{ width: '17vw',backgroundColor:'#af9ad6',color:'white',  border: 'none', outline: 'none',padding:'.50vw 0' }} value={searchNew} onChange={(e) => setsearchNew(e.target.value)} />
          <button type='submit' className='  rounded-end-circle ' onClick={() => { console.log(searchNew); setTopics(searchNew) }} style={{ width: '3vw', border: 'none', outline: 'none',padding:'.50vw 0', backgroundColor: 'red', alignSelf: 'center',  }}><CiSearch style={{ fontSize: '1.3vw' }} /></button>
        </form> 
        </div>  
<Link to='/favorite' style={{paddingLeft:'5vw',fontSize:'22px',fontWeight:'500',color:'blue',textDecoration:'none'}}>Faviourit</Link>

      </div>
    </div>
    {/* hidden sm */}
<div className=' d-block d-sm-none  ' style={{ position:'absolute',left:'20vw',top:'52px',width:'100%'}}> 
    <form className='d-flex rounded-pill align-items-center' style={{ justifyContent: 'space-between', width: '60vw',  border: '1.5px solid black',alignSelf:'center' }}>
          <input type="text" placeholder='search News on your choices' className='rounded-pill' style={{ width: '50vw',  border: 'none', outline: 'none' }} value={searchNew} onChange={(e) => setsearchNew(e.target.value)} />
          <button type='submit' className='  rounded-end-circle ' onClick={() => { console.log(searchNew); setTopics(searchNew) }} style={{ width: '8vw', border: 'none', outline: 'none',padding:'.50vw 0', backgroundColor: 'red', alignSelf: 'center',  }}><CiSearch style={{ fontSize: '1.3vw' }} /></button>
        </form>  
        </div>

      <div className='d-flex container justify-center ' style={{ flexDirection: 'column', alignItems: 'center',marginTop:'30px' }}  >
         <div className='d-flex container  scrollbar' style={{ alignItems: 'center', overflowX: 'scroll', width: '90vw', marginTop: '10px', marginBottom: '30px' }}>
          <button className='btn rounded-pill ' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '0vw', cursor: 'pointer', fontSize: '2vw' }} id="0" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[0]}   > All</button>

          <button className='btn rounded-pill ' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="1" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[1]}   > india</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="2" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[2]}   > World</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="3" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[3]}   > Business</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="4" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[4]}   > Technology</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="5" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[5]}   > Health</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="6" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[6]}   > Sports</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="7" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[7]}   > invention</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="8" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[8]}   > Entertainment</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="9" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[9]}   > government</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="10" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[10]}   > economy</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="11" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[11]}   > education</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="12" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[12]}   > environment</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="13" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[13]}   > desester</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="14" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[14]}   > accident</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'blue', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="15" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[15]}   > fashion</button>

        </div>

       
{/* all news dynamically come */}

        {News ? (spenner ? <img src='./spin.gif' style={{ width: '10vw' }} /> : (<>
          <div className='rounded' style={{display:'flex',justifyContent:'center' ,flexWrap:'wrap',width:'100%'}} > 
          {News?.map((values, i) => {
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
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',margin:'5px 2vw'}}>
 
                <a   class="btn btn-primary" onClick={()=>toggleShowMore(i)}>Read more...</a>
                <a   class="btn btn-primary" onClick={()=>AddFevioritNews(i)}  >add Favorite</a>

                </div>
               </div>
            
          
            )
          })

          }
          </div>
        </>
        )

        ) : <a>loading....</a>}
      </div>

    </div>
    </>
  )
}

export default App

   