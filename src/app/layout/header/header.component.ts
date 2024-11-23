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
  public categories: string[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  private fetchCategories(): void {
    const apiUrl = `https://newsapi.org/v2/top-headlines/sources?apiKey=ec0943c1136e4d3db66172a52bc810b6`;

    this.http.get<any>(apiUrl).subscribe(
      (res) => {
        this.categories = Array.from(
          new Set(res.sources.map((source: any) => source.category).slice(1))
        );
        console.log('Categories:', this.categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
