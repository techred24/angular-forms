import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
// import { Storage, ref, uploadBytes, listAll, getDownloadURL, StorageReference } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage
    // private storage: Storage
  ) { 
    this.buildForm()
  }

  ngOnInit(): void {
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
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
      this.createCategory();
    } else {
      this.form.markAllAsTouched();
    }
  }
  private createCategory() {
    const data = this.form.value;
    this.categoriesService.createCategory(data)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/admin/categories'])
      })
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
          console.log(url);
          this.imageField.setValue(url);
        })
      })
    )
    .subscribe()
  }

  // uploadFile(event: any) {
  //   const image = event.target.files[0];
  //   const name = image.name;

  //   const imgRef = ref(this.storage,`imagenes/${name}`);
  //   const task = uploadBytes(imgRef,image);

  //   task
  //     .then(response => {
  //       console.log(response);
  //       this.getImage(name)
  //     })
  //     .catch(error => console.log(error))
  // }

  // getImage(nameImage:string) {
  //   const imgRef = ref(this.storage, 'imagenes')
  //   listAll(imgRef)
  //     .then( async rta => {

  //       const itemActual: StorageReference|undefined = rta.items.find(item => item.name === nameImage);

  //       if(itemActual){
  //         const url = await getDownloadURL(itemActual)
  //         this.imageField?.setValue(url);
  //         console.log(url);
  //       }

  //     })
  // }

}
