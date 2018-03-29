import {ROLE, User, userWithRoles} from "../models/user";

const users = userWithRoles;

export interface UserValidationResult{
  valid: boolean;
  role?: ROLE;
  user?: User
}

export function validateUser(user: User): UserValidationResult{
  let result: UserValidationResult = <UserValidationResult>{valid: false};

  if (user != null){
    Object.keys(userWithRoles).forEach( role => {

      userWithRoles[role].forEach( (validationUser: User) => {

        if ( validationUser.email.toLocaleLowerCase() == user.email.toLocaleLowerCase() &&
          validationUser.password == user.password) {
          result = <UserValidationResult>{
            valid: true,
            role: ROLE[role],
            user: validationUser
          };
        }
      });

    });
  }

  return result;
}
