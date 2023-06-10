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

const userErrorSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  test: z.string(),
});

type UserType = z.infer<typeof userErrorSchema>;

export const fetchUsersWithZod = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json(); // Await the JSON response

    const validatedUsers = userErrorSchema.array().parse(users);

    return validatedUsers;
  } catch (err) {
    console.log(err);
  }
};


const userWorkingSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  address: z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: z.object({
      lat: z.string(),
      lng: z.string(),
    }),
  }),
  phone: z.string(),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),

    bs: z.string(),
  }),
});

export const fetchUsersWithZodWorking = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json(); // Await the JSON response

    const validatedUsers = userWorkingSchema.array().parse(users);

    return validatedUsers;
  } catch (err) {
    console.log(err);
  }
};
