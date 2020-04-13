import { Paper } from './paper.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Paper)
export class PaperRepository extends Repository<Paper> {
}
