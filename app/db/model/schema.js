import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'tickets',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'number', type: 'string'},
        {name: 'remarks', type: 'string', isOptional: true},
      ],
    }),
    tableSchema({
      name: 'ticket_photos',
      columns: [
        {name: 'image_name', type: 'string'},
        {name: 'path', type: 'number'},
      ],
    }),
  ],
});
