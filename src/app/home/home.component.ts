import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Attribute, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SliderComponent } from "../components/slider/slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule, RouterModule, SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  slides: any[] = [];
  public data: any;
  
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.fetchData();
  }

  
  goToLink(url: string): void {
    window.open(url, '_blank');
  }

  public fetchData(){
    this.http.get<any>(`https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=223d61cd6e5a43d683afc6f5405454d3`)
      .subscribe(res => {
        this.slides = res.articles.filter((article: any) => article.urlToImage).slice(0,3)
        .map((article: any) => (
          {
            urlToImage: article.urlToImage,
            url:article.url,
            title: article.title,
            author: article.author || 'Unknown Author'
          }
        ))
        this.data = res;
        console.log(this.data);
        console.log('Images:', this.slides); 
        this.cdr.detectChanges(); 
      })
  }
}
