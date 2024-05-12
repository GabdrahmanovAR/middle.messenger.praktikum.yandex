const chatTemplate = `
<div class="container chat-container">
  <div class="sidebar">
    <div class="sidebar__settings">
      {{{ AddChatButton }}}
      {{{ ProfileButton }}}
    </div>
    <div class="sidebar__search">
      {{{ SearchField }}}
    </div>
    <div class="sidebar__list">
      {{{ ChatListComponent }}}
    </div>
  </div>

  <div class="chat-section">
    {{{ ChatContentComponent }}}
  </div>
  {{{ ChatModal }}}
  {{{ ConfirmModal }}}
  {{{ ChatDropdown }}}
</div>
`;

export default chatTemplate;
