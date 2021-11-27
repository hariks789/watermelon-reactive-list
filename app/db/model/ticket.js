import {Model} from '@nozbe/watermelondb';
import {
  field,
  relation,
  children,
  action,
} from '@nozbe/watermelondb/decorators';

export default class Ticket extends Model {
  static table = 'tickets';

  @field('name')
  name;

  @field('number')
  number;

  @field('remarks')
  remarks;
}
