import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

const TaskFooter = ({socket, rask}) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [status, setStatus] = useState('');
    const [time, setTime] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [rasks, setRasks] = useState(rask);
    const [user_id, setUser_id] = useState("");
    const handleSendMessage = (e) => {
        e.preventDefault();
        socket.emit('newTask', {title,description:desc, status, time, user_id})
// console.log({title,desc, status, time})
    }
useEffect(()=> {
    try{
       const id = localStorage.getItem('userId')
       setUser_id(id);
        const name = localStorage.getItem('name');
        setName(name);
        // const token = localStorage.getItem('token')

    }catch(error){
        
    }
})

    return (
        <div className='task__footer'>
            <form className="form" onSubmit={handleSendMessage}>
                <label className='intu'><span>title: </span><input type="text" value={rasks?.title || title} required onChange={(e)=> setTitle(e.target.value)} name="title" /></label>
                <label className='intu'><span>Description: </span><input type="text" value={rasks?.desc || desc} required onChange={(e) => setDesc(e.target.value)} name="description" /></label>
                <label className='intu'><span>Status: </span><input type="text" value={rasks?.status || status} required onChange={(e) => setStatus(e.target.value)} name="status" /></label>
                <label><input hidden  value={rasks?.user_id || user_id} disabled /></label>
                <label className='intu'><span>Time:</span><input type="date" value={time} required onChange={(e) => setTime(e.target.value)} name="date"/></label>
                <button className="sendBtn">SEND</button>
            </form></div>
    )
}

export default TaskFooter