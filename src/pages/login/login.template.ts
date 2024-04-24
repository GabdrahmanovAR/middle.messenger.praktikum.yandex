const loginTemplate = `
<div class="container center">
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
</div>
`;

export default loginTemplate;
