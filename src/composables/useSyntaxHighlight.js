export function useSyntaxHighlight() {
  const highlightCode = (code) => {
    const tokens = []
    const placeholder = (content, cls) => {
      const idx = tokens.length
      tokens.push({ content, cls })
      return `__TOKEN_${idx}__`
    }

    // Escape HTML entities
    code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    // Comments
    code = code.replace(/(&lt;!--.*?--&gt;)/g, (m) => placeholder(m, 'comment'))

    // Strings (double and single quotes)
    code = code.replace(/"([^"\\]*(\\.[^"\\]*)*)"/g, (m) => placeholder(m, 'string'))
    code = code.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, (m) => placeholder(m, 'string'))

    // Hex colors
    code = code.replace(/#[0-9a-fA-F]{3,8}\b/g, (m) => placeholder(m, 'color'))

    // CSS keywords
    code = code.replace(/@(media|import|keyframes)\b/g, (m) => placeholder(m, 'keyword'))
    code = code.replace(/::part\(/g, (m) => placeholder(m, 'keyword'))

    // HTML tags
    code = code.replace(/(&lt;)(\/?)([\w][\w-]*)/g, (m, lt, slash, tag) =>
      placeholder(lt + slash, 'bracket') + placeholder(tag, 'tag'))
    code = code.replace(/(\/?&gt;)/g, (m) => placeholder(m, 'bracket'))

    // HTML attributes
    code = code.replace(/\s([\w][\w-]*)(=)/g, (m, attr, eq) =>
      ' ' + placeholder(attr, 'attr') + placeholder(eq, 'punct'))

    // CSS properties
    code = code.replace(/^(\s*)(--[\w-]+|[\w-]+)(:)/gm, (m, ws, prop, colon) =>
      ws + placeholder(prop, 'property') + placeholder(colon, 'punct'))

    // Brackets and punctuation
    code = code.replace(/(\{|\})/g, (m) => placeholder(m, 'bracket'))
    code = code.replace(/(;)/g, (m) => placeholder(m, 'punct'))
    code = code.replace(/(\(|\))/g, (m) => placeholder(m, 'punct'))

    // Replace placeholders with highlighted spans
    code = code.replace(/__TOKEN_(\d+)__/g, (m, idx) => {
      const t = tokens[parseInt(idx)]
      return `<span class="hl-${t.cls}">${t.content}</span>`
    })

    return code
  }

  return { highlightCode }
}
