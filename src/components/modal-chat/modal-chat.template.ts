const modalChatTemplate = `
<div class="container center modal-container{{#if visible}} modal-container_visible{{/if}}">
  <div class="user-window">
    <div class="user-window__header">
      <span class="user-window__title">
        {{title}}
      </span>
    </div>
    <form action="" class="user-window__form">
      <div class="user-window__form-content">
        {{{ DropdownInput }}}
      </div>
      <div class="user-window__footer">
        {{{ ButtonComponent }}}
      </div>
    </form>
  </div>
</div>
`;

export default modalChatTemplate;
