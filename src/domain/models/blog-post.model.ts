import { UserModel } from './user.model';

export class BlogPostModel {
  private _id: string;
  private _title: string;
  private _content: string;
  private _author: UserModel;

  constructor(title: string, content: string, author: UserModel, id?: string) {
    this._id = id;
    this._title = title;
    this._content = content;
    this._author = author;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  get author(): UserModel {
    return this._author;
  }

  set content(content: string) {
    this._content = content;
  }

  set title(title: string) {
    this._title = title;
  }

  isValid(): boolean {
    return this._title.length > 0 && this._content.length > 0;
  }
}