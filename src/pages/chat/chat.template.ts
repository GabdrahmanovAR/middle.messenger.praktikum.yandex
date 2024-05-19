const chatTemplate = `
<div class="container chat-container">
  <div class="sidebar">
    <div class="sidebar__settings">
      <div class="sidebar__icon-button">{{{ AddChatButton }}}</div>
      <div>{{{ ProfileButton }}}</div>
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
  {{{ AddUserModal }}}
  {{{ RemoveUserModal }}}
  {{{ ConfirmModal }}}
  {{{ AddChatModal }}}
  {{{ ChatDropdown }}}
</div>
`;

export default chatTemplate;
