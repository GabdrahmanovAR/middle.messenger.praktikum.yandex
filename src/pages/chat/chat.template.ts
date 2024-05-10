const chatTemplate = `
<div class="container chat-container">
  <div class="sidebar">
    <div class="sidebar__settings">
      {{{ ChatPropertiesButton }}}
      {{{ ProfileButton }}}
    </div>
    <div class="sidebar__search">
      {{{ InputTextField }}}
    </div>
    <div class="sidebar__list">
      {{{ ChatListComponent }}}
    </div>
  </div>

  <div class="chat-section">
    {{{ ChatContentComponent }}}
  </div>
  {{{ ChatModal }}}
  {{{ ChatDropdown }}}
</div>
`;

export default chatTemplate;
