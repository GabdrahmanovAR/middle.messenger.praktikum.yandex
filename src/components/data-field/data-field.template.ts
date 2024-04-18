const dataFieldTemplate = `
<div class="data-field{{#if last}} data-field_last{{/if}}">
  <span class="data-field__label">{{label}}</span>
  <div class="data-field__content">
    {{{ InputField }}}
  </div>
  {{{ Error }}}
</div>
`;

export default dataFieldTemplate;
