import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import Layout from '../layout/Layout';

const Category = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const categories = [
        { id: 1, name: 'State-wise distribution', status: 'Active' },
        { id: 2, name: 'National news', status: 'Active' },
        { id: 3, name: 'International news', status: 'Active' },
        { id: 4, name: 'State-wise distribution', status: 'Active' },
        { id: 5, name: 'State-wise distribution', status: 'Active' },
    ];

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
                <div className="row">
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
                                <div className="form-check">
                                    <label className="form-label" htmlFor="add-to-home">Add to Home Page</label>
                                    <input className="form-input" type="checkbox" id="add-to-home" />
                                </div>
                                <div className="form-check">
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
                                        {categories.map((category, index) => (
                                            <tr key={category.id}>
                                                <td>{index + 1}</td>
                                                <td>{category.name}</td>
                                                <td><button className='btn btn-active'>{category.status}</button></td>
                                                <td>
                                                    <button
                                                        className="btn btn-edit btn-sm me-3"
                                                        onClick={handleOpenModal}
                                                    >
                                                        <img src='/assets/edit.svg' alt='edit' />
                                                    </button>
                                                    <button className="btn btn-delete btn-sm">
                                                        <img src='/assets/delete.svg' alt='delete' />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="editcategory-page d-flex">
                        <div className="category-edit ">
                            <h2>Edit Category</h2>
                            <div className="category-add d-flex">
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
                                <div className='d-flex flex-column'>
                                    <label htmlFor="status">Status</label>
                                    <select className='select'>
                                        <option value=''>Select Category</option>
                                        <option value='active'>Active</option>
                                        <option value='inactive'>Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="checkbox-group d-flex">
                                <div className="form-check ">
                                    <input className="form-input" type="checkbox" id="add-to-home" />
                                    <label className="form-label" htmlFor="add-to-home">Add to Home Page</label>
                                </div>
                                <div className="form-check ">
                                    <input className="form-input" type="checkbox" id="trending" />
                                    <label className="form-label" htmlFor="trending">Trending</label>
                                </div>
                            </div>
                            <button className='btn btn-update'>Update</button>
                        </div>
                    </div>)}
            </main>
        </Layout>
    );

};

export default Category;
