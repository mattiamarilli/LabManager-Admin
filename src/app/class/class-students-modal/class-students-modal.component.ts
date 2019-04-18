import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IClasse, IStudente } from "../../model";

@Component({
  selector: "app-class-students-modal",
  templateUrl: "./class-students-modal.component.html",
  styleUrls: ["./class-students-modal.component.css"]
})
export class ClassStudentsModalComponent {

  @Input()
  classe: IClasse;

  @Input()
  studenti: Array<IStudente>;

  constructor(public activeModal: NgbActiveModal) { }

}
