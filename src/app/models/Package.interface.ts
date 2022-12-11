export interface Package {
	id: number;
	netWeight: number;
	grossWeight: number;
	description: string;
	transport: string;
	status: string;
	orderId: number;
}