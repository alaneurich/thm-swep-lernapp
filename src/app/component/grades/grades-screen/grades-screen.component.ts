import { Component, OnInit } from '@angular/core';
import {AppbarService} from '../../../service/appbar.service';
import {Grade} from '../../../class/grade';
import {GradeWrapper} from '../../../class/grade-wrapper';
import {ModuleService} from '../../../service/module.service';
import {GradesService} from '../../../service/grades.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades-screen.component.html',
  styleUrls: ['./grades-screen.component.scss']
})
export class GradesScreenComponent implements OnInit {

  grades: GradeWrapper[];

  constructor(
    private appbar: AppbarService,
    private gradesService: GradesService,
    private modules: ModuleService
  ) { }

  ngOnInit(): void {
    this.appbar.setTitle('Leistungen');

    const gradesFromDb = this.gradesService.getItems();
    const gradeWrappers = [];

    for (const grade of gradesFromDb) {
      const wrapper = new GradeWrapper();
      wrapper.grade = grade;
      wrapper.module = this.modules.getItemById(grade.moduleId);
      gradeWrappers.push(wrapper);
    }

    this.grades = gradeWrappers;
  }

  getCreditPoints(): number {
    let cp = 0;
    this.grades.forEach(grade => cp += grade.module.creditPoints);
    return cp;
  }

  getAverageGrade(): number {
    let grade = 0;
    this.grades.forEach(currGrade => grade += currGrade.grade.grade);
    grade /= this.grades.length;
    grade = Math.round((grade + Number.EPSILON) * 100) / 100;
    return grade;
  }
}