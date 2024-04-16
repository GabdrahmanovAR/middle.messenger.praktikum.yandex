const profilePageTemplate = `
<div class="profile-container container">
  <div class="profile-back">
    <div class="profile-back__button-container">
      {{{ Button ref="return" isRound=true icon="/assets/icons/arrow-left-white.svg" }}}
    </div>
  </div>
  <div class="profile-content container center">
    <form action="" class="profile-form">
      <div class="profile-form__avatar">
        {{{ InputFile ref="avatar" label="Поменять аватар" avatar=true}}
        <span class="profile-form__user-name">{{name}}</span>
      </div>

      <div class="profile-from__fields">
        {{#each formData}}
        <div class="profile-form__item{{#if @last}} profile-form__item_last{{/if}}">
          <span class="profile-form__label">{{this.label}}</span>
          {{{ DataField }}}
        </div>
        {{/each}}
      </div>

      <div class="profile-form__buttons">
        {{#if edit}}
        <div class="profile-form__item profile-form__item_single">
          <div class="profile-form__save">
            {{{ Button label="Сохранить" isRectangle=true }}}
          </div>
        </div>
        {{else}}
        <div class="profile-form__item">
          {{{ Button label="Изменить данные" isLink=true }}}
        </div>
        <div class="profile-form__item">
          {{{ Button label="Изменить пароль" isLink=true }}}
        </div>
        <div class="profile-form__item profile-form__item_last">
          {{{ Button type="red" label="Выйти" isLink=true theme="danger" }}}
        </div>
        {{/if}}
      </div>
    </form>
  </div>
</div>
`;

export default profilePageTemplate;
