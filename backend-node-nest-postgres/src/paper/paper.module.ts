import { Module } from '@nestjs/common';
import { PaperService } from './paper.service';

@Module({
  providers: [PaperService]
})
export class PaperModule {}
