export class UserModule {
  id: string;
  name: string;
  credit: number;
  isLogin: boolean

  constructor( data: any ){
    Object.assign(this, data);
  }
}