import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public categories: string[] = []; // API'den gelecek kategoriler

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  private fetchCategories(): void {
    const apiUrl = `https://newsapi.org/v2/top-headlines/sources?apiKey=223d61cd6e5a43d683afc6f5405454d3`;

    this.http.get<any>(apiUrl).subscribe(
      (res) => {
        // API'nin dönen kategorileri `res.sources` gibi bir yapıda olduğunu varsayıyoruz
        this.categories = Array.from(
          new Set(res.sources.map((source: any) => source.category))
        );
        console.log('Categories:', this.categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
