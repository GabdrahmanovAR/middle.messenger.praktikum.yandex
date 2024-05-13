const messageListTemplate = `
<div class="message-list">
  {{#if empty}}
    <div>Нет сообщений</div>
  {{else}}
    {{{ messageList }}}
  {{/if}}
</div>
`;

export default messageListTemplate;
