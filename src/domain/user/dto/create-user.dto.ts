import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ each: true })
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
