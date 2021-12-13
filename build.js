#!/usr/bin/env node
import { black, white, gray, magenta, blue, purple, green, yellow } from "glimmerized"
import { readFileSync, writeFileSync } from "fs"
import mustache from "mustache"
import deepmerge from "deepmerge"

const dark = {
  default:    { fg: white[0], bg: black[3]    },
  inverted:   { fg: black[3], bg: white[0]    },
  alternate:  { fg: white[3], bg: black[2]    },
  minor:      { fg: gray[2]                   },
  accent:     { fg: magenta[5]                },
  selection:  {               bg: purple[3]   },
  primary:    { fg: white[3], bg: magenta[3], bgHover: magenta[5]  },
  secondary:  { fg: white[3], bg: blue[3]     },
  diff: {
    added:    {               bg: blue[3]     },
    modified: {               bg: purple[3]   },
    deleted:  {               bg: magenta[3]  },
  },
  message: {
    error:    { fg: white[3], bg: magenta[3]  },
    warning:  { fg: white[3], bg: yellow[3]   },
    info:     { fg: white[3], bg: green[3]    },
    hint:     { fg: white[3], bg: blue[3]     },
  },
  highlight: {
    added:    { fg: blue[5]                   },
    modified: { fg: purple[5]                 },
    deleted:  { fg: magenta[5]                },
    conflict: { fg: yellow[5]                 },
    invalid:  { fg: magenta[5]                },
    error:    { fg: magenta[5]                },
    warning:  { fg: yellow[5]                 },
    info:     { fg: green[5]                  },
    debug:    { fg: yellow[5]                 },
  },
  icon: {
    error: magenta[3],
    warning: yellow[3],
    info: green[3],
    hint: blue[3],
  },
  syntax: [ magenta[5], blue[5], green[5], yellow[5], purple[5] ],
  ansi: { red: magenta[5], green: green[5], blue: blue[5], cyan: gray[5], magenta: purple[5], yellow: yellow[5], black: black[3], white: white[0], brightRed: magenta[3], brightGreen: green[3], brightBlue: blue[3], brightCyan: gray[3], brightMagenta: purple[3], brightYellow: yellow[3], brightBlack: black[0], brightWhite: white[3] },
}

const darker = deepmerge(dark, {
  default:    { bg: black[2] },
  alternate:  { bg: black[1] },
  ansi:       { black: black[2] },
})

const darkest = deepmerge(dark, {
  default:    { bg: black[1] },
  alternate:  { bg: black[0] },
  ansi:       { black: black[1] },
})

const light = {
  default:    { fg: black[3], bg: white[0]    },
  inverted:   { fg: white[0], bg: black[3]    },
  alternate:  { fg: black[0], bg: white[1]    },
  minor:      { fg: gray[1]                   },
  accent:     { fg: magenta[3]                },
  selection:  {               bg: purple[5]   },
  primary:    { fg: white[3], bg: magenta[3], bgHover: magenta[5]  },
  secondary:  { fg: white[3], bg: blue[3]     },
  diff: {
    added:    {               bg: blue[5]     },
    modified: {               bg: purple[5]   },
    deleted:  {               bg: magenta[5]  },
  },
  message: {
    error:    { fg: white[3], bg: magenta[3]  },
    warning:  { fg: white[3], bg: yellow[3]   },
    info:     { fg: white[3], bg: green[3]    },
    hint:     { fg: white[3], bg: blue[3]     },
  },
  highlight: {
    added:    { fg: blue[3]                   },
    modified: { fg: purple[3]                 },
    deleted:  { fg: magenta[3]                },
    conflict: { fg: yellow[3]                 },
    invalid:  { fg: magenta[3]                },
    error:    { fg: magenta[5]                },
    warning:  { fg: yellow[5]                 },
  },
  icon: {
    error: magenta[5],
    warning: yellow[5],
    info: green[5],
    hint: blue[5],
  },
  syntax: [ magenta[3], blue[3], green[3], yellow[3], purple[3] ],
  ansi: { red: magenta[3], green: green[3], blue: blue[3], cyan: gray[3], magenta: purple[3], yellow: yellow[3], black: black[3], white: white[0], brightRed: magenta[5], brightGreen: green[5], brightBlue: blue[5], brightCyan: gray[5], brightMagenta: purple[5], brightYellow: yellow[5], brightBlack: black[0], brightWhite: white[3] },
}

const lighter = deepmerge(light, {
  default:    { bg: white[1] },
  alternate:  { bg: white[2] },
  ansi:       { white: white[1] },
})

const lightest = deepmerge(light, {
  default:    { bg: white[2] },
  alternate:  { bg: white[3] },
  ansi:       { white: white[2] },
})


const templatePath = "./src/template.mustache.json"
function writeTheme(scheme) {
  const slug = scheme.name.replace(/\W+/g,"-").replace(/^-|-$/g,"").toLowerCase()
  const template = readFileSync(templatePath, {}).toString()
  const output = mustache.render(template, scheme)
  writeFileSync(`${slug}.json`, output)
}

writeTheme({
  name: "Glimmerized Dark",
  type: "dark",
  editor: dark,
  sidebar: darker,
  terminal: darkest,
  window: darkest,
  statusbar: {
    default: { bg: blue[3], fg: white[3] },
    noFolder: { bg: purple[3], fg: white[3] },
    debug: { bg: magenta[3], fg: white[3] },
  },
})

writeTheme({
  name: "Glimmerized Light",
  type: "light",
  editor: lightest,
  sidebar: lighter,
  window: light,
  terminal: dark,
  statusbar: {
    default: { bg: blue[3], fg: white[3] },
    noFolder: { bg: purple[3], fg: white[3] },
    debug: { bg: magenta[3], fg: white[3] },
  },
})
