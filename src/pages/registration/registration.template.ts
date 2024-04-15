const registrationPageTemplate = `
<div class="container center">
  <div class="card register-card">
    <div class="form-title">Регистрация</div>

    <form action="" class="form-container register-card__form">
      <div class="field-group">
        {{{ Field ref="email" label="Почта" type="input" name="email" required=true validate=validate.email }}}

        {{{ Field ref="login" label="Логин" type="input" name="login" required=true validate=validate.login }}}

        {{{ Field ref="firstName" label="Имя" type="input" name="first_name" required=true validate=validate.name }}}

        {{{ Field ref="secondName" label="Фамилия" type="input" name="second_name" required=true validate=validate.name }}}

        {{{ Field ref="phone" label="Телефон" type="input" name="phone" required=true validate=validate.phone }}}

        {{{ Field ref="password" label="Пароль" type="password" name="password" required=true validate=validate.password }}}

        {{{ Field ref="repeat" label="Пароль (еще раз)" type="password" required=true validate=validate.repeatPassword }}}
      </div>
      <div class="buttons-group">
        {{{ Button type="submit" isRectangle=true label="Зарегистрироваться" onClick=onSubmit }}}
        {{{ Button label="Войти" isLink=true onClick=onLogin }}}
      </div>
    </form>
  </div>
</div>
`;

export default registrationPageTemplate;
