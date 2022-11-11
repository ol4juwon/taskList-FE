import React, { useEffect, useState } from 'react'

const TaskList = ({socket, setRask}) => {
    const [lists, setLists] = useState([]);
    useEffect(() => {
        console.log(socket)
        socket.on('newTaskList',(task) =>{
            // consoles.log('ol', [...lists, task] )
            setLists(prev =>{ 
                console.log("here ",prev);
                
                return [...prev,task]});
        })

       return () =>  socket.off('newTaskList');
    },[]);

    useEffect(() => {
        const x = () => {
            const task = JSON.parse(localStorage.getItem('tasks'))
            return task;

        }
        const mb = x();
        console.log("sss",mb);
        setLists([...mb])
        return ()=>x();
    },[])
  return (
    <div className='task__sidebar'>
        <h2>Task List</h2>
        <div>
            <div className='task--header'></div>
            <div className='task--list'>
                {lists.map((list, index)=>{
                    console.log(index,list)
                        return <p key={index} onClick={()=> setRask(list)}>{list.title}</p>
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default TaskList