import { AngularWebsocketChatPage } from './app.po';

describe('angular-websocket-chat App', () => {
  let page: AngularWebsocketChatPage;

  beforeEach(() => {
    page = new AngularWebsocketChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
