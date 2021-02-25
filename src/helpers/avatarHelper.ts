const AVATAR_SIZE = 60

const getAvatar = (name: string): string =>
    `https://avatars.dicebear.com/4.5/api/bottts/${encodeURIComponent(
        name
    )}.svg?r=50&m=11&b=%23000000&w=${AVATAR_SIZE}&h=${AVATAR_SIZE}&primaryColorLevel=700&secondaryColorLevel=100&textureChance=100&mouthChance=0&sidesChance=0&topChange=0`

export default getAvatar
