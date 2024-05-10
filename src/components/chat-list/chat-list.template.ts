const chatListTemplate = `
{{#if showList}}
  <ul class="chat-list">
    {{{ chatList }}}
  </ul>
{{else}}
  {{#if isLoading}}
    <div class="chat-list__info">Загружаем чаты ...</div>
  {{else}}
    <div class="chat-list__info">Нет чатов</div>
  {{/if}}
{{/if}}

`;

export default chatListTemplate;
