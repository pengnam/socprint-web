import React, { ReactNode } from 'react';
import Head from 'next/head';

type Props = {
    children?: ReactNode;
    title?: string;
};

const Layout: React.FC<Props> = ({ children, title = 'This is the default title' }: Props) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header></header>
        {children}
        <footer></footer>

        <style jsx global>{`
            .container {
                min-height: 100vh;
                padding: 0 0.5rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            main {
                padding: 5rem 0;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            footer {
                width: 100%;
                height: 100px;
                border-top: 1px solid #eaeaea;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            footer img {
                margin-left: 0.5rem;
            }
            footer a {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            a {
                color: inherit;
                text-decoration: none;
            }
            .description a {
                color: #0070f3;
                text-decoration: none;
            }
            .description a:hover,
            .description a:focus,
            .description a:active {
                text-decoration: underline;
            }
            .title {
                margin: 0;
                line-height: 1.15;
                font-size: 4rem;
            }
            .title,
            .description {
                text-align: center;
            }
            .description {
                line-height: 1.5;
                font-size: 1.5rem;
            }
            .card {
                margin: 1rem;
                flex-basis: 45%;
                padding: 1.5rem;
                text-align: left;
                color: inherit;
                text-decoration: none;
                border: 1px solid #eaeaea;
                border-radius: 10px;
                transition: color 0.15s ease, border-color 0.15s ease;
            }
            .card h3 {
                margin: 0 0 1rem 0;
                font-size: 1.5rem;
            }
            .card p {
                margin: 0;
                font-size: 1.25rem;
                line-height: 1.5;
            }
            /*Error Message*/
            .card span {
                font-size: 1rem;
                color: red;
            }
            .card .help {
                font-size: 0.75rem;
                left: 100px;
                position: relative;
            }
            html,
            body {
                padding: 0;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
                    Droid Sans, Helvetica Neue, sans-serif;
            }
            * {
                box-sizing: border-box;
            }

            label {
                display: inline-block;
                width: 100px;
                margin-bottom: 20px;
            }

            textarea,
            input {
                padding: 10px;
                border-radius: 5px;
                border: 1px solid #ccc;
                font-size: 16px;
                margin-bottom: 20px;
            }
            /*https://codepen.io/palimadra/pen/OVvbaY*/
            .success,
            .error {
                border: 1px solid;
                margin: 10px 0px;
                padding: 15px 10px 15px 50px;
                background-repeat: no-repeat;
                background-position: 10px center;
                white-space: pre-wrap;
            }

            .success {
                color: #4f8a10;
                background-color: #dff2bf;
                background-image: url('https://i.imgur.com/Q9BGTuy.png');
            }

            .error {
                color: #d8000c;
                background-color: #ffbaba;
                background-image: url('https://i.imgur.com/GnyDvKN.png');
            }

            /* For status bar*/
            .loading,
            .online,
            .offline {
                position: fixed;
                top: 0;
                right: 0;
                height: 2.5rem;
                padding: 0 1rem;
                align-items: center;
                display: flex;
                justify-content: center;
            }
            .loading {
                color: #00529b;
                background: #bde5f8;
            }

            .offline {
                background: #c33;
                color: #fff;
            }
            .online {
                background: #4f8a10;
                color: #dff2bf;
            }

            .submitButton {
                align-items: flex-start;
                color: #fff;
                width: 100%;
                padding: 0.5rem;
                background: #0070f3;
                border-color: #0070f3;
            }
        `}</style>
    </div>
);

export default Layout;
