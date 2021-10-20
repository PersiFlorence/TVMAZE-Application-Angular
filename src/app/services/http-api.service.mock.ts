import { of } from 'rxjs';

export class HttpApiServiceMock {
  constructor() { }

  public get() {
    return of({});
  }

}
