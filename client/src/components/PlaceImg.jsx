import Image from "./Image.jsx";

export default function PlaceImg({ place, index = 0, className }) {

    const getFilename = function (str) {
        return str.substring(str.lastIndexOf('/') + 1);
    }

    if (!place.photos?.length) {
        return '';
    }

    className += ' object-cover';

    return (
        <Image className={className} src={getFilename(place.photos[index])} alt="" />
    );
}
