const chatContentTemplate = `
<div id="chatContent" class="chat-content">
  {{#if selectedChat.id}}
    <div class="chat-content__header">
      <div class="chat-content__avatar">
        {{#if selectedChat.avatar}}
          <img src="{{selectedChat.avatar}}" alt="User avatar" />
        {{else}}
          <div class="chat-content__avatar_default"></div>
        {{/if}}
      </div>
      <div class="chat-content__user-name">{{selectedChat.title}}</div>
      <div class="chat-content__utils">
        {{{ PropertiesButton }}}
      </div>
    </div>

    <div class="chat-content__chat">
      {{{ MessageListComponent }}}
    </div>

    <div class="chat-input">
      <div class="chat-input__settings">
        {{{ PinButton }}}
      </div>
      <div class="chat-input__input">
        {{{ InputTextComponent }}}
      </div>
      <div class="chat-input__send-button">
        {{{ SendButton }}}
      </div>
    </div>

    {{{ PropertiesDropdown }}}
    {{{ PinDropdown }}}
  {{else}}
    <div class="container center">
      <h3>Выберите чат, чтобы написать сообщение</h3>
    </div>
  {{/if}}
</div>
`;

export default chatContentTemplate;
