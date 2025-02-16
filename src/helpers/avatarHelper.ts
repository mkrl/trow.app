const getAvatar = (name: string): string => `https://api.dicebear.com/9.x/notionists-neutral/svg?backgroundColor=a768fc,5cd697,74c3ff,ff9380,ffd584&seed=${encodeURIComponent(name)}`

export default getAvatar
