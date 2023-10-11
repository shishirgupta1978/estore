import React, { useState, useEffect, useContext } from 'react'
import { TaskSelect } from './TaskSelect';
import { axiosApi, BASE_URL, MyContext } from '../utility';
import { toast } from 'react-toastify';
import { Spinner } from '.';
import axios from 'axios';
import { getAccessToken } from '../utility';


export const Utility = () => {
  const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })

  const handleDownload = (filename) => {
    let token=getAccessToken();
    axios.get(`${BASE_URL}/api/alt-text-generator/download/${filename}/`, {
      responseType: 'blob', // Receive response as a Blob
      headers: {
        'Authorization': `Bearer ${token}`, // Replace with your authentication token
      },
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // Replace with the desired file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => console.error(error));
  };



return (
  <div className='utility'>
    {data.is_loading && <Spinner />}
    <div className='left'>
      <TaskSelect setData={setData} />
      {data.is_success && data.result && data.result.source && <><button style={{backgroundColor:"#3f6d8f"}} className='download' onClick={() => handleDownload(data.result.source)}>Download</button></>}
    </div>
    <div className='right'>

      {data.is_success && data.result && data.result.output && <><h1>Log View</h1><pre>{data.result.output}</pre></>}
    </div>

  </div>
)
}

