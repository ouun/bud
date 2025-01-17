export default async app => {
  app
    .entry({
      app: ['@scripts/app', '@styles/app'],
      editor: ['@scripts/editor', '@styles/editor'],
    })
    .copy('images')
    .watch(['resources/views/*.blade.php'])
    .serve(3000)
    .proxy('http://example.test')
    .wpjson.useTailwindColors(true)
    .useTailwindFontFamily()
    .useTailwindFontSize()
    .enable()
}
