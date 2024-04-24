const errorTemplate = `
<div class="error-block">
  <div class="error-block__info">
    <span class="error-block__title">{{code}}</span>
    <span class="error-block__desc">{{info}}</span>
  </div>
  {{{ ButtonComponent }}}
</div>
`;

export default errorTemplate;
