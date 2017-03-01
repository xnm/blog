/* Created by Aquariuslt on 2017-03-02. */


export class BlogConfig {
  private _outerLinkMap: Map<string,Array<OuterLink>>;

  constructor() {
  }


  get outerLinkMap(): Map<string, Array<OuterLink>> {
    return this._outerLinkMap;
  }

  set outerLinkMap(value: Map<string, Array<OuterLink>>) {
    this._outerLinkMap = value;
  }
}


class OuterLink {
  private _url: string;
  private _name: string;
  private _description?: string;


  constructor(url: string, name: string, description: string) {
    this._url = url;
    this._name = name;
    this._description = description;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
}

