import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllTodosData } from "../../reduxtoolkit/Todos";

function Books() {
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.createTodos.userData);
  const [filteredBook, setFilteredBook] = useState([]);

  useEffect(() => {
    let Info = JSON.parse(sessionStorage.getItem("Info"));
    dispatch(fetchAllTodosData(Info?.userId));
  }, []);

  const ShowDetails = (id) => {
    setFilteredBook(allTodos?.filter((obj) => obj.id === id));
  };
  return (
    <div className=" p-1 bg-light">
      <table className="table table-hover table-bordered ">
        <thead>
          <tr>
            <th>Id</th>
            <th>Task Name</th>
            <th>Task Description</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {allTodos?.map((obj, index) => (
            <tr key={obj?.id}>
              <td>{index + 1}</td>
              <td>{obj?.taskName}</td>
              <td>{obj?.taskDescription}</td>
              <td>
                <Link
                  className="btn btn-info"
                  onClick={() => ShowDetails(obj?.id)}
                  data-toggle="modal"
                  data-target="#myModal1"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="modal" id="myModal1">
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title">
                <strong>TITLE: {filteredBook[0]?.taskName}</strong>
              </h6>
              <button type="button" className="close" data-dismiss="modal">
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Description:</strong> {filteredBook[0]?.taskDescription}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Books;
