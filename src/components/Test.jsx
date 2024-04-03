import React, { useEffect, useState } from "react";

function Test() {
  return (
    <>
      <div>
        <ul>
          {users?.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Test;
