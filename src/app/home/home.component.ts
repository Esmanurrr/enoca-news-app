import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public data: any;
  public category: string = 'general';
  
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.fetchData();
  }

  public fetchData(){
    this.http.get<any>(`https://newsapi.org/v2/top-headlines?country=us&category=${this.category}&apiKey=223d61cd6e5a43d683afc6f5405454d3`)
      .subscribe(res => {
        console.log(res);
        this.data = res;
      })
  }

}
