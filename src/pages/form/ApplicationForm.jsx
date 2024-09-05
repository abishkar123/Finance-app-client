import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CreateFormAction } from '../../redux/form/FormAction';
import { Header } from '../../components/header/Header';

const personalInputs = [
    {
      label: 'Full Name',
      type: 'text',
      name: 'personalDetails.fullname',
      placeholder: 'Sam Smith',
      required: true
    },
    {
      label: 'Email',
      type: 'email',
      name: 'personalDetails.email',
      placeholder: 'example@gmail.com',
      required: true
    },
    {
      label: 'Phone Number',
      type: 'number',
      name: 'personalDetails.phone',
      placeholder: '04234342354',
      required: true
    }
];

const incomeInputs = [
    {
      label: 'Salary',
      type: 'number',
      name: 'income.salary',
      placeholder: '$ Salary by Week',
      required: true
    },
    {
      label: 'Other Income',
      type: 'number',
      name: 'income.otherIncome',
      placeholder: '$ Other Income by year',
      required: true
    }
];

const expenseInputs = [
    {
      label: 'Rent',
      type: 'number',
      name: 'expenses.rent',
      placeholder: '$ Rent By week',
      required: true
    },
    {
      label: 'Utilities',
      type: 'number',
      name: 'expenses.utilities',
      placeholder: '$ Utilities ',
      required: true
    },
    {
      label: 'Other Expenses',
      type: 'number',
      name: 'expenses.otherExpenses',
      placeholder: '$ Other Expenses by month',
      required: true
    }
];

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
    
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [section, field] = name.split('.');
        setFormData((prevData) => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [field]: value
            }
        }));
    };

    const handleArrayChange = (e, index, field) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
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
        setFormData((prevData) => ({
            ...prevData,
            [field]: [...prevData[field], newField]
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        
        dispatch(CreateFormAction(formData));
    };

    const Inputs = (inputsArray) => {
        return inputsArray.map((input, index) => (
            <div key={index} className="mb-7 relative">
                <input
                    type={input.type}
                    name={input.name}
                    value={formData[input.name.split('.')[0]][input.name.split('.')[1]]}
                    onChange={handleChange}
                    placeholder={input.placeholder}
                    className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                    required={input.required}
                />
            </div>
        ));
    };

    return (
        <div>
            <Header />
            <div className='parent-container'>
                <Container>
                    <p className='font-semibold text-xl'>Home Loan Application:</p>
                    <Form onSubmit={handleOnSubmit}>
                        <fieldset>
                            <legend>Personal Details</legend>
                            {Inputs(personalInputs)}
                        </fieldset>

                        <fieldset>
                            <legend>Income</legend>
                            {Inputs(incomeInputs)}
                        </fieldset>

                        <fieldset>
                            <legend>Expenses</legend>
                            {Inputs(expenseInputs)}
                        </fieldset>

                    
                        <fieldset>
                            <legend>Assets</legend>
                            {formData.assets.map((asset, index) => (
                                <div key={index}>
                                    <div className="mb-7 relative">
                                        <input
                                            type="text"
                                            name="type"
                                            value={asset.type}
                                            onChange={(e) => handleArrayChange(e, index, 'assets')}
                                            placeholder="ex: Car"
                                            className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="mb-7 relative">
                                        <input
                                            type="number"
                                            name="value"
                                            value={asset.value}
                                            onChange={(e) => handleArrayChange(e, index, 'assets')}
                                            placeholder=" $Asset Value"
                                            className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={() => addField('assets')} className="mb-7">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5985E1">
                            <title>Add More Asset </title>
                            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                            </svg>
                            </button>
                        </fieldset>

                        <fieldset>
                            <legend>Liabilities</legend>
                            
                            {formData.liabilities.map((liability, index) => (
                                <div key={index}>
                                    <div className="mb-7 relative">
                                        <input
                                            type="text"
                                            name="type"
                                            value={liability.type}
                                            onChange={(e) => handleArrayChange(e, index, 'liabilities')}
                                            placeholder="ex- Credit Card"
                                            className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="mb-7 relative">
                                        <input
                                            type="number"
                                            name="amount"
                                            value={liability.amount}
                                            onChange={(e) => handleArrayChange(e, index, 'liabilities')}
                                            placeholder="$Amount"
                                            className="w-100 p-3 custom-form rounded-lg focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                            ))}

                            <button   type="button"  onClick={() => addField('liabilities')} className="mb-7">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5985E1">
                            <title>Add More liability </title>
                            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                            </svg>

                            </button>
                            
                        </fieldset>

                        <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Submit</button>
                    </Form>
                </Container>
            </div>
        </div>
    );
};
