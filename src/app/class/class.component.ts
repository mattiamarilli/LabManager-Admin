import { Component, OnInit } from "@angular/core";
import { ClassService } from "../services/class.service";
import { StudentService } from "../services/student.service";
import { IClasse } from "../model";
import { IStudente } from "../model";
import { IClasseBody } from "../model_body";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-class",
  templateUrl: "./class.component.html",
  styleUrls: ["./class.component.css"]
})
export class ClassComponent implements OnInit {

  classi: Array<IClasse>;
  elencoStudenti: Array<IStudente>;
  id_classe: number;
  classe: IClasseBody;
  result: string;
  filter: string;

  // Modal
  nomec: string = "";
  anno_scolastico: number = null;
  warning: string = "";

  constructor(
    private classService: ClassService,
    private modalService: NgbModal,
    private studentService: StudentService) { }

  ngOnInit() {
    this.classService.getClassi().subscribe((data: Array<IClasse>) => {
      this.classi = data;
    });

    this.classService.loadClassi();
  }

  validationClass(enable: any) {
    this.warning = "";
    this.id_classe = enable.value;
    if (!enable.checked) {
      this.classService.disable(this.id_classe).subscribe((data: any) => {
        if (data.code === 200) {
          this.classService.loadClassi();
        } else {
          this.warning = data.message;
        }
      });
    } else {
      this.classService.enable(this.id_classe).subscribe((data: any) => {
          if (data.code === 200) {
            this.classService.loadClassi();
            this.modalService.dismissAll();
          } else {
            this.warning = data.message;
          }
        }
      );
    }
  }

  // Modal
  open(content) {
    this.anno_scolastico = null;
    this.nomec = "";
    this.warning = "";
    this.modalService.open(content, {ariaLabelledBy: "modal-basic-titile"});
  }

  openClassModify(modify, id_classe) {
    this.id_classe = id_classe;
    for (const c of this.classi) {
      if (id_classe === c.id_classe) {
        this.classe.nome = c.nome;
        this.classe.anno_scolastico = c.anno_scolastico;
      }
    }
    this.modalService.open(modify, {ariaLabelledBy: "modal-basic-titile"});
  }

  openStudent(student, id_classe) {
    this.id_classe = id_classe;
    this.getStudentByClass();
    this.modalService.open(student, {ariaLabelledBy: "modal-basic-titile"});
  }

  addClass() {
    this.classe.nome = this.nomec;
    this.classe.anno_scolastico = this.anno_scolastico;
    this.classService.setClasse(this.classe).subscribe((data: any) => {
      if (data.code === 200) {
        this.classService.loadClassi();
        this.modalService.dismissAll();
      } else {
        this.modalService.dismissAll();
        this.warning = data.message;
      }
    });
  }

  getStudentByClass() {
    this.elencoStudenti = [];
    this.studentService.getStudenti().subscribe((studenti: Array<IStudente>) => {
      for (const studente of studenti) {
          if (studente.id_classe === this.id_classe) {
            this.elencoStudenti.push(studente);
          }
        }
    });
  }

  modifyClass() {
    this.classService.modifyClass(this.classe, this.id_classe).subscribe((data: any) => {
      if (data.code === 200) {
        this.classService.loadClassi();
        this.modalService.dismissAll();
      } else {
        this.modalService.dismissAll();
        this.warning = data.message;
      }
    });
  }

  deleteClass(id_classe) {
    this.classService.deleteClass(id_classe).subscribe((data: any) => {
      if (data.code === 200) {
        this.classService.loadClassi();
      } else {
        this.modalService.dismissAll();
        this.warning = data.message;
      }
    });
  }
}
