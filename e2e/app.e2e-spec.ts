import { CoStart.MePage } from './app.po';

describe('co-start.me App', () => {
  let page: CoStart.MePage;

  beforeEach(() => {
    page = new CoStart.MePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
