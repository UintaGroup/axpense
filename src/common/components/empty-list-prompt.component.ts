import { Component, Input } from '@angular/core';

@Component({
	selector: 'empty-list-prompt',
	template: `
		<h2 text-right>{{text}}
			<ion-icon name="arrow-round-up" class="prompt-icon" color="secondary"></ion-icon>
		</h2>
	`
})
export class EmptyListPrompt {

	@Input()
	public text: string;
}
