import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('person')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('first_name', 'varchar(255)', (col) => col.notNull())
		.addColumn('last_name', 'varchar(255)')
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('person').execute();
}
