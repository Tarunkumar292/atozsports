import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import Layout from '../layout/Layout';

const Dashboard = () => {
    const [news, setNews] = useState(null);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);


    async function getnews() {
        try {
            const response = await axios.get("http://localhost:3000/news/allnews");
            setNews(response.data.news);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }

    async function deletenews(id) {
        try {
            const response = await axios.delete(`http://localhost:3000/news/delete/${id}`);
            console.log('Category deleted successfully:', response.data.news);
            getnews();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    }
    useEffect(() => {
        axios.get('http://localhost:3000/category/allcategory')
            .then((response) => {
                setCategories(response.data.category);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);


    useEffect(() => {
        getnews();
    }, []);

    return (
        <Layout>
            <main className="dashboard container-fluid">
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
                                <Link to="/login"> <span><img src='/assets/logout.svg' alt='logout' /></span>
                                    <button className='btn btn-logout'>Logout</button></Link>
                            </div>
                        </div>
                    </nav>
                    <div className="col-md-9 col-lg-9 p-0">
                        <div className="card">
                            <div className="card-header">
                                <h2>All News</h2>
                                <Link to="/addnews"><button className="btn btn-addnews ms-3">+ Add News</button></Link>
                            </div>
                            <div className='category d-flex justify-content-between p-3'>
                                <div className='entries'>
                                    <span>Show</span><select>
                                        <option value=''>5</option>
                                        <option value=''>10</option>
                                        <option value=''>15</option>
                                        <option value=''>20</option>
                                    </select><span>entries</span>
                                </div>
                                <div className='d-flex gap-2'>
                                    <div className="categoryselect ">
                                        <select
                                            id="category"
                                            className="select form-control"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map((cat) => (
                                                <option key={cat._id} value={cat.category}>
                                                    {cat.category}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                    <div className="categorysearch ">
                                        <input
                                            className='search'
                                            type='text'
                                            placeholder='Search'
                                        />
                                    </div>
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
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {news?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.title}</td>
                                                <td>{item.category}</td>
                                                <td><img src={item.photo} alt={item.title} className="img-fluid images" /></td>
                                                <td>{item.date}</td>
                                                <td>
                                                    {item.is_trending && item.banner && "Trending and Banner"}
                                                    {!item.is_trending && item.banner && "Banner"}
                                                    {item.is_trending && !item.banner && "Trending"}
                                                    {!item.is_trending && !item.banner && "Normal"}
                                                </td>
                                                <td>
                                                    <Link to={`/EditNews?id=${news.id}`}>
                                                        <button className="btn btn-edit btn-sm me-3">
                                                            <img src='/assets/edit.svg' alt='edit' />
                                                        </button>
                                                    </Link>
                                                    <button className="btn btn-delete btn-sm" onClick={() => deletenews(item._id)}>
                                                        <img src='/assets/delete.svg' alt='delete' /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default Dashboard;
