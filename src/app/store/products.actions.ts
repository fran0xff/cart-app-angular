import { createAction, props } from '@ngrx/store';


export const load = createAction('load');
export const finddAll= createAction('findAll', props<{products: any}>());
