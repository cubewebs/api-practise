import { User } from "./User.interface";
import { Package } from './Package.interface';

export interface Order extends User, Package {
	id: number;
	userId: number;
	packages: Package[];


}