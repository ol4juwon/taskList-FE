import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
const Home = ({ socket }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('login', {
            loginData: {
                email, password
            }
        })

    };

    useEffect(() => {
        socket.on('loginSuccess', (data) => {
            console.log('data', data)
            socket.on('tasks', (tasks) => {
                console.log('tasks', tasks)
                localStorage.setItem('tasks', JSON.stringify(tasks.data));
            })
            try {
                if (data.token) {
                   const deets = jwt_decode(data.token);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('name', deets.name);
                    localStorage.setItem('userId', deets.user_id);
                    navigate('/tasks');
                }
            } catch (error) {
                console.log('error', error)
            }
        })
    
        socket.on('loginError', (error) => {
            console.log("error", error)
            setError(error)
        })

        return () => {
            socket.off('loginSuccess');
            socket.off('loginError');
            socket.off('task');
        }
    }, [socket])
    useEffect(()=> {
        localStorage.clear()
    })
    return (
        <form className="home__container" onSubmit={handleSubmit}>
            <h2 className="home__header">Sign in to Open Task</h2>
            {error && <span>{error}</span>}
            <label htmlFor="username">email</label>
            <input
                type="text"
                minLength={6}
                name="email"
                id="email"
                className="username__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>password</label>
            <input
                type="text"
                minLength={6}
                name="password"
                id="password"
                className="username__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="home__cta">SIGN IN</button>
        </form>
    );
};

export default Home;