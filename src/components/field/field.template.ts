const fieldTemplate = `
<div class="field {{#if error}}field__error{{/if}}">
  {{{ InputField }}}
  <label for="{{name}}" class="field__label">{{label}}</label>
  {{{ Error }}}
</div>
`;

export default fieldTemplate;
