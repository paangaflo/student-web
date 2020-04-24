import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StudentService } from '../student.service';
import { Student } from '../student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html'
})

export class StudentComponent implements OnInit {
  dataSaved = false;
  studentForm: any;
  allStudents: Observable<Student[]>;
  studentIdUpdate = null;
  massage = null;

  constructor(private formbulider: FormBuilder, private studentService: StudentService) { }

  ngOnInit() {
    this.studentForm = this.formbulider.group({
      Username: ['', [Validators.required]],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Age: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      Career: ['', [Validators.required]],
    });
    this.loadAllStudents();
  }

  loadAllStudents() {
    this.allStudents = this.studentService.getAllStudent();
  }

  onFormSubmit() {
    this.dataSaved = false;
    const student = this.studentForm.value;
    this.CreateStudent(student);
    this.studentForm.reset();
  }

  loadStudentToEdit(studentId: string) {
    this.studentService.getStudentById(studentId).subscribe(student => {
      this.massage = null;
      this.dataSaved = false;
      this.studentIdUpdate = student.id;
      this.studentForm.controls['Username'].setValue(student.username);
      this.studentForm.controls['FirstName'].setValue(student.firstName);
      this.studentForm.controls['LastName'].setValue(student.lastName);
      this.studentForm.controls['Age'].setValue(student.age);
      this.studentForm.controls['Career'].setValue(student.career);
    });
  }

  CreateStudent(student: Student) {
    if (this.studentIdUpdate == null) {
      this.studentService.createStudent(student).subscribe(
        () => {
          this.dataSaved = true;
          this.massage = 'Record saved Successfully';
          this.loadAllStudents();
          this.studentIdUpdate = null;
          this.studentForm.reset();
        }
      );
    } else {
      student.id = this.studentIdUpdate;
      this.studentService.updateStudent(student).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully';
        this.loadAllStudents();
        this.studentIdUpdate = null;
        this.studentForm.reset();
      });
    }
  }

  deleteStudent(studentId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.studentService.deleteStudentsById(studentId).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Deleted Succefully';
        this.loadAllStudents();
        this.studentIdUpdate = null;
        this.studentForm.reset();

      });
    }
  }

  resetForm() {
    this.studentForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }
}
