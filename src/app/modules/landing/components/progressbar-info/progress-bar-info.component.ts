import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-progress-bar-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar-info.component.html',
  styleUrl: './progress-bar-info.component.css'
})
export class ProgressBarInfoComponent {
  @Input()
  skillInfo: Array<{ name: string, level: number }> = []

    
  @Input()
  readonly: boolean = false
  
  @Output()
  skillInfoChange: EventEmitter<any> = new EventEmitter();

  addSkill() {
    const name = prompt('Skill Name')

    if (name) {
      const level = Number(prompt('Input Skill Level (Max 10)'))
      if (level <= 10 && level >= 0) {
        this.skillInfo.push({ name, level })
        this.skillInfoChange.emit(this.skillInfo)
      }
    }
  }

  removeIndex(index: number) {
    this.skillInfo = this.skillInfo.filter((_, idx) => idx !== index)
    this.skillInfoChange.emit(this.skillInfo)
  }

}
