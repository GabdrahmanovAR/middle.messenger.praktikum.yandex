const chatContentTemplate = `
<div id="chatContent" class="chat-content">
  <div class="chat-content__header">
    <div class="chat-content__avatar">
      <img src="{{chatInfo.avatar}}" alt="User avatar" />
    </div>
    <div class="chat-content__user-name">{{chatInfo.name}}</div>
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
</div>
`;

export default chatContentTemplate;
