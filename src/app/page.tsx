import { db } from '@/lib/db';
import { pseudoRandomBytes } from 'crypto';
import { revalidatePath } from 'next/cache';
import { prependOnceListener } from 'process';

export default async function Home() {
	const people = await db.selectFrom('person').selectAll().execute();

	async function save(formData: FormData) {
		'use server';

		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;

		const result = await db
			.insertInto('person')
			.values({
				first_name: firstName,
				last_name: lastName,
			})
			.execute();

		console.log(result);
		revalidatePath('/');
	}

	return (
		<div>
			<form action={save}>
				<input type="text" name="firstName" placeholder="First name=" />
				<input type="text" name="lastName" placeholder="Last name=" />
				<button>Save</button>
			</form>

			<hr />

			<ul>
				{people.map((person) => (
					<li key={person.id}>
						{person.first_name} {person.last_name}
					</li>
				))}
			</ul>
		</div>
	);
}
