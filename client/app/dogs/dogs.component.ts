import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DogService } from '../services/dog.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Dog } from '../shared/models/dog.model';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css'],
})
export class DogsComponent implements OnInit {

  dog = new Dog();
  dogs: Dog[] = [];
  isLoading = true;
  isEditing = false;

  adddogForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);
  race = new FormControl('', Validators.required);
  color = new FormControl('', Validators.required);

  constructor(private dogService: DogService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getdogs();
    this.adddogForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight,
      race: this.race,
      color: this.color,
    });
  }

  getdogs() {
    this.dogService.getdogs().subscribe(
      data => this.dogs = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  adddog() {
    this.dogService.adddog(this.adddogForm.value).subscribe(
      (res) => {
        this.dogs.push(res);
        this.adddogForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  enableEditing(dog: Dog) {
    this.isEditing = true;
    this.dog = dog;
  }

  cancelEditing() {
    this.isEditing = false;
    this.dog = new Dog();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the dogs to reset the editing
    this.getdogs();
  }

  editdog(dog: Dog) {
    this.dogService.editdog(dog).subscribe(
      () => {
        this.isEditing = false;
        this.dog = dog;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  deletedog(dog: Dog) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dogService.deletedog(dog).subscribe(
        () => {
          const pos = this.dogs.map(elem => elem._id).indexOf(dog._id);
          this.dogs.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }

}
