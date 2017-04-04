import { Ng3D3Page } from './app.po';

describe('ng3-d3 App', function() {
  let page: Ng3D3Page;

  beforeEach(() => {
    page = new Ng3D3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
