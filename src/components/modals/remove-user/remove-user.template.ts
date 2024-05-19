// если импортировать шаблон из этого файла, то по какой-то не выясненной причине
// вставляется шаблон модального окна "добавить пользователя". до конца 3го спринта не хватает времени выяснить причину.
const removeUserTemplate = `
<div class="container center modal-container{{#if visible}} modal-container_visible{{/if}}">
  <div class="remove-user-window">
    <div class="remove-user-window__header">
      <span class="remove-user-window__title">
        Удаление пользователя
      </span>
    </div>
    <div action="" class="remove-user-window__form">
      <div id="remove-user" class="remove-user-window__content">
        #userList
      </div>
    </div>
  </div>
</div>
`;

export default removeUserTemplate;
