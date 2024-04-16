const registrationPageTemplate = `
<div class="container center">
  <div class="card register-card">
    <div class="form-title">Регистрация</div>

    <form action="" class="form-container register-card__form">
      <div class="field-group">
        #fields
      </div>
      <div class="buttons-group">
        {{{ ButtonSubmit }}}
        {{{ ButtonLink }}}
      </div>
    </form>
  </div>
</div>
`;

export default registrationPageTemplate;
