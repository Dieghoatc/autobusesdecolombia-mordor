import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('company')
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @ApiOperation({ summary: 'Lista todas las empresas transportadoras' })
    @Get()
    findAll() {
        return this.companyService.findAll();
    }

    @ApiOperation({ summary: 'Lista todos los servicios ofrecidos por las empresas' })
    @Get('service')
    findAllServices() {
        return this.companyService.findAllServices();
    }
}
