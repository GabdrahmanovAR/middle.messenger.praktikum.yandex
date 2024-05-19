const messageGroupTemplate = `
  <div class="message-list__date-group">
    <div class="sticky-date">
      <span class="sticky-date__text-date">{{ date }}</span>
    </div>

    {{{ messageGroup }}}
  </div>
`;

export default messageGroupTemplate;
