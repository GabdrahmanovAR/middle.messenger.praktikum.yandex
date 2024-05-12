const inputDropDownTemplate = `
<div class="input-dropdown {{#if error}}input-dropdown__error{{/if}}">
  {{{ InputField }}}
  <label for="{{name}}" class="input-dropdown__label">{{label}}</label>
  {{{ DropDown }}}
  {{{ Error }}}
</div>
`;

export default inputDropDownTemplate;
