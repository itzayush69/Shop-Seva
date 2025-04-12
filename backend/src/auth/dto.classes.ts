export class SignupSellerDto {
  name: string;
  email: string;
  password: string;
  role: 'SELLER';
}

export class SignupUserDto {
  name: string;
  email: string;
  password: string;
  role: 'USER';
}

export class SigninDto {
  email: string;
  password: string;
}
