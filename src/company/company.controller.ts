import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('company')
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @ApiOperation({ summary: 'List all transport companies' })
    @Get()
    findAll() {
        return this.companyService.findAll();
    }

    @ApiOperation({ summary: 'List all services offered by companies' })
    @Get('service')
    findAllServices() {
        return this.companyService.findAllServices();
    }
}
