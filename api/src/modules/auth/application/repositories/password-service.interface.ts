export interface IPasswordService {
  confirm(candidatePassword: string, hashedPassword: string): Promise<boolean>;
}
