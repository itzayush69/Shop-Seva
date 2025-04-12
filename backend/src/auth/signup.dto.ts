export class SignupSellerDto {
  name: string;
  email: string;
  password: string;
  shopName: string;
  role: 'SELLER';
}

export class SignupUserDto {
  name: string;
  email: string;
  password: string;
  role: 'USER';
}
