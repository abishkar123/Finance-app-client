import React from 'react';
import { Form } from 'react-bootstrap';

export const CustomeInput = ({ label, ...rest }) => {
  return (
    <div className='mb-7 relative '>
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control {...rest} />
      </Form.Group>
    </div>
  );
};
