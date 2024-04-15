const loginTemplate = `
<div class="container center">
  <div class="card login-card">
    <div class="form-title">Вход</div>

    <form id="login-form" action="" class="form-container login-card__form">
      <div class="field-group">
        {{{ Field 
          label="Логин" 
          ref="login" 
          type="input" 
          required=true 
          name="login" 
          validate=validate.login 
        }}}
        {{{ Field 
          label="Пароль" 
          ref="password" 
          type="password"
          required=true 
          name="password" 
          validate=validate.password
        }}}
      </div>
      <div class="buttons-group">
        {{{ Button ref="submit" label="Войти" isRectangle=true type="submit" onClick=onLogin }}}
        {{{ Button label="Нет аккаунта?" isLink=true onClick=onCreateAccount }}}
      </div>
    </form>
  </div>
</div>
`;

export default loginTemplate;
