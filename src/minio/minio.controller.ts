// app.controller.ts
import {
    Controller,
    Get,
    Post,
    Param,
    Delete,
    UploadedFile,
    UseInterceptors,
    UseGuards
  } from '@nestjs/common'
import { MinioService } from './minio.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { Roles } from 'src/roles/roles.decorator'
import { RoleEnum } from 'src/roles/roles.enum'
import { RolesGuard } from 'src/roles/roles.guard'
  
@ApiTags('Minio')
@Controller({
  path: 'file',
  version: '1',
})
export class MinioController {
    constructor(private readonly minioService: MinioService) {}
  
    @Post('covers')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadBookCover(@UploadedFile() file: Express.Multer.File | Express.MulterS3.File) {
      await this.minioService.createBucketIfNotExists()
      const fileName = await this.minioService.uploadFile(file)
      return fileName
    }
  
    @Get('covers/:fileName')
    async getBookCover(@Param('fileName') fileName: string) {
      const fileUrl = await this.minioService.getFileUrl(fileName)
      return fileUrl
    }
  
    @Delete('covers/:fileName')
    async deleteBookCover(@Param('fileName') fileName: string) {
      await this.minioService.deleteFile(fileName)
      return fileName
    }
  }
  