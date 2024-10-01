import { IsEmail } from 'class-validator';

export class UpdateUserEmailDto {
  @IsEmail()
  newEmail: string;
}
