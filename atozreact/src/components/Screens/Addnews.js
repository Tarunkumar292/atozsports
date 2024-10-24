import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import Layout from '../layout/Layout';
import { useParams } from 'react-router-dom';

const Addnews = () => {
    const { id } = useParams();
    console.log(id);

    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [photo, setPhoto] = useState(null);
    const [banner, setBanner] = useState(false);
    const [isTrending, setIsTrending] = useState(false);
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [newsdetails, setnewsdetails] = useState('');
    const [categories, setCategories] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const handleTitleChange = (e) => {
        const titleValue = e.target.value;
        setTitle(titleValue);
        const generatedSlug = titleValue.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        setSlug(generatedSlug);
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSaveNews = async (e) => {
        e.preventDefault();

        if (!photo && !editMode) {
            alert('Please select a photo before submitting.');
            return;
        }

        const formData = new FormData();
        if (photo) formData.append("photo", photo);
        formData.append("category", category);
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("description", description);
        formData.append("newsdetails", newsdetails);
        formData.append("banner", banner);
        formData.append("is_trending", isTrending);

        try {
            let response;
            if (editMode) {
                response = await axios.put(`http://localhost:3000/news/edit/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                response = await axios.post('http://localhost:3000/news/add', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            console.log('Response:', response.data);
            alert(editMode ? 'News updated successfully' : 'News added successfully');
        } catch (error) {
            if (error.response && error.response.data.code === 11000) {
                alert('Duplicate slug detected. Please use a unique title.');
            } else {
                console.error('Error:', error);
            }
        }
    };

    // Fetch all categories
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
        if (id) {
            setEditMode(true);
            axios.get(`http://localhost:3000/news/getnews/${id}`)
                .then((response) => {
                    const news = response.data.news;
                    setTitle(news.title);
                    setSlug(news.slug);
                    setDescription(news.description);
                    setCategory(news.category);
                    setBanner(news.banner);
                    setIsTrending(news.is_trending);
                    setnewsdetails(news.newsdetails);
                })
                .catch((error) => {
                    console.error('Error fetching news data:', error);
                });
        }
    }, [id]);

    return (
        <Layout>
            <div className="card">
                <div className="card-header">
                    <h2>{editMode ? 'Edit News' : 'Add News'}</h2>
                </div>
                <form onSubmit={handleSaveNews}>
                    <div className="news-add d-flex align-items-center">
                        <div>
                            <label htmlFor="photo">Photo*</label>
                            <input
                                id="photo"
                                className="news-field form-control"
                                type="file"
                                onChange={handlePhotoChange}
                                required={!editMode}
                            />
                        </div>
                        <div className='d-flex flex-column'>
                            <label htmlFor="category">Select Category*</label>
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
                    </div>
                    <div className="news-add d-flex align-items-center">
                        <div>
                            <label htmlFor="meta-title">Meta Title*</label>
                            <input
                                id="meta-title"
                                className="news-field form-control"
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="slug">Slug*</label>
                            <input
                                id="slug"
                                className="news-field form-control"
                                type="text"
                                value={slug}
                                readOnly
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="checkbox-group d-flex mt-3">
                            <div className="form-check">
                                <label className="form-label" htmlFor="trending">Trending</label>
                                <input
                                    className="form-input"
                                    type="checkbox"
                                    id="trending"
                                    checked={isTrending}
                                    onChange={(e) => setIsTrending(e.target.checked)}
                                />
                            </div>
                            <div className="form-check">
                                <label className="form-label" htmlFor="banner">Show in Banner</label>
                                <input
                                    className="form-input"
                                    type="checkbox"
                                    id="banner"
                                    checked={banner}
                                    onChange={(e) => setBanner(e.target.checked)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='editor'>
                        <label htmlFor="editor">News Details*</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={newsdetails}
                            onChange={(event, editor) => setnewsdetails(editor.getData())} />
                    </div>
                    <button type='submit' className='btn btn-save'>
                        {editMode ? 'Update News' : 'Save News'}
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Addnews;
