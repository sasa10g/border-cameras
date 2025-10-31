// @ts-nocheck
import { GlassCard } from "../ui/glass-card";

interface IVideoItem {
    title: string;
    desctiption: string,
    direction: string,
    element: string,
    blob: string
}

export default function VideoItem({ title, desctiption, direction, element, blob }: IVideoItem) {

    const flag = (title: string) => {
        switch (title.toLocaleLowerCase()) {
            case 'bosna':
                return '🇧🇦'
            case 'srbija':
                return '🇷🇸'
            case 'hrvatska':
                return '🇭🇷'
            default:
                return '#'
        }
    }

    const directionSign = (direction: string) => {
        switch (direction.toLocaleLowerCase()) {
            case 'in':
                return `←`
            case 'out':
                return `→`
        }
    }

    const onContextMenu = () => { return false }

    // Check if video URL is empty
    const hasVideo = blob && blob.trim() !== "";

    const handleClick = () => {
        if (hasVideo && blob) {
            window.open(blob, "_blank");
        }
    };

    return (
        <div className="camera-container">
            <GlassCard className="overflow-hidden">
                <div className="flag-title">
                    <span className="flag-title-span">
                        <img className="flags" src="/rs.png" alt="Serbia" />
                        <span className="direction-arrow">{directionSign(direction)}</span>
                    </span>
                    <span className="title-span"><strong>{title}</strong> {desctiption}</span>
                </div>
                <div
                    className="relative overflow-hidden"
                    style={{ cursor: hasVideo ? "pointer" : "default" }}
                    onClick={handleClick}
                >
                    {hasVideo ? (
                        <video
                            className="kamera"
                            id={element}
                            controls="controls"
                            autoPlay="autoplay" loop="loop" muted defaultmuted="true" playsInline onContextMenu={onContextMenu} preload="auto"
                            src={blob}
                        ></video>
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
