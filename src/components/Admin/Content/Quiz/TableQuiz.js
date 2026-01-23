import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const TableQuiz = (props) => {
  const { listQuiz } = props;

  return (
    <>
      <div>List Quizzes </div>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz && listQuiz.length === 0 && (
            <tr>
              <td colSpan={"5"}>Not found data</td>
            </tr>
          )}

          {listQuiz &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => props.handleClickBtnEdit(item)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger mx-2">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default TableQuiz;
