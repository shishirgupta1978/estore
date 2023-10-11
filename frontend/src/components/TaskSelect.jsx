import React, { useState, useEffect, useContext } from 'react'
import { Input } from './Input';
import { axiosApi, MyContext } from '../utility';
import { toast } from 'react-toastify';





export const TaskSelect = ({setData}) => {
    const { context, setContext } = useContext(MyContext);
    const [source, setSource] = useState(null);
    const [task, setTask] = useState(null);
    const handleTaskChange = (event) => {
        setTask(event.target.value);
        };
    

    const handleSourceChange = (event) => {
    setSource(event.target.files[0]);
    
    };

    



    const submitHandler = (e) => {
    e.preventDefault();


    const mformData = new FormData();
    
    if (source && task) {
        console.log(task)
        mformData.append("source", source);
        mformData.append("task", task);
        const config = { method: "post", headers: { 'Content-Type': 'multipart/form-data', "Authorization": true }, data: mformData }
        axiosApi(`api/alt-text-generator/upload-document-for-task/`, config, setData, setContext);
    }
    else {
        toast.error("Error!, Please Select Task.")
    }

    };


  return (
    <div className='form'>
    <form onSubmit={submitHandler}>
      <h2> Utility Tasks</h2>
    <div className="material-input">
      <label>Select Task</label>
      <div className="input-container">
      <select name="task" onChange={handleTaskChange} required>
        <option>--Select Task--</option>
        <option value="bodystyling">Bodystyling</option>
        <option value="crosslinking">Crosslinking</option>
        <option value="copypowereditstyles">Copy Power Edit Styles</option>
      </select>
      </div>
    </div>


      <Input label="Select Docx File" name='source' type="file" accept=".docx" onChange={handleSourceChange} required />
      <button type="submit">Process</button>
    </form>
  </div>  )
}

