import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

const Category = () => {
    return (
        <main className="category-page container-fluid">
            <header className="row">
                <div className="col-lg-12 header p-0">
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
                        <img src="/assets/user.png" className="user my-3 img-fluid" alt="User Profile" />
                        <span className="ms-2">Username</span>
                    </div>
                    <p className="text-center m-1">ADMINISTRATION</p>
                    <div className="sidebar-menu">
                        <div className="menu-item d-flex align-items-center">
                            <img src="/assets/category.png" className="category-icon" alt="Category Icon" />
                            <span className="ms-2">Category</span>
                        </div>
                        <div className="menu-item d-flex align-items-center">
                            <img src="/assets/all-news.png" className="news-icon" alt="All News Icon" />
                            <span className="ms-2">All News</span>
                        </div>
                        <div className="menu-item d-flex align-items-center">
                            <img src="/assets/profile.png" className="profile-icon" alt="Profile Icon" />
                            <span className="ms-2">Profile</span>
                        </div>
                    </div>
                    <div className='logout-btn d-flex justify-content-center align-items-center'>
                        <span><img src='/assets/logout.svg' alt='logout'/></span>
                        <button className='btn btn-logout'>Logout</button>
                    </div>
                </nav>
                <div className="col-md-9 col-lg-9 p-0">
                    <div className="card">
                        <div className="card-header">
                            <h2>Add Category</h2>
                        </div>
                        <div className="category-add d-flex align-items-center">
                            <div>
                                <label htmlFor="category-name">Category Name</label>
                                <input
                                    id="category-name"
                                    className="category-field form-control"
                                    type="text"
                                />
                            </div>
                            <div>
                                <label htmlFor="slug">Slug*</label>
                                <input
                                    id="slug"
                                    className="category-field form-control"
                                    type="text"
                                />
                            </div>
                            <button className='save-button btn btn-secondary' type='submit'>Save</button>
                        </div>
                        <div className="checkbox-group d-flex align-items-center">
                            <div className="form-check ">
                                <label className="form-label" htmlFor="add-to-home">Add to Home Page</label>
                                <input className="form-input" type="checkbox" id="add-to-home" />
                            </div>
                            <div className="form-check ">
                                <label className="form-label" htmlFor="trending">Trending</label>
                                <input className="form-input" type="checkbox" id="trending" />
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table text-start">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>01</td>
                                        <td>State-wise distribution</td>
                                        <td><button className='btn btn-active'>Active</button></td>
                                        <td>
                                            <button className="btn btn-edit btn-sm me-3"><img src='/assets/edit.svg' alt='edit' /></button>
                                            <button className="btn btn-delete btn-sm "><img src='/assets/delete.svg' alt='delete' /></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>02</td>
                                        <td>National news</td>
                                        <td><button className='btn btn-active'>Active</button></td>
                                        <td>
                                            <button className="btn btn-edit btn-sm me-3"><img src='/assets/edit.svg' alt='edit' /></button>
                                            <button className="btn btn-delete btn-sm "><img src='/assets/delete.svg' alt='delete' /></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>02</td>
                                        <td>National news</td>
                                        <td><button className='btn btn-active'>Active</button></td>
                                        <td>
                                            <button className="btn btn-edit btn-sm me-3"><img src='/assets/edit.svg' alt='edit' /></button>
                                            <button className="btn btn-delete btn-sm "><img src='/assets/delete.svg' alt='delete' /></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Category;
