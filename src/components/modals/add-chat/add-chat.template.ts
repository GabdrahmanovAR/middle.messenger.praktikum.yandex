const modalChatTemplate = `
<div class="container center modal-container{{#if visible}} modal-container_visible{{/if}}">
  <div class="add-chat-window">
    <div class="add-chat-window__header">
      <span class="add-chat-window__title">
        {{title}}
      </span>
    </div>
    <form action="" class="add-chat-window__form">
      <div class="add-chat-window__form-content">
        {{{ FieldInput }}}
      </div>
      <div class="add-chat-window__footer">
        {{{ ButtonComponent }}}
      </div>
    </form>
  </div>
</div>
`;

export default modalChatTemplate;
