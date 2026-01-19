import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { PublicUrl } from './common/decorators/public.decorator';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @PublicUrl()
  @ApiOperation({
    summary: 'API root endpoint',
    description: 'Get welcome message and API information.',
  })
  @ApiResponse({
    status: 200,
    description: 'Welcome message',
    schema: {
      example: 'Welcome to Your Local Guide API',
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
