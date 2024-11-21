import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public data: any;
  
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.fetchData();
  }

  public fetchData(){
    this.http.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=223d61cd6e5a43d683afc6f5405454d3`)
      .subscribe(res => {
        console.log(res);
        this.data = res;
      })
  }

}
