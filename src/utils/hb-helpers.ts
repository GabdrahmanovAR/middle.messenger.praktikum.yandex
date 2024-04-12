import Handlebars from 'handlebars';

Handlebars.registerHelper('lineBreak', (text: string) => {
  if (!text) return text;
  const breakedText = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  return new Handlebars.SafeString(breakedText);
});

Handlebars.registerHelper('block', (name, context) => context.data.root.blocks[name]);
