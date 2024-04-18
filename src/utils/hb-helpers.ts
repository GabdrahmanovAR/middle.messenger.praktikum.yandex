import Handlebars from 'handlebars';

Handlebars.registerHelper('lineBreak', (text: string) => {
  if (!text) return text;
  const breakedText = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  return new Handlebars.SafeString(breakedText);
});

Handlebars.registerHelper('block', (name, context) => context.data.root.blocks[name]);

Handlebars.registerHelper('ifCond', (v1, operator, v2, options) => {
  switch (operator) {
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});
