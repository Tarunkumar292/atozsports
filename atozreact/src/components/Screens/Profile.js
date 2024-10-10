import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import Layout from '../layout/Layout';

const Profile = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handlecloseModal = () =>{
        setShowModal(false);
    }

    return (
        <Layout>
            <main className="Profile-page container-fluid">
                <header className="row">
                    <div className="col-lg-12 header p-0">
                        <img
                            src="/assets/logo.png"
                            className="logo img-fluid"
                            alt="A TO Z Sports Logo"
                        />
                        <div className="line1 p-0"></div>
                    </div>
                </header>
                <div className="row">
                    <nav className="col-md-3 col-lg-3 sidebar px-0">
                        <div className="sidebar-header text-center">
                            <img src="/assets/user.png" className="user my-3 img-fluid" alt="User Profile" />
                            <span className="ms-2">Username</span>
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
                            <span><img src='/assets/logout.svg' alt='Logout' /></span>
                            <button className='btn btn-logout'>Logout</button>
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
                                        className="profile-field form-control"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        className="email-field form-control"
                                        type="text"
                                    />
                                </div>
                            </form>
                            <div className='buttons'>
                                <button className='btn-updateprofile'>Update Profile</button>
                                <button className='btn-updatepass' onClick={handleOpenModal}>Update Password</button>
                            </div>
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="editcategory-page d-flex">
                        <div className="category-edit ">
                            <h2>Update Password</h2>
                            <p onClick={handlecloseModal}>x</p>
                            <div className="update-pass d-flex">
                                <div>
                                    <label htmlFor="password">Current Password</label>
                                    <input
                                        id="password"
                                        className="password-field form-control"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">New Password</label>
                                    <input
                                        id="password-new"
                                        className="password-field form-control"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">Confirm Password</label>
                                    <input
                                        id="password-confirm"
                                        className="password-field form-control"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <button className='btn btn-update'>Update</button>
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
}

export default Profile;
