import { Builder } from 'builder-pattern';

export class User {
  public readonly id: string;
  public readonly createdAt?: Date = new Date();
  public readonly confirmationSentAt?: Date;
  public readonly recoverySentAt?: Date;
  public readonly emailChangeSentAt?: Date;
  public readonly newEmail?: string;
  public readonly newPhone?: string;
  public readonly invitedAt?: Date;
  public readonly actionLink?: string;
  public readonly email?: string;
  public readonly phone?: string;
  public readonly confirmedAt?: string;
  public readonly emailConfirmedAt?: Date;
  public readonly phoneConfirmedAt?: Date;
  public readonly lastSignInAt?: string;
  public readonly role?: string;
  public readonly updatedAt?: string;

  public get isEmailConfirmed(): boolean {
    return !!this.emailConfirmedAt;
  }

  public get isPhoneConfirmed(): boolean {
    return !!this.phoneConfirmedAt;
  }

  public get isInvited(): boolean {
    return !!this.invitedAt;
  }

  public get lastSignIn(): string | null {
    return this.lastSignInAt ? new Date(this.lastSignInAt).toLocaleString() : null;
  }

  public get contactInfo(): string | null {
    return this.email || this.phone || null;
  }

  public get isActive(): boolean {
    return this.isEmailConfirmed || this.isPhoneConfirmed;
  }

  public static builder(id: string) {
    return Builder(User, { id });
  }
}
