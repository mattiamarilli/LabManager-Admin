import { Component, OnInit } from "@angular/core";
import { ClassService } from "../services/class.service";
import { StudentService } from "../services/student.service";
import { IClasse, IStudente } from "../model";
import { IClasseBody } from "../model_body";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ClassStudentsModalComponent } from "./class-students-modal/class-students-modal.component";
import { CreateEditClassModalComponent } from "./create-edit-class-modal/create-edit-class-modal.component";

@Component({
  selector: "app-class",
  templateUrl: "./class.component.html",
  styleUrls: ["./class.component.css"]
})
export class ClassComponent implements OnInit {

  classi: Array<IClasse>;

  constructor(
    private classService: ClassService,
    private modalService: NgbModal,
    private studentService: StudentService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.classService.getClassi().subscribe((data: Array<IClasse>) => {
      this.classi = data;
    });

    this.classService.loadClassi();
  }

  toggleClass(classe: IClasse) {
    if (!classe.enabled) {
      this.classService.enable(classe.id_classe).subscribe((data: any) => {
        if (data.code === 200) {
          this.classService.loadClassi();
          this.toastr.success("Classe abilitata");
        } else {
          this.toastr.error("Errore");
          console.log(data.message);
        }
      });
    } else {
      this.classService.disable(classe.id_classe).subscribe((data: any) => {
        if (data.code === 200) {
          this.classService.loadClassi();
          this.toastr.success("Classe disabilitata");
        } else {
          this.toastr.error("Errore");
          console.log(data.message);
        }
      });
    }
  }

  showStudents(classe: IClasse) {
    this.studentService.getStudenti().subscribe((studenti: Array<IStudente>) => {

      studenti = studenti.filter((studente) => studente.id_classe === classe.id_classe);

      if (!studenti.length) {
        this.toastr.info("Classe vuota");

        return;
      }

      const modalRef = this.modalService.open(ClassStudentsModalComponent);
      modalRef.componentInstance.classe = classe;
      modalRef.componentInstance.studenti = studenti;

    });
  }

  showCreateClass() {
    const modalRef = this.modalService.open(CreateEditClassModalComponent);
    modalRef.componentInstance.create = true;
    modalRef.result
      .then((classe) => {

        this.classService.addClasse(classe).subscribe((data: any) => {
          if (data.code === 200) {
            this.classService.loadClassi();
            this.toastr.success("Classe creata");
          } else {
            this.toastr.error("Errore");
            console.log(data.message);
          }
        });

      });
  }

  showEditClass(classe: IClasse) {
    const modalRef = this.modalService.open(CreateEditClassModalComponent);
    modalRef.componentInstance.create = false;
    modalRef.componentInstance.nome = classe.nome;
    modalRef.componentInstance.anno_scolastico = classe.anno_scolastico;

    modalRef.result
      .then((res) => {

        this.classService.modifyClass(res, classe.id_classe).subscribe((data: any) => {

          if (data.code === 200) {
            this.classService.loadClassi();
            this.toastr.success("Modifiche salvate");
          } else {
            this.toastr.error("Errore");
            console.log(data.message);
          }
        });

      });
  }

  deleteClass(classe: IClasse) {
    this.classService.deleteClass(classe.id_classe).subscribe((data: any) => {
      if (data.code === 200) {
        this.classService.loadClassi();
        this.toastr.success("Classe eliminata");
      } else {
        this.toastr.error("Errore");
        console.log(data.message);
      }
    });
  }
}
