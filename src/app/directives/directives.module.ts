import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DialogDirective } from "./dialog.directive";

@NgModule({
    imports: [CommonModule],
    declarations: [DialogDirective],
    exports: [DialogDirective]
})

export class DirectivesModule { }