// @ts-nocheck
import Image from "next/image";
import moment from "moment";

interface IPhotoItem {
  title: string;
  desctiption: string;
  direction: string;
  image: string;
  country: string;
}

export default function PhotoItem({
  title,
  desctiption,
  direction,
  image,
  country,
}: IPhotoItem) {
  const directionSign = (direction: string) => {
    switch (direction.toLocaleLowerCase()) {
      case "in":
        return `←`;
      case "out":
        return `→`;
    }
  };

  //Render image on reload only if it's new minute
  var newDate = moment(new Date()).format("DD.MM.YYYY.HH.mm");

  return (
    <div className="camera-container">
      <div className="flag-title">
        <span className="flag-title-span">
          <img className="flags" src={`/${country}.png`} />
          {directionSign(direction)}
        </span>
        <span className="title-span">
          <strong>{title}</strong> {desctiption}
        </span>
      </div>
      <Image
        className="imageContainer"
        alt={title}
        src={image + newDate}
        width={1200}
        height={600}
        placeholder="blur"
        loading="lazy"
      />
    </div>
  );
}
