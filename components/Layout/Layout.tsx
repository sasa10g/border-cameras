import Head from "next/head";

interface ILayout {
    title: string;
    children: any;
}

export default function Layout({ title, children }: ILayout) {

    const onClick = () => {
        window.location.reload();
    }

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

    return (
        <div className="container">
            <Head>
                <title>{`${title} - Granica kamere`}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <main>
                <div className="main-title">
                    <a href="/"><img style={{ width: '50px' }} src="left-arrow.png" /></a>
                    <h1 className="title">{flag(title) + ` ${title}`}</h1>
                </div>

                <p className="description">
                    <img width="100px" src="/favicon.ico" />
                    <button className="reset-button" onClick={onClick}>
                        Reset
                    </button>
                </p>

                {children}

            </main>
            <footer>
                <a href="#" target="_blank" rel="noopener noreferrer">
                    Dev
                </a>
            </footer>
        </div>
    );
}
