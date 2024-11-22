import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public category: string = 'general'; // Varsayılan kategori
  public news: any[] = []; // Haber makaleleri

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // URL'deki kategori parametresini al
    this.route.params.subscribe((params) => {
      this.category = params['category'] || 'general';
      this.fetchNews();
    });
  }

  private fetchNews(): void {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${this.category}&apiKey=223d61cd6e5a43d683afc6f5405454d3`;

    this.http.get<any>(apiUrl).subscribe(
      (res) => {
        this.news = res.articles; // Gelen haberleri kaydet
      },
      (error) => {
        console.error('Error fetching news:', error);
      }
    );
  }
}
