import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  CreateTodoData,
  deleteTodo,
  fetchOneTodosData,
  UpdateTodoData,
} from "../../reduxtoolkit/Todos";

function MyBooks() {
  const dispatch = useDispatch();
  const allTodos = useSelector((state) => state.createTodos.OneUsersData);
  const [filteredBook, setFilteredBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState();
  const [newcreatetasks, setnewcreatetasks] = useState({
    taskName: "",
    taskDescription: "",
  });
  useEffect(() => {
    let Info = JSON.parse(sessionStorage.getItem("Info"));
    setUserId(Info?.userId);
    dispatch(fetchOneTodosData(Info?.userId));
  }, [!loading]);

  const handleCreateTaskSubmit = async (e) => {
    try {
      if (validateForm()) {
        dispatch(CreateTodoData({ ...newcreatetasks, userId }));
        setLoading(!loading);
      }
    } catch (error) {
      toast.error("An error occurred while creating the book");
    }
  };
  const ShowDetails = (id) => {
    setFilteredBook(allTodos?.filter((obj) => obj.id === id));
  };

  const HandleCreateForm = (e) => {
    const { name, value } = e.target;
    setnewcreatetasks((prevcreatetasks) => ({
      ...prevcreatetasks,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!newcreatetasks.taskName.trim()) {
      errors.taskName = "taskName is required";
    }
    if (!newcreatetasks.taskDescription.trim()) {
      errors.taskDescription = "taskDescription is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const CloseDATA = () => {
    setnewcreatetasks({
      taskName: "",
      taskDescription: "",
    });
  };

  const DeleteTasksDetails = async (taskId) => {
    try {
      dispatch(deleteTodo(taskId));
      setLoading(!loading);
    } catch (error) {
      toast.error("An error occurred while deleting the Task");
    }
  };

  const UpdateTasksDetails = (TodoID) => {
    let newTask = allTodos.filter((obj) => obj.id === TodoID);
    setnewcreatetasks({
      id: newTask[0].id,
      taskName: newTask[0].taskName,
      taskDescription: newTask[0].taskDescription,
    });
  };

  const handleUpdateTaskSubmit = () => {
    dispatch(UpdateTodoData(newcreatetasks));
    setLoading(!loading);
    setnewcreatetasks({
      taskName: "",
      taskDescription: "",
    });
  };

  return (
    <div className=" p-1 bg-light">
      <div className="p-3  m-2 row bg-light">
        <div class="col-sm-6">
          <Link
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#myModal2"
          >
            CREATE TASKS
          </Link>
        </div>
      </div>

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
              <td>
                <Link
                  className="btn btn-primary"
                  onClick={() => UpdateTasksDetails(obj?.id)}
                  data-toggle="modal"
                  data-target="#myModal3"
                >
                  Update Details
                </Link>
              </td>
              <td>
                <Link
                  className="btn btn-danger"
                  onClick={() => DeleteTasksDetails(obj?.id)}
                >
                  Delete
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
              <h6 className="modal-taskName">
                <strong>Task Name: {filteredBook[0]?.taskName}</strong>
              </h6>
              <button type="button" className="close" data-dismiss="modal">
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Task Description:</strong>{" "}
                {filteredBook[0]?.taskDescription}
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

      {/* modal2 */}
      <div className="modal" id="myModal2">
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={CloseDATA}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div class="form-group">
                  <label htmlFor="taskName">taskName:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="taskName"
                    value={newcreatetasks.taskName}
                    onChange={HandleCreateForm}
                    placeholder="Enter taskName"
                    name="taskName"
                    required
                  />
                  {errors.taskName && (
                    <div className="text-danger">{errors.taskName}</div>
                  )}{" "}
                </div>

                <div class="form-group ">
                  <label htmlFor="taskDescription">taskDescription:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="taskDescription"
                    value={newcreatetasks.taskDescription}
                    onChange={HandleCreateForm}
                    placeholder="Enter taskDescription"
                    name="taskDescription"
                    required
                  />
                  {errors.taskDescription && (
                    <div className="text-danger">{errors.taskDescription}</div>
                  )}{" "}
                </div>
                <Link
                  type="submit"
                  class="btn btn-primary"
                  onClick={handleCreateTaskSubmit}
                  data-dismiss="modal"
                >
                  Submit
                </Link>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={CloseDATA}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* model3 */}
      <div className="modal" id="myModal3">
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={CloseDATA}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div class="form-group">
                  <label htmlFor="taskName">taskName:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="taskName"
                    value={newcreatetasks.taskName}
                    onChange={HandleCreateForm}
                    placeholder="Enter taskName"
                    name="taskName"
                    required
                  />
                  {errors.taskName && (
                    <div className="text-danger">{errors.taskName}</div>
                  )}{" "}
                </div>

                <div class="form-group ">
                  <label htmlFor="taskDescription">taskDescription:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="taskDescription"
                    value={newcreatetasks.taskDescription}
                    onChange={HandleCreateForm}
                    placeholder="Enter taskDescription"
                    name="taskDescription"
                    required
                  />
                  {errors.taskDescription && (
                    <div className="text-danger">{errors.taskDescription}</div>
                  )}{" "}
                </div>
                <Link
                  type="submit"
                  class="btn btn-primary"
                  onClick={handleUpdateTaskSubmit}
                  data-dismiss="modal"
                >
                  Submit
                </Link>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={CloseDATA}
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

export default MyBooks;
