import { User } from "./User.interface";
import { Package } from './Package.interface';

export interface Order {
	orderId: string;
	user: User;
	packages: Package[];


}