import { ref } from 'vue'

export function useCodeCopy() {
  const copiedKey = ref(null)

  const copyCode = async (text, key = 'default') => {
    try {
      await navigator.clipboard.writeText(text)
      copiedKey.value = key
      setTimeout(() => {
        copiedKey.value = null
      }, 2000)
      return true
    } catch (err) {
      console.error('Failed to copy:', err)
      return false
    }
  }

  const isCopied = (key) => copiedKey.value === key

  return {
    copyCode,
    isCopied,
    copiedKey
  }
}
