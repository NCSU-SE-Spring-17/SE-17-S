import { Approach2Page } from './app.po';

describe('approach2 App', function() {
  let page: Approach2Page;

  beforeEach(() => {
    page = new Approach2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
