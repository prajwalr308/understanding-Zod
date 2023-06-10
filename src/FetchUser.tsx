import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchUsersWithInterface, fetchUsersWithZod } from "./api";


const FetchUsers = () => {
  const queryClient = useQueryClient();
  const { data:userWithInterface } = useQuery("user", fetchUsersWithInterface);
  const {data:userWithZod}=useQuery("userZod",fetchUsersWithZod)

 

  if (userWithInterface) console.log(userWithInterface);

  if(userWithZod) console.log(userWithZod)
  
  return (
    <div>
      
      <button
        onClick={() => {
          queryClient.invalidateQueries("user");
          queryClient.invalidateQueries("userZod");
        }}
      >
        Invalidate
      </button>
      <h1>Fetch Users with interface</h1>
      <div>
        {userWithInterface?.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
      <h1>Fetch Users with zod</h1>
      <div>
        {userWithZod?.map((user) => (

          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
  

};

export default FetchUsers;
