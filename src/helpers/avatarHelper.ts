const AVATAR_SIZE = 60

const getAvatar = (name: string): string =>
    `https://api.adorable.io/avatars/${AVATAR_SIZE}/${encodeURIComponent(
        name
    )}.png`

export default getAvatar
