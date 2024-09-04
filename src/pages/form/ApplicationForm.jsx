import React, { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CreateFormAction } from '../../redux/form/FormAction';
import { Header } from '../../components/header/Header';


export const ApplicationForm = () => {
    const [formData, setFormData] = useState({
        personalDetails: {
            fullname: '',
            email: '',
            phone: '',
        },
        income: {
            salary: '',
            otherIncome: '',
        },
        expenses: {
            rent: '',
            utilities: '',
            otherExpenses: '',
        },
        assets: [{ type: '', value: '' }],
        liabilities: [{ type: '', amount: '' }]
    });
    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem('userInfo'));
    console.log(user._id)
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [section, field] = name.split('.');
        

        setFormData(prevData => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [field]: value
            }
        }));
    };

    const handleArrayChange = (e, index, field) => {
        const { name, value } = e.target;
        setFormData(prevData => {
            const updatedArray = [...prevData[field]];
            updatedArray[index] = { ...updatedArray[index], [name]: value };
            return {
                ...prevData,
                [field]: updatedArray
            };
        });
    };

    const addField = (field) => {
        const newField = field === 'assets' ? { type: '', value: '' } : { type: '', amount: '' };
        setFormData(prevData => ({
            ...prevData,
            [field]: [...prevData[field], newField]
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
       
        
        dispatch(CreateFormAction(formData));
    }
    

   

    return (
        <div>
            <Header/>
        <div className='parent-container'>
           
            <Container>
                <p>Home Loan Application</p>
                <Form onSubmit={handleOnSubmit}>
                    <fieldset>
                        <legend>Personal Details</legend>
                        <div className="mb-7 relative">
                            <input
                                type="text"
                                id="fullname"
                                name="personalDetails.fullname"
                                value={formData?.personalDetails.fullname}
                                onChange={handleChange}
                                placeholder='Full Name'
                                className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                
                                required
                            />
                        </div>
                        <div className="mb-7 relative">
                            <input
                                type="email"
                                id="email"
                                name="personalDetails.email"
                                value={formData?.personalDetails.email}
                                onChange={handleChange}
                                placeholder='Email'
                                className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-7 relative">
                            <input
                                type="number"
                                id="phone"
                                name="personalDetails.phone"
                                value={formData.personalDetails.phone}
                                onChange={handleChange}
                                placeholder='Phone Number'
                                className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                required
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Income</legend>
                        <div className="mb-7 relative">
                            <input
                                type="number"
                                id="salary"
                                name="income.salary"
                                value={formData.income.salary}
                                onChange={handleChange}
                                placeholder='Salary'
                                className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-7 relative">
                            <input
                                type="number"
                                id="otherIncome"
                                name="income.otherIncome"
                                value={formData.income.otherIncome}
                                onChange={handleChange}
                                placeholder='Other Income'
                                className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                required
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Expenses</legend>
                        <div className="mb-7 relative">
                            <input
                                type="number"
                                id="rent"
                                name="expenses.rent"
                                value={formData.expenses.rent}
                                onChange={handleChange}
                                placeholder='$AUD'
                                className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-7 relative">
                            <input
                                type="number"
                                id="utilities"
                                name="expenses.utilities"
                                value={formData.expenses.utilities}
                                onChange={handleChange}
                                placeholder='$AUD...Phone Bill'
                                className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                required

                            />
                        </div>
                        <div className="mb-7 relative">
                            <input
                                type="number"
                                id="otherExpenses"
                                name="expenses.otherExpenses"
                                value={formData.expenses.otherExpenses}
                                onChange={handleChange}
                                placeholder='Other Expenses'
                                className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                required
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Assets</legend>
                        {formData.assets.map((asset, index) => (
                            <div key={index}>
                                <div className="mb-7 relative">
                                    <input
                                        type="text"
                                        id={`assetType-${index}`}
                                        name="type"
                                        value={asset.type}
                                        placeholder='Asset Type'
                                        onChange={(e) => handleArrayChange(e, index, 'assets')}
                                        className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                        required
                                    />
                                </div>
                                <div className="mb-7 relative">
                                    <input
                                        type="number"
                                        id={`assetValue-${index}`}
                                        name="value"
                                        value={asset.value}
                                        onChange={(e) => handleArrayChange(e, index, 'assets')}
                                        placeholder='Asset Value'
                                        className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => addField('assets')} className="mb-7">
                            Add More Assets
                        </button>
                    </fieldset>

                    <fieldset>
                        <legend>Liabilities</legend>
                        {formData.liabilities.map((liability, index) => (
                            <div key={index}>
                                <div className="mb-7 relative">
                                    <input
                                        type="text"
                                        id={`liabilityType-${index}`}
                                        name="type"
                                        value={liability.type}
                                        onChange={(e) => handleArrayChange(e, index, 'liabilities')}
                                        placeholder='Type'
                                        className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                        required

                                    />
                                </div>
                                <div className="mb-7 relative">
                                    <input
                                        type="number"
                                        id={`liabilityAmount-${index}`}
                                        name="amount"
                                        value={liability.amount}
                                        onChange={(e) => handleArrayChange(e, index, 'liabilities')}
                                        placeholder='Amount'
                                        className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => addField('liabilities')} className="mb-7">
                            Add More Liabilities
                        </button>
                    </fieldset>

                    <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Submit</button>
                </Form>
            </Container>
        </div>
            
        </div>
        
    );
};
