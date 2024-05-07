const loginTemplate = `
<div class="container center column">
  <div class="card login-card">
    <div class="form-title">Вход</div>

    <form id="login-form" action="" class="form-container login-card__form">
      <div class="field-group">
        {{{ FieldLogin }}}
        {{{ FieldPassword }}}
      </div>
      <div class="buttons-group">
        {{{ ButtonSubmit }}}
        {{{ ButtonLink }}}
      </div>
    </form>
  </div>
  {{{ GlobalErrorComponent }}}
</div>
`;

export default loginTemplate;

// {{#if globalError}}
//   <div>Ошибка авторизации</div>
// {{/if}}
