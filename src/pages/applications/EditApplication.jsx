import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  getApplicatonAction, updateApplicationAction } from '../../redux/form/FormAction';
import { Button, Form } from 'react-bootstrap';
import '../../App.css';

export const EditApplication = () => {
    const dispatch = useDispatch();
    const { _id } = useParams();
    const { form } = useSelector((state) => state.form);

    const [currentItem, setCurrentItem] = useState(null);
    const [editingSection, setEditingSection] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        dispatch( getApplicatonAction());
    }, [dispatch]);

    useEffect(() => {
        if (form.length > 0) {
            const item = form.find(item => item._id === _id);
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
    }, [form, _id]);

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
        <div className='content-container'>
            <p className='text-3xl font-semibold text-center p-3'>Application Details:</p>
            <div className='edit-content d-flex flex-column mt-4 p-4'>
                {currentItem && (
                    <>
                        <div className='d-flex flex-column mt-4 p-4 bg-brown-200'>
                            <Button variant="primary" onClick={() => setEditingSection('personalDetails')}>
                                Edit Personal Details
                            </Button>
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
                                    <p>Personal Details:</p>
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
                            <Button variant="primary" onClick={() => setEditingSection('income')}>
                                Edit Income
                            </Button>
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
                                    <p>Income:</p>
                                    <div className='d-flex justify-content-between'>
                                        <p>Income: ${currentItem.income?.salary}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p>Value: ${currentItem.income?.otherIncome}</p>
                                    </div>
                                </div>
                            )}

                            <hr />
                            <Button variant="primary" onClick={() => setEditingSection('expenses')}>
                                Edit Expenses
                            </Button>
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
                                    <p>Expenses:</p>
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
                            <Button variant="primary" onClick={() => setEditingSection('assets')}>
                                Edit Assets
                            </Button>
                            {editingSection === 'assets' ? (
                                <Form className='mt-4 p-4'>
                                    <p>Edit assets logic here</p>
                                    {/* Add appropriate form fields for assets if needed */}
                                    <Button variant="primary" onClick={handleSubmit}>
                                        Save Changes
                                    </Button>
                                    <Button variant="secondary" onClick={() => setEditingSection(null)} className='ml-2'>
                                        Cancel
                                    </Button>
                                </Form>
                            ) : (
                                <div className='p-3'>
                                    <p>Assets:</p>
                                    {currentItem.assets?.map((asset, index) => (
                                        <div key={index} className='d-flex flex-column'>
                                            <p>Asset Name: {asset?.type}</p>
                                            <p>Asset Value: ${asset?.value}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <hr />
                            <Button variant="primary" onClick={() => setEditingSection('liabilities')}>
                                Edit Liabilities
                            </Button>
                            {editingSection === 'liabilities' ? (
                                <Form className='mt-4 p-4'>
                                    <p>Edit liabilities logic here</p>
                                    {/* Add appropriate form fields for liabilities if needed */}
                                    <Button variant="primary" onClick={handleSubmit}>
                                        Save Changes
                                    </Button>
                                    <Button variant="secondary" onClick={() => setEditingSection(null)} className='ml-2'>
                                        Cancel
                                    </Button>
                                </Form>
                            ) : (
                                <div className='p-3'>
                                    <p>Liabilities:</p>
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
    );
};
