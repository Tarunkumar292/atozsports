import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

const Editcategory = () => {
    return (
        <main className="editcategory-page d-flex">
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
        </main>
    );
}

export default Editcategory;
