const inputTextTemplate = `
<div class="input-container">
  {{{ InputField }}}
  {{#if icon}}
    <img src="{{icon}}" alt="Icon" class="input-icon" />
  {{/if}}
</div>
`;

export default inputTextTemplate;
