import Table from 'react-bootstrap/Table';
import './Customtable.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getApplicatonAction } from '../../redux/form/FormAction';
export const CustomTable = () =>{
  const dispatch = useDispatch()

  const {form} = useSelector((state) => state.form)
  useEffect(() => {
    dispatch(getApplicatonAction())
  }, [dispatch]);
  return (
    <div className='table-container'>
      <Table className='mt-5'>
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>
            edit or delete
          </td>
        </tr>
        
        
      </tbody>
    </Table>

    </div>
    
  );
}

