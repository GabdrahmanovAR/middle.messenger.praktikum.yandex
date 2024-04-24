const modalProfileTemplate = `
<div class="container center modal-container{{#if visible}} modal-container_visible{{/if}}">
  <div class="profile-window">
    <div class="profile-window__header">
      <span class="profile-window__title{{#if loadError}}profile-window__title_error{{/if}}">
        {{#if loadError}}
          Ошибка, попробуйте еще раз
        {{else if success}}
          Файл загружен
        {{else}}
          {{title}}
        {{/if}}
      </span>
    </div>
    <form action="" class="profile-window__form">
      <div class="profile-window__form-content">
        {{{ InputComponent }}}
      </div>
      <div class="profile-window__footer">
        {{{ ButtonSubmit }}}
        <div class="profile-window__validation">
          {{#if error}}Нужно выбрать файл{{/if}}
        </div>
      </div>
    </form>
  </div>
</div>
`;

export default modalProfileTemplate;
