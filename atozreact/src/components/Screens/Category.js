import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import Layout from '../layout/Layout';
import axios from 'axios';

const Category = () => {
    const [showModal, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [slug, setSlug] = useState('');
    const [status, setStatus] = useState(true);
    const [addToHome, setAddToHome] = useState(false);
    const [trending, setTrending] = useState(false);
    const [categories, setCategories] = useState([]);
    const [editingCategoryId, setEditingCategoryId] = useState(null);

    // Fetch all categories
    const getData = async () => {
        try {
            const response = await axios.get('http://atoz.gocoolcare.com/category/allcategory');
            setCategories(response.data.category);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const generatedSlug = categoryName.toLowerCase().replace(/\s+/g, '-');
        setSlug(generatedSlug);
    }, [categoryName]);

    const handleOpenModal = (category) => {
        setEditingCategoryId(category._id);
        setCategoryName(category.category);
        setSlug(category.slug);
        setStatus(category.status);
        setAddToHome(category.add_page);
        setTrending(category.is_trending);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCategoryName('');
        setSlug('');
        setStatus(true);
        setAddToHome(false);
        setTrending(false);
    };

    // Save new category
    const handleSaveCategory = async (e) => {
        e.preventDefault();
        const categoryData = {
            category: categoryName,
            slug,
            status,
            add_page: addToHome,
            is_trending: trending,
        };

        try {
            const response = await axios.post('http://atoz.gocoolcare.com/category/add', categoryData);

            if (response.status === 201) {
                alert('Category added successfully!');
                getData();
            } else {
                alert('Failed to add category: ' + response.data.message);
            }
        } catch (error) {
            alert('Failed to add category: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };


    // Update category
    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        const updatedCategoryData = {
            category: categoryName,
            slug,
            status,
            add_page: addToHome,
            is_trending: trending,
        };
        try {
            const response = await axios.put(`http://atoz.gocoolcare.com/category/edit/${editingCategoryId}`, updatedCategoryData);
            if (response.status === 200) {
                handleCloseModal();
                getData();
            } else {
                alert('Failed to update category');
            }
        } catch (error) {
            console.error('Error updating category:', error);
            alert('An error occurred while updating the category');
        }
    };

    // Delete category
    const deleteData = async (id) => {
        try {
            await axios.delete(`http://atoz.gocoolcare.com/category/delete/${id}`);
            getData();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <Layout>
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
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="slug">Slug*</label>
                        <input
                            id="slug"
                            className="category-field form-control"
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                        />
                    </div>
                    <button
                        className='save-button btn btn-secondary'
                        type='submit'
                        onClick={handleSaveCategory}
                    >
                        Save
                    </button>
                </div>

                <div className="checkbox-group d-flex align-items-center">
                    <div className="form-check">
                        <label className="form-label" htmlFor="add-to-home">Add to Home Page</label>
                        <input
                            className="form-input"
                            type="checkbox"
                            id="add-to-home"
                            checked={addToHome}
                            onChange={(e) => setAddToHome(e.target.checked)}
                        />
                    </div>
                    <div className="form-check">
                        <label className="form-label" htmlFor="trending">Trending</label>
                        <input
                            className="form-input"
                            type="checkbox"
                            id="trending"
                            checked={trending}
                            onChange={(e) => setTrending(e.target.checked)}
                        />
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
                                <tr key={category._id}>
                                    <td>{index + 1}</td>
                                    <td>{category.category}</td>
                                    <td>
                                        <button className={category.status ? 'btn btn-active' : 'btn btn-inactive'}>
                                            {category.status ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-edit btn-sm me-3" onClick={() => handleOpenModal(category)}>
                                            <img src='/assets/edit.svg' alt='edit' />
                                        </button>
                                        <button className="btn btn-delete btn-sm" onClick={() => deleteData(category._id)}>
                                            <img src='/assets/delete.svg' alt='delete' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="editcategory-page d-flex">
                    <div className="category-edit">
                        <h2>Edit Category</h2>
                        <form className="category-add d-flex" onSubmit={handleUpdateCategory}>
                            <div>
                                <label htmlFor="edit-category-name">Category Name</label>
                                <input
                                    id="edit-category-name"
                                    className="category-field form-control"
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="edit-slug">Slug*</label>
                                <input
                                    id="edit-slug"
                                    className="category-field form-control"
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                />
                            </div>
                            <div className='d-flex flex-column'>
                                <label htmlFor="status">Status</label>
                                <select
                                    className='select'
                                    value={status ? 'active' : 'inactive'}
                                    onChange={(e) => setStatus(e.target.value === 'active')}
                                    required
                                >
                                    <option value=''>Select Status</option>
                                    <option value='active'>Active</option>
                                    <option value='inactive'>Inactive</option>
                                </select>
                            </div>
                            <div className="checkbox-group d-flex align-items-center">
                                <div className="form-check">
                                    <input
                                        className="form-input"
                                        type="checkbox"
                                        id="add-to-home"
                                        checked={addToHome}
                                        onChange={(e) => setAddToHome(e.target.checked)}
                                    />
                                    <label className="form-label" htmlFor="add-to-home">Add to Home Page</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-input"
                                        type="checkbox"
                                        id="trending"
                                        checked={trending}
                                        onChange={(e) => setTrending(e.target.checked)}
                                    />
                                    <label className="form-label" htmlFor="trending">Trending</label>
                                </div>
                            </div>
                            <button className='btn btn-update update-button' type='submit'>
                                update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Category;
