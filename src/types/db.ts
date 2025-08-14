import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface Database {
	person: PersonTable;
}

export interface PersonTable {
	id: Generated<number>;
	first_name: string;
	last_name: string | null;
}

export type Person = Selectable<PersonTable>;
export type NewPerson = Insertable<PersonTable>;
export type PersonUpdate = Updateable<PersonTable>;
