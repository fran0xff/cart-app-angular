import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../services/product.service";
import { finddAll, load } from "../products.actions";
import { EMPTY, catchError, exhaustMap, map, of} from "rxjs";

@Injectable()
export class ProductsEffects {

    loadProduct$ = createEffect(
        () => this.actions$.pipe(
            ofType(load),
            exhaustMap(() => this.service.findAll())
        ).pipe(
            map( products => ( finddAll({products})))
        )
    
    );
 
    constructor(
        private actions$: Actions,
        private service: ProductService) {

    }
    
}