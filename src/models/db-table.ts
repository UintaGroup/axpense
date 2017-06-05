import {IDbColumn} from './db-column';

export interface IDbTable {
	name: string;
	isObject?: boolean;
	columns: Array<IDbColumn>;
	estimatedSize?: number;
}