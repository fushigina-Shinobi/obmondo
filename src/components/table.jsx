import React from 'react';

const Table = ({ data, currentPage, loading }) => {
  return (
    <div>
      <h2>USERS INFORMATION</h2>
      <table>
        <thead>
          <tr>
            <th>SL No.</th>
            <th>Name</th>
            <th>Job Title</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {data?.slice(0, 10)?.map((user) => (
            <tr key={user?.ID}>
              <td>{user?.ID}</td>
              <td>{user?.FirstNameLastName}</td>
              <td>{user?.JobTitle}</td>
              <td>{user?.Email}</td>
              <td>{user?.Phone}</td>
              <td>{user?.Company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
