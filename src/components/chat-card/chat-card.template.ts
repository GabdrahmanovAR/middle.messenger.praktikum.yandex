const chatCardTemplate = `
<div class="chat-card {{#if active}}chat-card_active{{/if}}">
  <div class="chat-card__avatar">
    {{#if avatar}}
      <div class="chat-card__img">
        <img src="{{avatar}}" alt="User avatar" />
      </div>
    {{else}}
      <div class="chat-card__img_default"></div>
    {{/if}}
  </div>
  <div class="chat-card__text">
    <div class="chat-card__name">
      {{name}}
    </div>
    <div class="chat-card__message">
      {{#if userName}}{{userName}}: {{/if}}{{message}}
    </div>
  </div>
  <div class="chat-card__info">
    <div class="chat-card__date">
      {{date}}
    </div>
    {{#if count}}
      <div class="chat-card__badge">
        {{count}}
      </div>
    {{/if}}
  </div>
</div>
`;

export default chatCardTemplate;
