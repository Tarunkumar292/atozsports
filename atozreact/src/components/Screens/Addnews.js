import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import Layout from '../layout/Layout';

const Addnews = () => {

    return (
        <Layout>
            <main className="category-page container-fluid">
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
                <div div className="row">
                    <nav className="col-md-3 col-lg-3 sidebar px-0">
                        <div className="sidebar-header text-center">
                            <img src="/assets/user.png" className="user my-3 img-fluid" alt="User Profile" />
                            <span className="ms-2">Username</span>
                        </div>
                        <p className="text-center m-1">ADMINISTRATION</p>
                        <div className="sidebar-menu">
                            <div className="menu-item d-flex align-items-center">
                                <Link to="/category"><img src="/assets/category.png" className="category" alt="category" />
                                    <span className="ms-2">Category</span></Link>
                            </div>
                            <div className="menu-item d-flex align-items-center">
                                <Link to="/dashboard"><img src="/assets/all-news.png" className="news" alt="news" />
                                    <span className="ms-2">All News</span></Link>
                            </div>
                            <div className="menu-item d-flex align-items-center">
                                <Link to="/profile">
                                    <img src="/assets/profile.png" className="profile-icon" alt="Profile Icon" />
                                    <span className="ms-2">Profile</span>
                                </Link>
                            </div>
                        </div>
                        <div className='logout-btn d-flex justify-content-center align-items-center'>
                            <span><img src='/assets/logout.svg' alt='logout' /></span>
                            <button className='btn btn-logout'>Logout</button>
                        </div>
                    </nav>
                    <div className="col-md-9 col-lg-9 p-0">
                        <div className="card">
                            <div className="card-header">
                                <h2><span></span>Add News</h2>
                            </div>
                            <div className="news-add d-flex align-items-center">
                                <div>
                                    <label htmlFor="photo">Photo*</label>
                                    <input
                                        id="photo"
                                        className="news-field form-control"
                                        type="file"
                                        required
                                    />
                                </div>
                                <div className='d-flex flex-column'>
                                    <label htmlFor="category">Select Category*</label>
                                    <select id="category" className='select form-control' required>
                                        <option value=''>Select Category</option>
                                        <option value='Trending'>Trending</option>
                                        <option value='Para'>Para</option>
                                        <option value='Recent'>Recent</option>
                                    </select>
                                </div>
                            </div>
                            <div className="news-add d-flex align-items-center">
                                <div>
                                    <label htmlFor="meta-title">Meta Title*</label>
                                    <input
                                        id="meta-title"
                                        className="news-field form-control"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="slug">Slug*</label>
                                    <input
                                        id="slug"
                                        className="news-field form-control"
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="news-add d-flex align-items-center">
                                <div>
                                    <label htmlFor="meta-description">Meta Description*</label>
                                    <input
                                        id="meta-description"
                                        className="news-field form-control"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="checkbox-group d-flex mt-3">
                                    <div className="form-check">
                                        <label className="form-label" htmlFor="trending">Trending</label>
                                        <input className="form-input" type="checkbox" id="trending" />
                                    </div>
                                    <div className="form-check">
                                        <label className="form-label" htmlFor="banner">Show in Banner</label>
                                        <input className="form-input" type="checkbox" id="banner" />
                                    </div>
                                </div>
                                {/* <ReactRichEditor height={200} /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );

};

export default Addnews;
