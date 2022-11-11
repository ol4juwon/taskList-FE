import React from 'react'

const TaskForm = ({task}) => {
  return (
    <>
    
    <div className='task__mainHeader'>
        <header>
            {task?.title}
            
            
        </header>
<br/>
    <div>{task?.status}</div>
    <div className='message__container'>

    </div>
    </div>
    </>
  )
}

export default TaskForm