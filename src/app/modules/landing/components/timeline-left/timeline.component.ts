import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-timeline-left',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineLeftComponent {
  @Input()
  experienceInfo: Array<{ name: string, roles: string, startDate: Date, endDate: Date }> = []

    
  @Input()
  readonly: boolean = false
  
  @Output()
  experienceInfoChange: EventEmitter<any> = new EventEmitter();

  removeIndex(index: number) {
    this.experienceInfo = this.experienceInfo.filter((_, idx) => idx !== index)
    this.experienceInfoChange.emit(this.experienceInfo)
  }

  addExperienceInfo() {
    let name = prompt('Enter Company Name')
    if (name) {
      let roles = prompt('Enter Roles')
      if (roles) {
        let d1 = new Date(prompt('Enter Start Date (yyyy-mm-dd)') ?? '')
        if (d1) {
          let d2 = new Date(prompt('Enter End Date (yyyy-mm-dd)') ?? '')
          if (d2) {
            this.experienceInfo.push({ name, roles, startDate: d1, endDate: d2 })
          }
        }
      }
    }
  }
}
