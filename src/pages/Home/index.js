import React, { useState } from 'react';
import { FaDownload } from 'react-icons/fa'

import api from './../../services/api'

import './styles.css';

const Home = () =>{
  const [images, setImages] = useState([])

  async function handleSearch(event){
    if(event.key === 'Enter'){
      const query = event.target.value;

      const serchImages = await api.post('/pesquisar', { query })
      
      const foundImages = serchImages.data.urls;

      setImages(foundImages);
    }
  }

  async function handleDownload(url){
    const response = await api.post('baixar', { url });

    alert(response.data.message)
  }

  return (
    <div className="container">
      <div className="content">
        <h1>ImageDownloader</h1>
        
        <div className="area-busca">
          <input type="text" placeholder="Pesquisar imagens..." onKeyPress={handleSearch}/>
        </div>

        <div className="area-imagens">
          {
            images.map((image) => (
              <div key={image.id} className="imagem">
                  <img src={image.url} alt={image.url}/>
                
                  <button onClick={() => handleDownload(image.url)}>
                    <FaDownload color="#fcfaf2"/>
                    <span>Download</span>
                  </button>
                </div>
            ))
          }
        </div>
      </div>      
    </div>
  );
}

export default Home;