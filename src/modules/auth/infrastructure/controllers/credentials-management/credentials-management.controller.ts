import { Body, Controller, Inject, Post } from '@nestjs/common';

import { ResetPasswordDto } from '~modules/auth/application/dto/reset-password.dto';
import { SendResetPasswordConfirmationDto } from '~modules/auth/application/dto/send-reset-password-confirmation.dto';
import { UpdateUserEmailDto } from '~modules/auth/application/dto/update-user-email.dto';
import { UpdateUserPasswordDto } from '~modules/auth/application/dto/update-user-password.dto';
import { IChangeEmailUseCase } from '~modules/auth/application/use-cases/change-email/change-email-use-case.interface';
import { IChangePasswordUseCase } from '~modules/auth/application/use-cases/change-password/change-password-use-case.interface';
import { IResetPasswordUseCase } from '~modules/auth/application/use-cases/reset-password/reset-password-use-case.interface';
import { ISendResetPasswordConfirmationUseCase } from '~modules/auth/application/use-cases/send-reset-password-confirmation/send-reset-password-confirmation-use-case.interface';
import { AuthDiToken } from '~modules/auth/constants';
import { User } from '~modules/auth/domain/entities/user.entity';

import { ReqUser } from '../../decorators/user/user.decorator';

@Controller('auth/credentials')
export class CredentialsManagementController {
  constructor(
    @Inject(AuthDiToken.CHANGE_PASSWORD_USE_CASE) private readonly changePasswordUseCase: IChangePasswordUseCase,
    @Inject(AuthDiToken.CHANGE_EMAIL_USE_CASE) private readonly changeEmailUseCase: IChangeEmailUseCase,
    @Inject(AuthDiToken.SEND_RESET_PASSWORD_CONFIRMATION_USE_CASE)
    private readonly sendResetPasswordConfirmationUseCase: ISendResetPasswordConfirmationUseCase,
    @Inject(AuthDiToken.RESET_PASSWORD_USE_CASE) private readonly resetPasswordUseCase: IResetPasswordUseCase,
  ) {}

  @Post('/password')
  public async changePassword(@Body() dto: UpdateUserPasswordDto) {
    return this.changePasswordUseCase.execute(dto);
  }

  @Post('/email')
  public async changeEmail(@Body() dto: UpdateUserEmailDto) {
    return this.changeEmailUseCase.execute(dto);
  }

  @Post('/password/send-reset-confirmation')
  public async sendPasswordResetConfirmation(@Body() dto: SendResetPasswordConfirmationDto) {
    return this.sendResetPasswordConfirmationUseCase.execute(dto);
  }

  @Post('/password/reset')
  public async resetPassword(@Body() dto: ResetPasswordDto, @ReqUser() user: User) {
    return this.resetPasswordUseCase.execute({
      newPassword: dto.newPassword,
      user,
    });
  }
}
