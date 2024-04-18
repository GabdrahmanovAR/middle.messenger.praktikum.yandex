const inputTemplate = `
<input
  type="{{type}}"

  {{#if id}}
    id="{{id}}"
  {{/if}}

  {{#if name}}
    name="{{name}}"
  {{/if}}

  class="{{classes}}"

  {{#if placeholder}}
    placeholder="{{placeholder}}"
  {{/if}}

  {{#if value}}
    value="{{value}}"
  {{/if}}

  {{#if required}}
    required
  {{/if}}

  {{#unless editable}}
    readonly
  {{/unless}}
/>
`;

export default inputTemplate;
