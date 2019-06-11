import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

declare module 'redux' {
  export interface Dispatch<A> {
    <S, E, R>(asyncAction: ThunkAction<R, S, E, A>): R;
  }
}
