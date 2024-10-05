import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { getApplicatonAction, deleteApplicationAction } from '../../redux/form/FormAction';
import { Link } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';
import './Customtable.css'

const CustomTable = () => {
  const dispatch = useDispatch();
  const { form, totalPages } = useSelector((state) => state.form);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); 
  const [selectedIds, setSelectedIds] = useState([]);

  const [showform, Setshowform] = useState([])

  useEffect(() => {
    if (page && limit) {
      dispatch(getApplicatonAction(page, limit));
    }
  }, [page, limit, dispatch]);



  const startItem = (page - 1) * limit;
  const endItem = startItem + limit;

  const handlePageClick = (selectedPage) => {
    const newPage = selectedPage.selected + 1;
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setPage(1);
  };

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;

    if (value === "all") {
      checked ? setSelectedIds(form.map((item) => item._id)) : setSelectedIds([]);
      return;
    }

    checked
      ? setSelectedIds([...selectedIds, value])
      : setSelectedIds(selectedIds.filter((id) => id !== value));
  };

  const handleOnDelete = () => {
    if (window.confirm("Are you sure you want to delete the application(s)?")) {
      dispatch(deleteApplicationAction(selectedIds));
      setSelectedIds([]);
    }
  };
 

  return (
    <div className='table-container'>
      <Container>
        
      <div className="mt-4">
          <label>
            Items per page:
            <select value={limit} onChange={handleLimitChange} className="form-select">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>
        <Table className='mt-5'>
          <thead>
            <tr>
              <th>
                Delete <input type="checkbox" value="all" onChange={handleOnSelect} />
              </th>
              <th>Item No</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {form.lists?.length > 0 ? (
              form.lists.map((item, i) => (
                <tr key={item._id}>
                  <td>
                    {startItem + i + 1}{" "}
                    <input
                      type="checkbox"
                      value={item._id}
                      onChange={handleOnSelect}
                      checked={selectedIds.includes(item._id)}
                    />
                  </td>
                  <td>{startItem + i + 1}</td>
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
                <td colSpan="6">No data available</td>
              </tr>
            )}
          </tbody>
        </Table>

        <ReactPaginate
          breakLabel="..."
          nextLabel="next>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="<previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />


        {selectedIds.length > 0 && (
          <div className="d-grid mb-4">
            <button className="btn btn-danger" onClick={handleOnDelete}>
              Delete {selectedIds.length} Selected Items
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CustomTable;
