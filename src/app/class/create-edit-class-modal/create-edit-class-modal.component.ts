import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-create-edit-class-modal",
  templateUrl: "./create-edit-class-modal.component.html",
  styleUrls: ["./create-edit-class-modal.component.css"]
})
export class CreateEditClassModalComponent {

  @Input()
  create: boolean = true;

  @Input()
  nome: string = "";

  @Input()
  anno_scolastico: number = this.minYear;

  get minYear(): number {
    return new Date().getFullYear();
  }

  constructor(public activeModal: NgbActiveModal) { }

  submit() {
    this.activeModal.close({nome: this.nome, anno_scolastico: this.anno_scolastico});
  }

}
