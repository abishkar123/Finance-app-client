import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  getApplicatonAction, getSelectedAction, updateApplicationAction } from '../../redux/form/FormAction';
import { Button, Container, Form } from 'react-bootstrap';
import '../../App.css';
import { Header } from '../../components/header/Header';

export const EditApplication = () => {
    const dispatch = useDispatch();
    const { _id } = useParams();
   
    const [currentItem, setCurrentItem] = useState(null);
    const [editingSection, setEditingSection] = useState(null);
    const [formData, setFormData] = useState({});
   
    const [limit, setLimit] = useState(5); 
    const {form, currentPage} = useSelector((state)=>state.form)

 
    useEffect(() => {
       if(currentPage && limit){
          dispatch(getSelectedAction(currentPage, limit));
       }
        
      }, [dispatch, currentPage, limit]);

   console.log(form)
   
   useEffect(() => {
    if (Array.isArray(form.lists) && form.lists.length > 0) {
        const item = form.lists?.find(item => item._id === _id);
        if (item) {
            setCurrentItem(item);
            setFormData({
                personalDetails: item.personalDetails,
                income: item.income,
                expenses: item.expenses,
                assets: item.assets,
                liabilities: item.liabilities,
            });
        }
    }
}, [form.lists, _id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [editingSection]: {
                ...prevData[editingSection],
                [name]: value
            }
        }));
    };

    const handleSubmit = async () => {
        try {
            if (currentItem) {
                await dispatch(updateApplicationAction({ ...currentItem, [editingSection]: formData[editingSection] }));
                
            }
        } catch (error) {
            console.error('Failed to update application:', error);
            
        }
        setEditingSection(null);
    };

    return (
        <div>
            <Header/>
            <div className='content-container'>
            <p className='text-3xl font-semibold text-center p-3 text-title'>Application Details:</p>
            <div className='edit-content d-flex flex-column mt-4 p-4'>
                {currentItem && (
                    <>
                        <div className='d-flex flex-column mt-4 p-4 bg-brown-200'>
                            <div className="edit-btn" onClick={() => setEditingSection('personalDetails')}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5">
                            <title>Edit</title>
                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
                            </svg>

                            </div>
                            {editingSection === 'personalDetails' ? (
                                <Form className='mt-4 p-4'>
                                    <Form.Group controlId="formFullName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="fullname"
                                            value={formData.personalDetails?.fullname || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.personalDetails?.email || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formPhone">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phone"
                                            value={formData.personalDetails?.phone || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" onClick={handleSubmit}>
                                        Save Changes
                                    </Button>
                                    <Button variant="secondary" onClick={() => setEditingSection(null)} className='ml-2'>
                                        Cancel
                                    </Button>
                                </Form>
                            ) : (
                                <div className='d-flex flex-column mt-4 p-4'>
                                    <p className='text-title'>Personal Details:</p>
                                    <div className='d-flex justify-content-between'>
                                        <p>Full Name: {currentItem.personalDetails?.fullname}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p>Email: {currentItem.personalDetails?.email}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p>Phone Number: {currentItem.personalDetails?.phone}</p>
                                    </div>
                                </div>
                            )}

                            <hr />
                            <div className="edit-btn" onClick={() => setEditingSection('income')}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5">
                            <title>Edit</title>
                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
                            </svg>

                            </div>
                            {editingSection === 'income' ? (
                                <Form className='mt-4 p-4'>
                                    <Form.Group controlId="formSalary">
                                        <Form.Label>Income</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="salary"
                                            value={formData.income?.salary || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formOtherIncome">
                                        <Form.Label>Value</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="otherIncome"
                                            value={formData.income?.otherIncome || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" onClick={handleSubmit}>
                                        Save Changes
                                    </Button>
                                    <Button variant="secondary" onClick={() => setEditingSection(null)} className='ml-2'>
                                        Cancel
                                    </Button>
                                </Form>
                            ) : (
                                <div className='d-flex flex-column mt-4 p-4'>
                                    <p className='text-title'>Income:</p>
                                    <div className='d-flex justify-content-between'>
                                        <p>Income: ${currentItem.income?.salary}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p>Value: ${currentItem.income?.otherIncome}</p>
                                    </div>
                                </div>
                            )}

                            <hr />
                            <div className="edit-btn" onClick={() => setEditingSection('expenses')}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5">
                            <title>Edit</title>
                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
                            </svg>

                            </div>
                            {editingSection === 'expenses' ? (
                                <Form className='mt-4 p-4'>
                                    <Form.Group controlId="formRent">
                                        <Form.Label>Rent</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="rent"
                                            value={formData.expenses?.rent || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formUtilities">
                                        <Form.Label>Utilities Bills</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="utilities"
                                            value={formData.expenses?.utilities || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formOtherExpenses">
                                        <Form.Label>Other Expenses</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="otherExpenses"
                                            value={formData.expenses?.otherExpenses || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" onClick={handleSubmit}>
                                        Save Changes
                                    </Button>
                                    <Button variant="secondary" onClick={() => setEditingSection(null)} className='ml-2'>
                                        Cancel
                                    </Button>
                                </Form>
                            ) : (
                                <div className='d-flex flex-column mt-4 p-4'>
                                    <p className='text-title'>Expenses:</p>
                                    <div className='d-flex justify-content-between'>
                                        <p>Rent: ${currentItem.expenses?.rent}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p>Utilities Bills: ${currentItem.expenses?.utilities}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p>Other Expenses: ${currentItem.expenses?.otherExpenses}</p>
                                    </div>
                                </div>
                            )}

                            <hr />
                           <div className="edit-btn" onClick={() => setEditingSection('assets')}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5">
                            <title>Edit</title>
                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
                            </svg>

                            </div>
                            {editingSection === 'assets' ? (
                                <Form className='mt-4 p-4'>
                                    <p>Edit assets logic here</p>
                                    <Form.Group controlId="formRent">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="type"
                                            value={formData.expenses?.type|| ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formRent">
                                        <Form.Label>Value</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="value"
                                            value={formData.expenses?.value || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                   
                                    <Button variant="primary" onClick={handleSubmit}>
                                        Save Changes
                                    </Button>
                                    <Button variant="secondary" onClick={() => setEditingSection(null)} className='ml-2'>
                                        Cancel
                                    </Button>
                                </Form>
                            ) : (
                                <div className='p-3'>
                                    <p className='text-title'>Assets:</p>
                                    {currentItem.assets?.map((asset, index) => (
                                        <div key={index} className='d-flex flex-column'>
                                            <p>Asset Name: {asset?.type}</p>
                                            <p>Asset Value: ${asset?.value}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <hr />
                            <div className="edit-btn" onClick={() => setEditingSection('liabilities')}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5">
                            <title>Edit</title>
                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
                            </svg>

                            </div>
                            {editingSection === 'liabilities' ? (
                                <Form className='mt-4 p-4'>
                                    <p>Edit liabilities logic here</p>

                                     <Form.Group controlId="formRent">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="type"
                                            value={formData.liabilities?.type|| ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formRent">
                                        <Form.Label>Amout</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="value"
                                            value={formData.liabilities?.amount || ''}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    
                                    <Button variant="primary" onClick={handleSubmit}>
                                        Save Changes
                                    </Button>
                                    <Button variant="secondary" onClick={() => setEditingSection(null)} className='ml-2'>
                                        Cancel
                                    </Button>
                                </Form>
                            ) : (
                                <div className='p-3'>
                                    <p className='text-title'>Liabilities:</p>
                                    {currentItem.liabilities?.map((liability, index) => (
                                        <div key={index} className='d-flex flex-column'>
                                            <p>Liability Name: {liability?.type}</p>
                                            <p>Liability Amount: ${liability?.amount}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
            

        </div>
        
    );
};
