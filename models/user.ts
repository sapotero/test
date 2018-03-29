export enum ROLE {
  ADMIN,
  COSTING,
  BUYER,
  SUPPLIER
}

export interface User {
  name?: string;
  email: string;
  password: string;
}

interface UserWithRoles {
  role: ROLE;
  users: User[]
}

export const userWithRoles = {
  ADMIN: [
    {
      name: "admin",
      password: "password",
      email: "admin@mail.com"
    }
  ],
  COSTING: [
    {
      name: "cost",
      password: "password",
      email: "cost@mail.com"
    }
  ],
  BUYER: [
    {
      name: "buy",
      password: "password",
      email: "buy@mail.com"
    }
  ],
  SUPPLIER: [
    {
      name: "sup",
      password: "password",
      email: "sup@mail.com"
    }
  ]
};