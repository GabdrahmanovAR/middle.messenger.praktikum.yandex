const globalErrorTemplate = `
<div class="global-error {{#if globalError}}global-error_visible{{/if}}">
  {{#if globalError}}
    <div class="global-error__header">
      <div class="global-error__title">Ошибка</div>
      <div class="global-error__close">
        {{{ CloseButton }}}
      </div>
    </div>
    <div class="global-error__content">
      {{ globalError }}
    </div>
  {{/if}}
</div>
`;

export default globalErrorTemplate;
