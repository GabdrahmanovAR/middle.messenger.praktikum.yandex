const modalConfirmTemplate = `
<div class="container center modal-container{{#if visible}} modal-container_visible{{/if}}">
  <div class="confirm-window">
    <div class="confirm-window__header">
      <span class="confirm-window__title">
        {{title}}
      </span>
    </div>
    <div class="confirm-window__content">
      {{text}}
    </div>
    <div class="confirm-window__footer">
      <div class="confirm-window__button">{{{ ConfirmButton }}}</div>
      <div class="confirm-window__button">{{{ CancelButton }}}</div>
    </div>
  </div>
</div>
`;

export default modalConfirmTemplate;
