const messageTemplate = `
<div class="message{{#if own}} own{{/if}}{{#if first}} first{{/if}}">
  <div class="message__content-wrapper">
    {{#if name}}
      <div class="message__name">{{name}}</div>
    {{/if}}
    <div class="message__content">
        {{#if image}}
          <div class="message__image">
            <img src="{{image}}" alt="Message image">
          </div>
        {{else}}
          {{message}}
        {{/if}}
        <span class="message__info clearfix">
          {{#if own}}
            <span class="message__status">
              <i class="icon {{#if send}}icon-message-send{{/if}}{{#if delivered}} icon-message-delivered{{/if}}{{#if read}} icon-message-read{{/if}}"></i>
            </span>
           {{/if}}
          <span class="message__date">{{date}}</span>
        </span>
      </div>
  </div>
</div>
`;

export default messageTemplate;
