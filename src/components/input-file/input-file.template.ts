const inputFileTemplate = `
<div class="file-input-container{{#if avatar}} file-input-container__avatar{{/if}}">
  {{#unless avatar}}
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

  {{#if avatar}}
    <img src="/assets/icons/default_avatar.svg" alt="Default avatar" class="file-input-image">
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

// <input type="file" id="file-upload" {{#if acceptType}}accept="{{acceptType}}" {{/if}}>
