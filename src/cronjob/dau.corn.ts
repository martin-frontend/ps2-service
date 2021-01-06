import { AnalysisService } from 'src/analysis/analysis.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class DauCorn {
    constructor(private readonly analysisService: AnalysisService) {}
    async CreateDau() {
        const dau = await this.analysisService.createDau();
        console.log(132)
    }
}
