export default function Image({ src, ...rest }) {

    const getFilename = function (str) {
        return str.substring(str.lastIndexOf('/') + 1);
    }

    src = src && src.includes('https://')
        ? src
        : 'http://localhost:5000/uploads/' + getFilename(src);
    return (
        <img {...rest} src={src} alt={'image'} />
    );
}