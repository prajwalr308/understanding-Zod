import React from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  fetchUsersWithInterface,
  fetchUsersWithZod,
  fetchUsersWithZodWorking,
} from "./api";

const FetchUsers = () => {
  const queryClient = useQueryClient();
  const { data: userWithInterface } = useQuery("user", fetchUsersWithInterface);
  const { data: userWithZod } = useQuery("userZod", fetchUsersWithZod);

  const { data: userZodWorking } = useQuery(
    "userZodWorking",
    fetchUsersWithZodWorking
  );

  if (userWithInterface)
    console.log(
      "🚀 ~ file: FetchUser.tsx:14 ~ FetchUsers ~ userWithInterface:",
      userWithInterface
    );

  if (userWithZod)
    console.log(
      "🚀 ~ file: FetchUser.tsx:17 ~ FetchUsers ~ userWithZod:",
      userWithZod
    );

  if (userZodWorking)
    console.log(
      "🚀 ~ file: FetchUser.tsx:33 ~ FetchUsers ~ userZodWorking:",
      userZodWorking
    );

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
      <h1>Fetch Users with zod error schema</h1>
      <div>
        {userWithZod?.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))}
        <div>Error because of wrong zod schema</div>
      </div>
      <h1>Fetch Users with zod Working schema</h1>
      <div>
        {userZodWorking?.map((user) => (
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
