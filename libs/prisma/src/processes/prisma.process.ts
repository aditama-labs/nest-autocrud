import { DefaultProcess } from '@autocrud/skeleton/processes/default.process';

export class PrismaProcess extends DefaultProcess {
  protected delegate;

  setDelegate(delegate) {
    this.delegate = delegate;
  }

  get getDelegate() {
    return this.delegate;
  }
}
