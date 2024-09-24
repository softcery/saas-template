import { Injectable, Scope } from '@nestjs/common';
import { AuthError } from '@supabase/supabase-js';

import { IAuthService } from '~modules/auth/application/services/auth-service.interface';

import { AppException } from 'src/core/exceptions/domain/exceptions/base/app.exception';
import { CustomException } from 'src/core/exceptions/domain/exceptions/custom-exception/dynamic.exception';

import { SupabaseSessionMapper } from '../../mappers/session/supabase-session.mapper';
import { SupabaseUserMapper } from '../../mappers/user/supabase-user.mapper';
import { SupabaseAuthenticatedClientService } from '../supabase-authenticated-client/supabase-authenticated-client.service';
import { SupabaseClientService } from '../supabase-client/supabase-client.service';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseAuthService implements IAuthService {
  constructor(
    private readonly supabaseAuthenticatedClientService: SupabaseAuthenticatedClientService,
    private readonly supabaseClientService: SupabaseClientService,
    private readonly supabaseSessionMapper: SupabaseSessionMapper,
    private readonly supabaseUserMapper: SupabaseUserMapper,
  ) {}

  async refreshSession(refreshToken: string) {
    const { data, error } = await this.supabaseAuthenticatedClientService.client.auth.refreshSession({
      refresh_token: refreshToken,
    });
    if (error) throw this.supabaseErrorToAppException(error);
    const session = data.session ? this.supabaseSessionMapper.toDomain(data.session) : null;
    return session;
  }

  async updateEmail(email: string) {
    const { data, error } = await this.supabaseAuthenticatedClientService.client.auth.updateUser({ email });
    if (error) throw this.supabaseErrorToAppException(error);
    const user = data.user ? this.supabaseUserMapper.toDomain(data.user) : null;
    return user;
  }

  async updatePassword(password: string) {
    const { error } = await this.supabaseAuthenticatedClientService.client.auth.updateUser({ password });
    if (error) throw this.supabaseErrorToAppException(error);
  }

  private supabaseErrorToAppException(error: AuthError): AppException {
    return CustomException.builder().message(error.message).code(error.code).httpStatus(error.status).build();
  }

  isPasswordMatching(passwordCandidate: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  userHasPassword(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public async sendResetPasswordEmail(email: string, redirectUrl: string): Promise<void> {
    const { error } = await this.supabaseClientService.client.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    });
    if (error) throw this.supabaseErrorToAppException(error);
  }
}
