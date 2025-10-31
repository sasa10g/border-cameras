// @ts-nocheck
import moment from "moment";
import { GlassCard } from "../ui/glass-card";

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

  // Check if image URL is empty
  const hasImage = image && image.trim() !== "";

  //Render image on reload only if it's new minute
  var newDate = moment(new Date()).format("DD.MM.YYYY.HH.mm");
  const proxiedImageUrl = hasImage
    ? `/api/proxy-image?url=${encodeURIComponent(image + newDate)}`
    : "";

  const handleClick = () => {
    if (hasImage && image) {
      window.open(image + newDate, "_blank");
    }
  };

  return (
    <div className="camera-container">
      <GlassCard className="overflow-hidden">
        <div className="flag-title">
          <span className="flag-title-span">
            <img className="flags" src={`/${country}.png`} alt={country} />
            <span className="direction-arrow">{directionSign(direction)}</span>
          </span>
          <span className="title-span">
            <strong>{title}</strong> {desctiption}
          </span>
        </div>
        <div
          className="relative overflow-hidden"
          style={{ cursor: hasImage ? "pointer" : "default" }}
          onClick={handleClick}
        >
          {hasImage ? (
            <img
              className="imageContainer"
              alt={title}
              src={proxiedImageUrl}
              loading="lazy"
            />
          ) : (
            <div
              className="camera-not-available"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "200px",
                background: "rgba(0, 0, 0, 0.05)",
                color: "#999",
                fontSize: "14px",
              }}
            >
              Camera not available
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
