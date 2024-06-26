const profilePageTemplate = `
<div class="profile-container container">
  <div class="profile-back">
    <div class="profile-back__button-container">
      {{{ ButtonReturn }}}
    </div>
  </div>
  <div class="profile-content container center">
    <form action="" class="profile-form">
      <div class="profile-form__avatar">
        {{{ AvatarInput }}}
        <span class="profile-form__user-name">
          {{#if user.first_name}}
            {{{user.first_name}}}
          {{else}}
            -
          {{/if}}
        </span>
      </div>

      <div class="profile-from__fields">
        {{#if editPassword}}
          {{{ passwordFields }}}
        {{else}}
          {{{ dataFields }}}
        {{/if}}
      </div>

      <div class="profile-form__buttons">
        {{#if edit}}
          <div class="profile-form__item profile-form__item_single">
            <div class="profile-form__save">
              {{{ ButtonSave }}}
            </div>
          </div>
        {{else}}
          <div class="profile-form__item">
            {{{ ButtonEditData }}}
          </div>
          <div class="profile-form__item">
            {{{ ButtonEditPassword }}}
          </div>
          <div class="profile-form__item profile-form__item_last">
            {{{ ButtonExit }}}
          </div>
        {{/if}}
      </div>
    </form>
  </div>

  {{{ AddFileModal }}}
</div>
`;

export default profilePageTemplate;
