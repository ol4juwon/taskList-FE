import React, { useEffect, useState } from 'react'
import TaskFooter from './common/TaskFooter'
import TaskForm from './common/TaskForm'
import TaskList from './common/TaskList'
import {useNavigate} from 'react-router-dom'

const Tasks = ({socket}) => {
    const [rask, setRask] = useState();
const navigate = useNavigate();
    useEffect(()=>{
        socket.on('welcome',() => {
            console.log('sds')
        })
        socket.emit('newUser', {"ola":"hi"})
socket.on('done',(done) => {
    console.log("done", done)
})
    },[socket])
    useEffect(()=>{
        try{
            const token = localStorage.getItem('token')
            if(!token){
                navigate('/')
            }
        }catch(error){
            navigate('/')
        }
    })
  return (
    <div className='task'>
        <TaskList socket={socket} setRask={setRask}/>
        <div className='task--main'>

            <TaskForm task={rask}/>
            <TaskFooter socket={socket} task={rask}/>
        </div>
    </div>
  )
}

export default Tasks