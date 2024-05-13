import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }
  userInfos: any[] = []

  gotoCreateInfo() {
    this.router.navigate(['create']);
  }

  gotoViewInfo(id: number) {
    this.router.navigate([`view/${id}`]);
  }

  fetchNewData() {
    this.http.get<any>('http://localhost:3000/user-info').subscribe({
      next: data => {
        console.log("🚀 ~ ListPageComponent ~ ngOnInit ~ data:", data)
        this.userInfos = data
      },
      error: error => {
        alert(JSON.stringify(error))
      }
    })
  }
  
  ngOnInit() {
    this.fetchNewData()
  }
  deleteUserInfo(id: number) {
    this.http.delete<any>(`http://localhost:3000/user-info/${id}`).subscribe({
      next: () => {
        this.fetchNewData()
      },
      error: error => {
        alert(JSON.stringify(error))
      }
    })
  }
}
