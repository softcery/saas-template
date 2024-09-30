import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { EmailPasswordCredentialsDto } from '~modules/auth/application/dto/email-password-credentials.dto';
import { AuthGuardToken } from '~modules/auth/constants';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

import { ValidationFailedException } from 'src/core/validation/domain/exceptions/validation-failed/validation-failed.exception';
import {
  ICredentials,
  ISupabaseCredentialsAuthStrategyOptions,
  SupabaseCredentialsLoginAuthStrategy as Strategy,
} from 'src/lib/passport-supabase';

@Injectable()
export class SupabaseEmailPasswordLoginAuthStrategy extends PassportStrategy(Strategy, AuthGuardToken.EMAIL_PASSWORD) {
  constructor(@Inject(BaseToken.APP_CONFIG) appConfig: IAppConfigService) {
    const options: ISupabaseCredentialsAuthStrategyOptions = {
      supabaseKey: appConfig.get('SUPABASE_SECRET_KEY'),
      supabaseUrl: appConfig.get('SUPABASE_URL'),
      extractor: (req: Request) => this.validateDto(req.body),
    };
    super(options);
  }

  private async validateDto(dto: unknown): Promise<ICredentials> {
    const dtoInstance = plainToInstance(EmailPasswordCredentialsDto, dto);
    const errors = await validate(dtoInstance);

    if (errors.length) {
      throw ValidationFailedException.from(errors);
    }

    return dtoInstance;
  }
}
