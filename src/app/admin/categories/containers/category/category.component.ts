import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute, Params } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from 'src/app/core/models/category.models';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: Category;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.getCategory(params.id);
      }
    })
  }
  private getCategory(id: string) {
    this.categoriesService.getCategory(id)
      .subscribe(data => {
        this.category = data;
        console.log(data);
      })
  }
  createCategory(data) {
    this.categoriesService.createCategory(data)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/admin/categories'])
      })
  }
  updateCategory(data) {
    this.categoriesService.updateCategory(this.category.id, data)
      .subscribe(rta => {
        this.router.navigate(['/admin/categories']);
      })
  }

}
