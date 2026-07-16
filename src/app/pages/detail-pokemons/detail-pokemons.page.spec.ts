import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailPokemonsPage } from './detail-pokemons.page';

describe('DetailPokemonsPage', () => {
  let component: DetailPokemonsPage;
  let fixture: ComponentFixture<DetailPokemonsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPokemonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
