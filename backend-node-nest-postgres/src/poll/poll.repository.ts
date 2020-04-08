import { Poll } from './poll.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Poll)
export class PollRepository extends Repository<Poll> {
}
