const buttonTemplate = `
{{#if isRectangle}}
  {{#if icon}}
    <button 
      class="button rectangle-button rectangle-button__with-icon{{#if theme}} button_{{theme}}{{else}} button_primary{{/if}}"
      type="{{type}}"
    >
      {{#if iconPositionLeft}}
        {{#if icon}}
          <img class="icon" src="{{icon}}" alt="Icon">
        {{/if}}
      {{/if}}
      {{label}}
      {{#unless iconPositionLeft}}
        {{#if icon}}
          <img class="icon" src="{{icon}}" alt="Icon">
        {{/if}}
      {{/unless}}
    </button>
  {{else}}
    <button type="{{type}}" class="button rectangle-button{{#if theme}} button_{{theme}}{{else}} button_primary{{/if}}">
      {{#if isLoading}}
        Загружаемся
      {{else}}
        {{label}}
      {{/if}}
    </button>
  {{/if}}
{{else if isLink}}
    <button type="{{type}}" class="button link-button{{#if theme}} link-button_{{theme}}{{else}} link-button_primary{{/if}}">
      {{#if iconPositionLeft}}
        {{#if icon}}
          <img class="icon" src="{{icon}}" alt="Icon">
        {{/if}}
      {{/if}}
      {{label}}
      {{#unless iconPositionLeft}}
        {{#if icon}}
          <img class="icon" src="{{icon}}" alt="Icon">
        {{/if}}
      {{/unless}}
    </button>
{{else if isRound}}
  <button type="{{type}}" class="button round-button{{#if theme}} button_{{theme}}{{else}} button_primary{{/if}}">
    <img class="icon" src="{{icon}}" alt="Icon">
  </button>
{{/if}}
`;

export default buttonTemplate;
