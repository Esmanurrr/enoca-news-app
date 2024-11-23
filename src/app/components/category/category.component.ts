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
  public category: string = 'general'; 
  public news: any[] = []; 
  filteredNews: any[] = [];
  public selectedCountry: string = 'us'; // Varsayılan ülke (United States)
  public countries = [ // Desteklenen ülkeler
    { code: 'us', name: 'United States' },
    { code: 'de', name: 'Germany' },
    { code: 'fr', name: 'France' }
  ];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // URL'deki kategori parametresini al
    this.route.params.subscribe((params) => {
      this.category = params['category'] || 'general';
      this.fetchNewsForUS();
    });
  }

  private fetchNewsForUS(): void {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${this.category}&apiKey=ec0943c1136e4d3db66172a52bc810b6`;

    this.http.get<any>(apiUrl).subscribe(
      (res) => {
        this.news = res.articles || []; // Haberleri kaydet
      },
      (error) => {
        console.error('Error fetching news for US:', error);
      }
    );
  }

  private fetchNewsForOtherCountries(countryCode: string): void {
    const sourcesApiUrl = `https://newsapi.org/v2/top-headlines/sources?country=${countryCode}&apiKey=ec0943c1136e4d3db66172a52bc810b6`;

    // Önce kaynakları çek
    this.http.get<any>(sourcesApiUrl).subscribe(
      (res) => {
        const sources = res.sources.map((source: any) => source.id).join(',');
        if (sources) {
          // Kaynaklara göre haberleri çek
          const headlinesApiUrl = `https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=ec0943c1136e4d3db66172a52bc810b6`;

          this.http.get<any>(headlinesApiUrl).subscribe(
            (headlinesRes) => {
              this.news = headlinesRes.articles || []; // Haberleri kaydet
            },
            (error) => {
              console.error('Error fetching news from sources:', error);
            }
          );
        } else {
          console.warn('No sources found for this country.');
          this.news = []; // Eğer kaynak bulunamazsa haberleri temizle
        }
      },
      (error) => {
        console.error('Error fetching sources:', error);
      }
    );
  }

  // Kullanıcı ülke değiştirdiğinde bu metot çağrılır
  public changeCountry(countryCode: string): void {
    this.selectedCountry = countryCode;

    if (countryCode === 'us') {
      // ABD için doğrudan top-headlines API'sini kullan
      this.fetchNewsForUS();
    } else {
      // Diğer ülkeler için sources API'sini kullan
      this.fetchNewsForOtherCountries(countryCode);
    }
  }
}
