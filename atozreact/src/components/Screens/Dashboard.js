import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import CustomAlert from './CustomAlert';

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage, setNewsPerPage] = useState(5);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  async function getNews() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/news/allnews`);
      const sortedNews = response.data.news.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setNews(sortedNews);
      setFilteredNews(sortedNews);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }

  async function deleteNews(id) {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/news/delete/${id}`);
      setAlertMessage('News Deleted Successfully')
      setAlertType('success')
      setShowAlert(true)
      getNews();
    } catch (error) {
      setAlertMessage('Failed to delete news')
      setAlertType('error')
      setShowAlert(true)
      console.error('Error deleting news:', error);
    }
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/category/allcategory`)
      .then((response) => {
        setCategories(response.data.category);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    let tempNews = news;

    if (category) {
      tempNews = tempNews.filter((item) => item.category === category);
    }

    if (searchQuery) {
      tempNews = tempNews.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNews(tempNews);
    setCurrentPage(1);
  }, [category, searchQuery, news]);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="card">
        <div className="card-header">
          <h2>All News</h2>
          <Link to="/addnews">
            <button className="btn btn-addnews ms-3">+ Add News</button>
          </Link>
        </div>
        <div className="category d-flex justify-content-between p-3">
          <div className="entries">
            <span>Show</span>
            <select onChange={(e) => setNewsPerPage(Number(e.target.value))} value={newsPerPage}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
            <span>entries</span>
          </div>
          <div className="d-flex gap-2">
            <div className="categoryselect">
              <select
                id="category"
                className="select form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="categorysearch">
              <input
                className="search"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              {currentNews.map((item, index) => (
                <tr key={item._id}>
                  <td>{indexOfFirstNews + index + 1}</td>
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
                    <Link to={`/Addnews/${item._id}`}>
                      <button className="btn btn-edit btn-sm me-3">
                        <img src="/assets/edit.svg" alt="edit" />
                      </button>
                    </Link>
                    <button className="btn btn-delete btn-sm" onClick={() => deleteNews(item._id)}>
                      <img src="/assets/delete.svg" alt="delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          newsPerPage={newsPerPage}
          totalNews={filteredNews.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          type={alertType}
          onClose={() => setShowAlert(false)}
        />
      )}
    </Layout>
  );
};

const Pagination = ({ newsPerPage, totalNews, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNews / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`pagination-button ${number === currentPage ? 'active' : ''}`}
        >
          {number}
        </button>
      ))}
    </nav>
  );
};

export default Dashboard;
