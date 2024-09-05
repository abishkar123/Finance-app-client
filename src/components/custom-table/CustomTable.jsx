import Table from 'react-bootstrap/Table';
import './Customtable.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteApplicationAction, getApplicatonAction } from '../../redux/form/FormAction';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export const CustomTable = () => {
  const dispatch = useDispatch();
  const [showlists, setShowlists] = useState([]);
  const [ids, setIds] = useState([]);

  const { form } = useSelector((state) => state.form);
  const {user} = useSelector((state)=>state.user)

  // const _id = user?._id; 
  // console.log(_id, form)

  // const applicationbyuser = form?.length ? form.filter(item=>item.form._id === _id) :[]

  // console.log(applicationbyuser)
  useEffect(() => {
    
    if(!showlists.length)
      dispatch(getApplicatonAction());{
        setShowlists(form)
      }
   }, [showlists, dispatch, form]);


  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    if (value === "all") {
      checked ? setIds(form.map((item) => item._id)) : setIds([]);
      return;
    }

    checked
      ? setIds([...ids, value])
      : setIds(ids.filter((item) => item !== value));
  };

  const handleOnDelete = ()=>{
    if (window.confirm("Are you sure you want to delete the application(s)")){
      dispatch(deleteApplicationAction(ids))
      setIds([])
    }
  }

 
  return (
    <div className='table-container'>
       <Container>
       <Table className='mt-5'>
        <thead>
          <tr>
          <th>
              #  {""}<input type="checkbox" value="all" onChange={handleOnSelect} />
              </th>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {showlists.length > 0 ? (
            showlists.map((item, i) => (
              <tr key={item._id}>


               <td>{i + 1} {""}
              <input
                  type="checkbox"
                  value={item._id}
                  onChange={handleOnSelect}
                  checked={ids.includes(item._id)}
                /></td>
                <td>{i + 1}</td>
                <td>{item.personalDetails.fullname}</td>
                <td>{item.personalDetails.email}</td>
                <td>{item.personalDetails.phone}</td>
                <td>
                <Link to={`/my-application/${item._id}`}>
                <button variant="warning">
                  <i className="fa-solid fa-pen-to-square"></i>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5"><path d="M560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v120h-80v-80H520v-200H240v640h240v80H240Zm280-400Zm241 199-19-18 37 37-18-19Z"/></svg> 
               
                </button></Link>
                  

                  </td>
                  
                   

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </Table>

      {ids.length > 0 && (
        <div className="d-grid mb-4">
          <button variant="danger" onClick={handleOnDelete}>
            Delete {ids.length} Selected Items
          </button>
        </div>
      )}

       </Container>
      
      
    </div>
  );
}
