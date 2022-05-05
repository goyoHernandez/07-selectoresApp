import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  mySelectorsForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    frontier: ['', Validators.required]
  });

  regions: string[] = [];
  countries: Country[] = []
  frontiers: string[] = []
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.regions = this.countriesService.Regions;

    this.mySelectorsForm.get('region')?.valueChanges
      .pipe(
        tap((_) => {
          this.mySelectorsForm.get('country')?.reset('');
          this.loading = true;
        }),
        switchMap(region => this.countriesService.GetCountriesByRegion(region))
      ).subscribe(countries => {
        this.countries = countries
        this.loading = false;
      });

    this.mySelectorsForm.get('country')?.valueChanges
      .pipe(
        tap((_) => {
          this.loading = true;
          this.mySelectorsForm.get('frontier')?.reset('');
        }),
        switchMap(code => this.countriesService.GetCountryByCode(code))
      )
      .subscribe(countries => {
        this.frontiers = countries?.borders || [];
        this.loading = false;
      });
  }

  Save = () => {
    console.log(this.mySelectorsForm.value);
  }

}
