import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import Layout from '../layout/Layout';

const Dashboard = () => {

    return (
        <Layout>
            <main className="dashboard container-fluid">
                <header className="row">
                    <div className='col-lg-12 header p-0'>
                        <img
                            src="/assets/logo.png"
                            className="logo m-3 img-fluid"
                            alt="A TO Z Sports Logo"
                        />
                        <div className="line1 p-0"></div>
                    </div>
                </header>
                <div className="row">
                    <nav className="col-md-3 col-lg-3 sidebar px-0">
                        <div className="sidebar-header text-center">
                            <img src="/assets/user.png" className="user my-3 img-fluid" alt="User Pic" />
                            <span className='ms-2'>Username</span>
                        </div>
                        <p className="text-center m-1">ADMINISTRATION</p>
                        <div className='sidebar-menu'>
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
                            <div className='logout-btn d-flex justify-content-center align-items-center'>
                                <span><img src='/assets/logout.svg' alt='logout' /></span>
                                <button className='btn btn-logout'>Logout</button>
                            </div>
                        </div>
                    </nav>
                    <div className="col-md-9 col-lg-9 p-0">
                        <div className="card">
                            <div className="card-header">
                                <h2>All News</h2>
                                <button className="btn btn-addnews ms-3">+ Add News</button>
                            </div>
                            <div className='category d-flex justify-content-end px-1'>
                                <div className="categoryselect mb-3">
                                    <select className='select'>
                                        <option value=''>Select Category</option>
                                        {/* Dynamically add category options here */}
                                    </select>
                                </div>
                                <div className="categorysearch mb-3">
                                    <input
                                        className='search'
                                        type='text'
                                        placeholder='Search'
                                    />
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Image</th>
                                            <th>Date</th>
                                            <th>Pin</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>01</td>
                                            <td>State-wise distribution</td>
                                            <td>Shooting</td>
                                            <td><img src="/assets/news1.png" alt="News 1" className="img-fluid" /></td>
                                            <td>27-09-2024</td>
                                            <td><i className="fas fa-thumbtack"></i></td>
                                            <td>
                                                <button className="btn btn-edit btn-sm me-3"><img src='/assets/edit.svg' alt='edit' /></button>
                                                <button className="btn btn-delete btn-sm"><img src='/assets/delete.svg' alt='delete' /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>02</td>
                                            <td>State-wise distribution</td>
                                            <td>Shooting</td>
                                            <td><img src="/assets/news2.png" alt="News 2" className="img-fluid" /></td>
                                            <td>27-09-2024</td>
                                            <td><i className="fas fa-thumbtack"></i></td>
                                            <td>
                                                <button className="btn btn-edit btn-sm me-3"><img src='/assets/edit.svg' alt='edit' /></button>
                                                <button className="btn btn-delete btn-sm"><img src='/assets/delete.svg' alt='delete' /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>03</td>
                                            <td>State-wise distribution</td>
                                            <td>Shooting</td>
                                            <td><img src="/assets/news1.png" alt="News 1" className="img-fluid" /></td>
                                            <td>27-09-2024</td>
                                            <td><i className="fas fa-thumbtack"></i></td>
                                            <td>
                                                <button className="btn btn-edit btn-sm me-3"><img src='/assets/edit.svg' alt='edit' /></button>
                                                <button className="btn btn-delete btn-sm"><img src='/assets/delete.svg' alt='delete' /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>04</td>
                                            <td>State-wise distribution</td>
                                            <td>Shooting</td>
                                            <td><img src="/assets/news1.png" alt="News 1" className="img-fluid" /></td>
                                            <td>27-09-2024</td>
                                            <td><i className="fas fa-thumbtack"></i></td>
                                            <td>
                                                <button className="btn btn-edit btn-sm me-3"><img src='/assets/edit.svg' alt='edit' /></button>
                                                <button className="btn btn-delete btn-sm "><img src='/assets/delete.svg' alt='delete' /></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>05</td>
                                            <td>State-wise distribution</td>
                                            <td>Shooting</td>
                                            <td><img src="/assets/news1.png" alt="News 1" className="img-fluid" /></td>
                                            <td>27-09-2024</td>
                                            <td><i className="fas fa-thumbtack"></i></td>
                                            <td>
                                                <button className="btn btn-edit btn-sm me-3"><img src='/assets/edit.svg' alt='edit' /></button>
                                                <button className="btn btn-delete btn-sm"><img src='/assets/delete.svg' alt='delete' /></button>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default Dashboard;
