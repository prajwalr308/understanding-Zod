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

// write zod schema for user
import { z } from "zod";


const userSchema = z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
    })
  );

//now assign the type of userSchema to User type userSchema should be an array

type UserType = z.infer<typeof userSchema>;

export const fetchUsersWithZod = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  //parse with zod
  const user= await userSchema.parseAsync(response.json());
  return user;
};
