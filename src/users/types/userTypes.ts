export type TUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
};

export type TUserResponseDto = {
  message: string;
};
