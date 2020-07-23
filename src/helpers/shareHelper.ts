export const canNativeShare = !!window.navigator.share

export const nativeShare = (url: string): void => {
    if (canNativeShare) {
        navigator.share({
            title: 'Trow.app',
            text: 'Come on and join my voting session here',
            url,
        })
    }
}
