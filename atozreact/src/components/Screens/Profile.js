import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import Layout from '../layout/Layout';
import axios from 'axios';

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsername(response.data.user.name);
                setProfile({
                    name: response.data.name || '', 
                    email: response.data.email || '',  
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [token]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async () => {
        try {
            await axios.put('http://localhost:3000/user/updateprofile', profile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleUpdatePassword = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            alert('New password and confirm password do not match');
            return;
        }
        try {
            await axios.put('http://localhost:3000/user/updatepass', {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Password updated successfully');
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    return (
        <Layout>
            <main className="Profile-page container-fluid">
                <div className="row">
                    <nav className="col-md-3 col-lg-3 sidebar px-0">
                        <div className="sidebar-header text-center">
                            <img src="/assets/user.png" className="user my-3 img-fluid" alt="User Profile" />
                            <span className="ms-2">{username || 'Username'}</span>
                        </div>
                        <p className="text-center m-1">ADMINISTRATION</p>
                        <div className="sidebar-menu">
                            <div className="menu-item d-flex align-items-center">
                                <Link to="/category">
                                    <img src="/assets/category.png" className="category" alt="Category" />
                                    <span className="ms-2">Category</span>
                                </Link>
                            </div>
                            <div className="menu-item d-flex align-items-center">
                                <Link to="/dashboard">
                                    <img src="/assets/all-news.png" className="news" alt="All News" />
                                    <span className="ms-2">All News</span>
                                </Link>
                            </div>
                            <div className="menu-item d-flex align-items-center">
                                <Link to="/profile">
                                    <img src="/assets/profile.png" className="profile-icon" alt="Profile Icon" />
                                    <span className="ms-2">Profile</span>
                                </Link>
                            </div>
                        </div>
                        <div className='logout-btn d-flex justify-content-center align-items-center'>
                            <Link to="/login"> <span><img src='/assets/logout.svg' alt='logout' /></span>
                                <button className='btn btn-logout'>Logout</button></Link>
                        </div>
                    </nav>
                    <div className="col-md-9 col-lg-9 p-0">
                        <div className="card">
                            <div className="card-header">
                                <h2>Update Profile</h2>
                            </div>
                            <form className="profile-add d-flex align-items-center">
                                <div>
                                    <label htmlFor="profile-name">Name</label>
                                    <input
                                        id="profile-name"
                                        name="name"
                                        className="profile-field form-control"
                                        type="text"
                                        value={profile.name || ''}  
                                        onChange={handleProfileChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        className="email-field form-control"
                                        type="text"
                                        value={profile.email || ''}  
                                        onChange={handleProfileChange}
                                    />
                                </div>
                            </form>
                            <div className='buttons'>
                                <button className='btn-updateprofile' onClick={handleUpdateProfile}>Update Profile</button>
                                <button className='btn-updatepass' onClick={handleOpenModal}>Update Password</button>
                            </div>
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="editcategory-page d-flex">
                        <div className="category-edit ">
                            <h2>Update Password</h2>
                            <div className="update-pass d-flex">
                                <div>
                                    <label htmlFor="currentPassword">Current Password</label>
                                    <input
                                        id="currentPassword"
                                        name="currentPassword"
                                        className="password-field form-control"
                                        type="password"
                                        value={passwords.currentPassword || ''}  
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        id="newPassword"
                                        name="newPassword"
                                        className="password-field form-control"
                                        type="password"
                                        value={passwords.newPassword || ''}  
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="password-field form-control"
                                        type="password"
                                        value={passwords.confirmPassword || ''}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                            </div>
                            <button className='btn btn-update' onClick={handleUpdatePassword}>Update</button>
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default Profile;
