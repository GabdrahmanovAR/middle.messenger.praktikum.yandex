const messageListTemplate = `
<div class="message-list">
  {{#if empty}}
    <div class="message-list__empty">Нет сообщений</div>
  {{else}}
    {{{ messageList }}}
  {{/if}}
</div>
`;

export default messageListTemplate;
