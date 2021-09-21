import { Component, DoCheck, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { IGoodItem } from 'src/app/models/goods.model';
import { FavouritesService } from 'src/app/services/favourites/favourites.service';
import { GoodService } from 'src/app/services/good/good.service';
import { NavigationService } from 'src/app/services/navigation/navigation.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { SetGoodId } from 'src/app/store/shop.actions';
import Shop from 'src/app/store/shop.state';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, DoCheck {

  currentGood$: IGoodItem;

  currentCategory: string = '';

  currentSubCategory: string = '';

  constructor (
    private store: Store, 
    public goodService: GoodService, 
    private shoppingCartService: ShoppingCartService, 
    private favouritesService: FavouritesService,
    private navService: NavigationService
  ) {}

  ngOnInit() {
    this.currentCategory = this.store.selectSnapshot(Shop.currentCategory).name;
    this.currentSubCategory = this.store.selectSnapshot(Shop.currentSubCategory).name;
  }

  ngDoCheck() {
    this.currentGood$ = this.store.selectSnapshot(Shop.details);
  }

  onClickInCart(good: IGoodItem) {
    good.isInCart ? this.navService.navigateToCart() : this.shoppingCartService.putGoodInCart(good.id);
    this.store.dispatch(new SetGoodId(good.id));
  }

  onClickInFavourite(good: IGoodItem) {
    good.isFavorite ? this.navService.navigateToFavourites() : this.favouritesService.putGoodInFavourite(good.id);
    this.store.dispatch(new SetGoodId(good.id));
  }

}
