import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
function Redirect() {
  let [spenner, setspenner] = useState(true);
  // to get redux data
  let News = useSelector(state => state?.news);
  let Newss=useSelector(state => state?.newss)
  News = News?.news;
  Newss=Newss?.newss;
  // console.log(News,Newss);

  useEffect(() => {
    setspenner(false);

  }, [News,Newss])

  return (
    <div>
    <div className='  d-flex ' style={{alignItems:'center',justifyContent:'space-between',marginBottom:'2vw',backgroundColor:'#af9ad6'}}>
      
      <Link to='/' style={{textDecoration:'none',fontSize:'30px',fontWeight:'600',color:'red',padding:' 1vw ', paddingLeft:'3vw'}}>News</Link>
      <div style={{display:'flex',alignContent:'center',padding:'1vw ',paddingLeft:'5vw' }}>
      
 <Link to='/favorite' style={{paddingLeft:'2vw',fontSize:'22px',fontWeight:'500',color:'blue',textDecoration:'none'}}>Faviourit</Link>

      </div>
    </div>
    <div className='d-flex container' style={{ justifyContent: 'center', flexDirection: 'column' }}>
        {News ||Newss ? (spenner ? <img src='./spin.gif' style={{ width: '10vw' }} /> :
        <>
          <div className='shadow-lg p-3 mb-5 bg-body rounded' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '15 ', flexDirection: 'column' }}     >
            <div className='m-3 ' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}  >
              <h1 style={{ fontWeight: '600', fontSize: '2.6vw', color: '#3495e1', wordWrap: 'break-word', width: '90%', alignSelf: 'self-start' }}>{News?.title || Newss?.title} </h1>
              <h3 style={{ fontSize: '2vw', width: '90%', wordWrap: 'break-word', paddingTop: '2vw' }}>{News?.content || Newss?.content }</h3>
              <div style={{ display: 'flex', width: '90%', justifyContent: 'space-between', paddingBottom: '3px', paddingTop: '2vw', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '2vw', wordWrap: 'break-word', color: 'blue' }}>{News?.author || Newss?.author }</h3>
                <h3 style={{ fontSize: '1.8vw', alignSelf: 'start', color: 'blue' }}>{News?.publishedAt || Newss?.publishedAt}</h3>
              </div>
              <img src={News?.urlToImage || Newss?.urlToImage} className='rounded-lg' style={{ width: '100%' }}  />

            </div>

            <div className='' id={News?.id || Newss?.id} style={{ width: '90%' }}>

              <h3 style={{ fontSize: '1.8vw', width: '90%', wordWrap: 'break-word' }}>{News?.description || Newss?.description}</h3>
              <h3 style={{ fontSize: '2vw', width: '90%', wordWrap: 'break-word', fontWeight: '700', paddingTop: '3px' }}>About This Event link: </h3>
              <a href={`${News?.url || Newss?.url}`} style={{ fontSize: '1.8vw', width: '90%', wordWrap: 'break-word', fontWeight: '700', color: 'blue' }}> {News?.url || Newss?.url}</a>

            </div>

          </div>
        </>
      )

        : <a>loading....</a>}

    </div>
    </div>
  )
}

export default Redirect
