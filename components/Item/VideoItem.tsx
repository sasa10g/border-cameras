// @ts-nocheck
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

    return (
        <div className="camera-container">
            <div className="flag-title">
                <span className="flag-title-span">
                    <img className="flags" src="/rs.png" />
                    {directionSign(direction)}
                </span>
                <span className="title-span"><strong>{title}</strong> {desctiption}</span>
            </div>

            <video
                className="kamera"
                id={element}
                controls="controls"
                autoPlay="autoplay" loop="loop" muted defaultmuted="true" playsInline onContextMenu={onContextMenu} preload="auto"
                src={blob}
            ></video>
        </div>
    );
}
