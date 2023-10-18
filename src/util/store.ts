import { writable } from 'svelte/store';
export interface IReservationData {
	id: number;
	content: string;
	customerName: string;
	guestCount: number;
	phoneNumber: string;
	reservationDate: string;
	tables: Array<string>;
	status: boolean;
}
export const reservationData = writable<Array<IReservationData>>([]);
