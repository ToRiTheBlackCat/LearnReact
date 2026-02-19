import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useTranslation, Trans } from "react-i18next";

const TableUserPaginate = (props) => {
  const { listUsers, pageCount } = props;
  const { t } = useTranslation();

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    props.fetchListUserWithPaginate(+event.selected + 1); //Convert into int
    props.setCurrentPage(+event.selected + 1); //Update current page when click
    console.log(`User requested page number ${event.selected}`);
  };

  return (
    <>
      <table className="table table-hover table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Id.</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={"5"}>Not found data</td>
            </tr>
          )}
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <th scope="row">{item.id}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-info mx-1"
                      onClick={() => props.handleClickBtnView(item)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning mx-1"
                      onClick={() => props.handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => props.handleClickBtnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="user-pagination ">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={props.currentPage - 1} //To move back to the first page after delete -1 because index start from 0
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
