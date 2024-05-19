const inputFileTemplate = `
<div class="file-input-container{{#if isFile}} file-input-container__avatar{{/if}}">
  {{#unless isFile}}
    <label class="file-input-label">
      <div class="file-input-title{{#if fileName}} file-input-title__file{{/if}}">
        <span>
          {{#if fileName}}
            {{fileName}}
          {{else}}
            {{label}}
          {{/if}}
        </span>
      </div>
      {{{ InputFileComponent }}}
    </label>
  {{/unless}}

  {{#if isFile}}
    {{#if avatar}}
      <img src="{{avatar}}" alt="User avatar" class="file-input-image file-input-image__full">
    {{else}}
      <img src="/assets/icons/default_avatar.svg" alt="Default avatar" class="file-input-image">
    {{/if}}
    <label class=".file-input-label file-input-label__avatar">
      <div class=".file-input-title file-input-title__avatar">
        <span>{{label}}</span>
      </div>
      {{{ AvatarComponent }}}
    </label>
  {{/if}}
</div>
`;

export default inputFileTemplate;
