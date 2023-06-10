// with interface

interface User {
  id: number;
  name: string;
  email: string;
}

export const fetchUsersWithInterface = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const user: Array<User> = await response.json();
  return user;
};


//with Zod
import { z } from "zod";


const userSchema = z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
    })
  );


type UserType = z.infer<typeof userSchema>;

export const fetchUsersWithZod = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  //parse with zod
  const user= await userSchema.parseAsync(response.json());
  return user;
};
