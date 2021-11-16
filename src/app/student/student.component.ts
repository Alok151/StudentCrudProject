import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { ModalService } from '../_modal/modal.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  sttitle:string='Add';
  details:StudentDetails | undefined;
  studentForm:FormGroup=new FormGroup({});
  constructor( private modalService: ModalService) { }

  ngOnInit() {
    this.studentForm=new FormGroup(
      {
        studId:new FormControl(0),
        studname: new FormControl("",[Validators.required,Validators.pattern("^[A-Za-z]+$")]),       
        stage: new FormControl("",[Validators.required]),   
        stper: new FormControl("",[Validators.required]),   
        studstd:new FormControl("",[Validators.required])
      }
    );
  }
  openModal(id: string) {   
    //this.isSubmitted = false;
    this.sttitle = "Add";
    this.emptyForm();
    this.modalService.open(id);
    this.studentForm.controls['studId'].setValue(0);
  }
  openModalbyId(id: string) {
    //this.isSubmitted;
    this.sttitle = "Edit";
    this.modalService.open(id);
  }
  openModalbyIdDet(id: string) {
    this.sttitle = "Details of ";
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }


  studArray:Student[]=[
    new Student(111,'Ravi',18,74,'HSC'),
    new Student(115,'Amit',21,78,'SSC'),
    new Student(117,'Sobhit',19,82,'HSC'),
    new Student(118,'Rohan',22,80,'Graduate'),
    new Student(121,'Suraj',24,95,'Post Graduate')
  ]

  
  ShowStudent(Student) {
    this.sttitle = "Details of ";    
    this.studentForm.controls['studId'].setValue(Student.studId);
    this.studentForm.controls['studname'].patchValue(Student.studName);
    this.studentForm.controls['stage'].patchValue(Student.studAge);
    this.studentForm.controls['stper'].patchValue(Student.studPer);
    this.studentForm.controls['studstd'].patchValue(Student.studStandard);
  }
  EditStudent(Student) {
    this.sttitle = "Edit";    
    this.studentForm.controls['studId'].setValue(Student.studId);
    this.studentForm.controls['studname'].patchValue(Student.studName);
    this.studentForm.controls['stage'].patchValue(Student.studAge);
    this.studentForm.controls['stper'].patchValue(Student.studPer);
    this.studentForm.controls['studstd'].patchValue(Student.studStandard);
  }

  addStudent() {
    
    let Obj = new Student(this.studentForm.controls['studId'].value,this.studentForm.controls['studname'].value,this.studentForm.controls['stage'].value
    ,this.studentForm.controls['stper'].value,this.studentForm.controls['studstd'].value); 
    const maxId = this.studArray.reduce((acc, item) => acc = acc > item.studId ? acc : item.studId, 0);       
          if (this.sttitle == "Edit") {      
            this.studArray.forEach(function(e,ind,arr){
              if(e.studId==Obj.studId)
              {
               arr[ind].studName=Obj.studName;
               arr[ind].studAge=Obj.studAge;
               arr[ind].studPer=Obj.studPer;
               arr[ind].studStandard=Obj.studStandard;
                }
              }
            )      
              alert("Student updated successfully");
            }
            else {
              Obj.studId=maxId+1;
              this.studArray.push(Obj);       
              alert("Student added successfully");
            }

          this.closeModal('custom-modal-1');                

  }

  DelStudDetail(ind1){ 
     
      this.studArray.splice(ind1,1);   
  }
  delrec(studId)
  {    
    alert(studId);
    this.studArray.splice(studId,1);   
  }
  emptyForm() {
    this.studentForm.reset();    
    this.studentForm.controls['studId'].patchValue(0);
    this.studentForm.controls['studname'].patchValue('');
    this.studentForm.controls['stage'].patchValue('');
    this.studentForm.controls['stper'].patchValue('');    
    this.studentForm.controls['studstd'].setValue('');
  }

}
class Student{
  studId:number;
  studName:string;
  studAge:number;
  studPer:number;
  studStandard:string;
  constructor(id:number,name:string,age:number,per:number,std:string){
   this.studId=id;
   this.studName=name;
   this.studAge=age;
   this.studPer=per;
   this.studStandard=std;
  }
}
class StudentDetails{
  studId:number;
  studName:string;
  studAge:number;
  studPer:number;
  studStandard:string;
  constructor(id:number,name:string,Age:number,per:number,Std:string){
    this.studId=id;
    this.studName=name;
    this.studAge=Age;
    this.studPer=per;
    this.studStandard=Std;
   }
}
