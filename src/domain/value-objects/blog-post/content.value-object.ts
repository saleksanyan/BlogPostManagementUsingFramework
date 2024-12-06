import { ValueObject } from '../value-object';

export class Content extends ValueObject<String> {
  private constructor(private value: string) {
    super();
  }

  public static create(value: string) {
    if (!value || typeof value !== 'string' || value.length == 0) {
      throw new Error('Content should be a string and cannot be empty');
    }

    return new Content(value);
  }

  public getAtomicValues(): Iterable<String> {
    return [this.value];
  }

  public getValue(): string {
    return this.value;
  }

  public setValue(value: string): void {
    this.value = value;
  }
}