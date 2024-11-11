import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

const Sidebar = () => {
    const [username, setUsername] = useState(''); 
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsername(response.data.user.name);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        if (token) {
            fetchProfile();
        }
    }, [token]);

    return (
        <nav className="col-md-3 col-lg-3 sidebar px-0">
            <div className="sidebar-header text-center">
                <img src="/assets/user.png" className="user my-3 img-fluid" alt="User Pic" />
                <span className="ms-2">{username || 'Username'}</span>
            </div>
            <p className="text-center m-1">ADMINISTRATION</p>
            <div className="sidebar-menu">
                <div className="menu-item d-flex align-items-center">
                    <Link to="/category">
                        <img src="/assets/category.png" className="category" alt="category" />
                        <span className="ms-2">Category</span>
                    </Link>
                </div>
                <div className="menu-item d-flex align-items-center">
                    <Link to="/dashboard">
                        <img src="/assets/all-news.png" className="news" alt="news" />
                        <span className="ms-2">All News</span>
                    </Link>
                </div>
                <div className="menu-item d-flex align-items-center">
                    <Link to="/profile">
                        <img src="/assets/profile.png" className="profile-icon" alt="Profile Icon" />
                        <span className="ms-2">Profile</span>
                    </Link>
                </div>
                <div className='logout-btn d-flex justify-content-center align-items-center'>
                    <Link to="/login">
                        <span><img src='/assets/logout.svg' alt='logout' /></span>
                        <button className='btn btn-logout'>Logout</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
