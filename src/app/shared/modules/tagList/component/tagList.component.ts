import { Component, Input } from "@angular/core";


@Component({
    selector: 'mc-tag-list',
    templateUrl: './tagList.component.html',
})
export class TagListComponent {
    @Input('tags') tagsProps!: string[];
}
