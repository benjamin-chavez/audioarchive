// apps/server/@types/tableTypes/eventsTable.ts
import { Knex } from 'knex';
import { Event } from '@shared/src/schemas';

declare module 'knex/types/tables' {
  interface Tables {
    events: Event;
    events_composite: Knex.CompositeTableType<
      Event,
      Pick<Event, 'data' | 'source' | 'processing_errors' | 'status'> &
        Partial<Omit<Event, 'id'>>,
      Partial<Omit<Event, 'id'>>
    >;
  }
}
