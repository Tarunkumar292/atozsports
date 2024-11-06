import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import Layout from '../layout/Layout';
import axios from 'axios';
import CustomAlert from './CustomAlert';

const Profile = () => {
    const [showModal, setShowModal] = useState(false);   
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://atoz.gocoolcare.com/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response)
                setProfile({
                    name: response.data.user.name,
                    email: response.data.user.email,
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [token]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async () => {
        try {
            await axios.put('http://atoz.gocoolcare.com/user/updateprofile', profile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAlertMessage('Profile updated successfully');
            setAlertType('success');
            setShowAlert(true); 
        } catch (error) {
            setAlertMessage('Failed to update Profile')
            setAlertType('error');
            setShowAlert(true);
            console.error('Error updating profile:', error);
        }
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleUpdatePassword = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            setAlertMessage('New password and confirm password do not match');
            setAlertType('error');
            setShowAlert(true);
            return;
        }
        try {
            await axios.put('http://atoz.gocoolcare.com/user/updatepass', {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAlertMessage('Password updated successfully');
            setAlertType('success');
            setShowAlert(true);
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setShowModal(false);
        } catch (error) {
            setAlertMessage('Failed to update password')
            setAlertType('error');
            setShowAlert(true);
            console.error('Error updating password:', error);
        }
    };

    return (
        <Layout>
            <div className="card">
                <div className="card-header">
                    <h2>Update Profile</h2>
                </div>
                <form className="profile-add d-flex align-items-center">
                    <div>
                        <label htmlFor="profile-name">Name</label>
                        <input
                            id="profile-name"
                            name="name"
                            className="profile-field form-control"
                            type="text"
                            value={profile.name || ''}
                            onChange={handleProfileChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            className="email-field form-control"
                            type="text"
                            value={profile.email || ''}
                            onChange={handleProfileChange}
                        />
                    </div>
                </form>
                <div className='buttons'>
                    <button className='btn-updateprofile' onClick={handleUpdateProfile}>Update Profile</button>
                    <button className='btn-updatepass' onClick={handleOpenModal}>Update Password</button>
                </div>
            </div>
            {showModal && (
                <div className="editcategory-page d-flex">
                    <div className="category-edit">
                        <h2>Update Password</h2>
                        <div className="update-pass d-flex">
                            <div>
                                <label htmlFor="currentPassword">Current Password</label>
                                <input
                                    id="currentPassword"
                                    name="currentPassword"
                                    className="password-field form-control"
                                    type="password"
                                    value={passwords.currentPassword || ''}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="newPassword">New Password</label>
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    className="password-field form-control"
                                    type="password"
                                    value={passwords.newPassword || ''}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="password-field form-control"
                                    type="password"
                                    value={passwords.confirmPassword || ''}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>
                        <button className='btn btn-update' onClick={handleUpdatePassword}>Update</button>
                    </div>
                </div>
            )}
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

export default Profile;
