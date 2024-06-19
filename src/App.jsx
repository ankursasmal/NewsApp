
import React, { useEffect, useState } from 'react'
import './App.css'
import { CiSearch } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { setnewsData, setnewsredirect } from './store/newsDetail';
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
  // function for destructruing data fron api
  async function Apidata() {
    try {
      let res = await fetch(`https://newsapi.org/v2/everything?q=${topic}&from=${date}&sortBy=publishedAt&apiKey=66e0bb9165764361926426353fe3c7c3`);
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
    return `${year}-${month}-${day - 1}`;
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
  toast.success('Successfully added fevorite page')
}  
 
 
 

  return (
    <>    
     <ToastContainer/>
    <div className='container ' >


      <div className='d-flex  justify-center ' style={{ flexDirection: 'column', alignItems: 'center' }}  >
        <a style={{ fontSize: '4.2vw', fontWeight: '600', margin: '20px 0' }}>Daily News</a>
        <div className='d-flex  scrollbar' style={{ alignItems: 'center', overflowX: 'scroll', width: '90vw', marginTop: '10px', marginBottom: '30px' }}>
          <button className='btn rounded-pill ' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '0vw', cursor: 'pointer', fontSize: '2vw' }} id="0" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[0]}   > All</button>

          <button className='btn rounded-pill ' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="1" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[1]}   > india</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="2" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[2]}   > World</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="3" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[3]}   > Business</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="4" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[4]}   > Technology</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="5" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[5]}   > Health</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="6" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[6]}   > Sports</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="7" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[7]}   > invention</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="8" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[8]}   > Entertainment</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="9" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[9]}   > government</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="10" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[10]}   > economy</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="11" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[11]}   > education</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="12" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[12]}   > environment</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="13" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[13]}   > desester</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="14" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[14]}   > accident</button>
          <button className='btn rounded-pill' style={{ backgroundColor: 'gray', color: 'white', marginLeft: '2vw', cursor: 'pointer', fontSize: '2vw' }} id="15" onClick={(e) => handleValueChange(e.target.id)} value={newtopic[15]}   > fashion</button>

        </div>

        {/* favorite section */}

<div style={{width:'100%', display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap', marginBottom: '3vw',}}> 
        <form className='d-flex rounded-pill align-items-center' style={{ justifyContent: 'space-between', width: '60vw', marginTop: '3vw',  border: '1.5px solid black',marginBottom:'3vw' }}>
          <input type="text" placeholder='search News on your choices' className='rounded-pill' style={{ padding: '1vw 2vw', width: '50vw', fontSize: '1.8vw', border: 'none', outline: 'none' }} value={searchNew} onChange={(e) => setsearchNew(e.target.value)} />
          <button type='submit' onClick={() => { console.log(searchNew); setTopics(searchNew) }} style={{ width: '8vw', border: 'none', outline: 'none', backgroundColor: 'white', alignSelf: 'center', marginRight: '2vw' }}><CiSearch style={{ fontSize: '3vw' }} /></button>
        </form>
        <Link to='/favorite' className='rounded-pill' style={{ textDecoration:'none',marginLeft:'3vw', padding:'3px 6px',wordWrap: 'break-word',fontSize:'2.3vw',border:'1.3px solid black',backgroundColor:'#2a71eb',color:'white'}}>Show Fevorite News</Link>
        </div>

{/* all news dynamically come */}

        {News ? (spenner ? <img src='./spin.gif' style={{ width: '10vw' }} /> : (<>
          {News?.map((values, i) => {
            return (
              <div key={i} className='shadow-lg p-3 mb-5 bg-body rounded' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '15 20', }}    >
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',}} onClick={() => DataStoreRedux(i)}> 
                <div className='m-3 ' style={{ width: '40vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}   >
                  <img src={values.urlToImage} className='rounded-lg' style={{ width: '100%', height: '20vw' }} value={values.id} />
                  <h1 style={{ fontWeight: '600', fontSize: '2.6vw', color: '#3495e1', wordWrap: 'break-word', width: '38vw' }}>{values.title || ""} </h1>
                  <h3 style={{ fontSize: '2vw', alignSelf: 'start', wordWrap: 'break-word', width: '38vw' }}>{values.publishedAt || ""}</h3>

                </div>

                <div className='ml-10 ' id={values.id} style={{ width: '40vw' }}   >

                  <h1 style={{ fontWeight: '600', width: '40vw', fontSize: '3vw', color: '#3495e1', wordWrap: 'break-word' }}>{values.author || ""} </h1>
                  <h3 style={{ fontSize: '2.3vw', width: '38vw', wordWrap: 'break-word' }}>{values.description}</h3>
                  <h3 style={{ fontSize: '2vw', width: '40vw', wordWrap: 'break-word' }}>{values.publishedAt || ""}</h3>
                </div>
                </div>
                <button className='btn btn-success  ' style={{padding:'3px 8px',fontSize:'2.2vw'}} onClick={()=>AddFevioritNews(i)}>  Add faviourit</button>

              </div>
            )
          })

          }
        </>
        )

        ) : <a>loading....</a>}
      </div>

    </div>
    </>
  )
}

export default App
