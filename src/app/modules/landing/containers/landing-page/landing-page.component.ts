import { Component } from '@angular/core';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { TimelineLeftComponent } from '../../components/timeline-left/timeline.component';
import { ProgressBarInfoComponent } from '../../components/progressbar-info/progress-bar-info.component';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { CommonModule } from '@angular/common';
import jsonProvince from '../../../../../assets/thai-province.json'
import jsonDistrict from '../../../../../assets/thai-district.json'
import jsonSubDistrict from '../../../../../assets/thai-sub-district.json'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [TimelineComponent,
    TimelineLeftComponent,
    ProgressBarInfoComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  myForm: FormGroup;
  provinces: any[] = jsonProvince
  districts: any[] = jsonDistrict
  subDistricts: any[] = jsonSubDistrict
  educationInfo: Array<{ name: string, year: number }> = []
  experienceInfo: Array<{ name: string, roles: string, startDate: Date, endDate: Date }> = []
  skillInfo: Array<{ name: string, level: number }> = []
  contractInfo: FormGroup
  interestsInfo: string[] = []
  guildInfo: string[] = []
  disabledAll: boolean = false;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.contractInfo = this.fb.group({
      address: '',
      subDistrict: '',
      district: '',
      province: '',
      postalCode: '',
      facebook: '',
      lineId: '',
      instagram: ''
    })

    this.myForm = this.fb.group({
      username: '',
      nickname: '',
      firstName: '',
      lastName: '',
      position: '',
      nationality: '',
      telephoneNumber: '',
      startingDate: ''
    });
  }

  private formatDate(date: string) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.disabledAll = true
      this.http.get<any>('http://localhost:3000/user-info/' + id).subscribe({
        next: data => {
          console.log("🚀 ~ ListPageComponent ~ ngOnInit ~ data:", data)
          this.educationInfo = data?.educationInfo
          this.experienceInfo = data?.experienceInfo?.map((info: any) => ({
            ...info,
            startDate: new Date(info.startDate),
            endDate: new Date(info.endDate),
          }))
          this.guildInfo = data?.guildInfo
          this.interestsInfo = data?.interestsInfo
          this.skillInfo = data?.skillInfo
          this.myForm.patchValue({ ...data, startingDate: this.formatDate(data?.startingDate) })
          this.contractInfo.patchValue({ ...data.contactInfo })
        },
        error: error => {
          alert('ID Not Found!!')
          this.router.navigate(['']);
        }
      })
    }
    console.log("🚀 ~ LandingPageComponent ~ ngOnInit ~ id:", id)
  }

  onContractChange() {
    if (this.contractInfo.value.province) {
      this.districts = jsonDistrict.filter(({ province_id }: any) => province_id === parseInt(this.contractInfo.value.province))
    }
    if (this.contractInfo.value.district) {
      this.subDistricts = jsonSubDistrict.filter(({ amphure_id }: any) => amphure_id === parseInt(this.contractInfo.value.district))
    }

    if (this.contractInfo.value.subDistrict && this.contractInfo.value.province && this.contractInfo.value.district) {
      this.contractInfo.patchValue({ postalCode: jsonSubDistrict.filter(({ id }: any) => id === parseInt(this.contractInfo.value.subDistrict))[0]?.zip_code })
    }
  }


  addInterestsInfo() {
    let name = prompt('Enter Interests')
    if (name) {
      this.interestsInfo.push(name)
    }

  }
  addGuildInfoInfo() {
    let name = prompt('Enter Guild')
    if (name) {
      this.guildInfo.push(name)
    }
  }
  removeGuildInfo(index: number) {
    this.guildInfo = this.guildInfo.filter((_, idx) => idx !== index)
  }

  removeInterestsInfo(index: number) {
    this.interestsInfo = this.interestsInfo.filter((_, idx) => idx !== index)
  }

  onBackToHome() {
    this.router.navigate(['']);
  }
  onSubmitClick() {
    const body = {
      educationInfo: this.educationInfo,
      experienceInfo: this.experienceInfo,
      skillInfo: this.skillInfo,
      contactInfo: this.contractInfo.value,
      ...this.myForm.value,
      interestsInfo: this.interestsInfo,
      guildInfo: this.guildInfo
    }
    if (this.disabledAll) this.router.navigate(['']);
    else
      this.http.post<any>('http://localhost:3000/user-info', body).subscribe({
        next: data => {
          this.router.navigate(['']);

        },
        error: error => {
          alert(JSON.stringify(error))
        }
      })
  }
}
