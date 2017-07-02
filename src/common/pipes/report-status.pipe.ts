import { Pipe, PipeTransform } from '@angular/core';
/*
 * TODO - when upgraded to typescript 2.4 look at String enum
 * https://blogs.msdn.microsoft.com/typescript/2017/06/27/announcing-typescript-2-4/
 * */
@Pipe({
	name: 'reportStatus'
})
export class ReportStatusPipe implements PipeTransform {

	public transform (status: any): string {
		switch(status) {
			case 1:
				return 'Submitted';
			default:
				return 'Open';
		}
	}
}