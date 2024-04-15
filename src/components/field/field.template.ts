const fieldTemplate = `
<div class="field {{#if error}}field__error{{/if}}">
  {{{ Input 
    type=type
    ref="input"
    name=name
    classes="field__input"
    placeholder=label
    required=required
    onBlur=onValidate
  }}}
  <label for="{{name}}" class="field__label">{{label}}</label>
  {{{ ErrorLine ref="errorLine" classes="field__validation" }}}
</div>
`;

export default fieldTemplate;
