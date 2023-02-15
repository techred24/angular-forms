import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { MyValidators } from 'src/app/utils/validators';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category.models';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  image$: Observable<string>;
  @Input() category:Category;
  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private categoriesService: CategoriesService
  ) {
    this.buildForm()
  }

  ngOnInit(): void {
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)], [MyValidators.validateCategory(this.categoriesService)]],
      image: ['', Validators.required]
    });
  }
  get nameField() {
    return this.form.get('name');
  }
  get imageField() {
    return this.form.get('image');
  }
  save () {
    if (this.form.valid) {
      if (this.category) {
        this.update.emit(this.form.value);
      } else {
        this.create.emit(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
  uploadFile(event) {
    const image = event.target.files[0];
    const name = 'category.png';
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        const urlImage$ = ref.getDownloadURL();
        urlImage$.subscribe((url) => {
          console.log(url, 'LA URL')
          console.log(url);
          this.imageField.setValue(url);
        })
      })
    )
    .subscribe()
  }

}
