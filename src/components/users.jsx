import React from "react";
//import api from "../api";

export default function Users() {
  //const [users, setUsers] = useState(api.users.fetchAll());

  const renderPhrase = (number) => {};

  const handleDelete = (userId) => {};

  return (
    <div className="m-5">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Имя</th>
            <th scope="col">Возраст</th>
            <th scope="col">Тэги</th>
            <th scope="col">Профессия</th>
            <th scope="col">Последняя встреча</th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
