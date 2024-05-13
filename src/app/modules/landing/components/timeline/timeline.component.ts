import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements OnInit {
  @Input()
  educationInfo: Array<{ name: string, year: number }> = []
  
  @Input()
  readonly: boolean = false
  
  @Output()
  educationInfoChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {

  }

  removeIndex(index: number) {
    this.educationInfo = this.educationInfo.filter((_, idx) => idx !== index)
    this.educationInfoChange.emit(this.educationInfo)
  }

  addEducationInfo() {
    const year = prompt('Graduation year')
    if (year) {
      const name = prompt('Academy Name')
      if (year && name) {
        this.educationInfo.push({ name, year: parseInt(year) })
        this.educationInfoChange.emit(this.educationInfo)
      }
    }
  }
}
