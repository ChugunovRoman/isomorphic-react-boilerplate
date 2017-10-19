const React = require('react');
const { renderToString } = require('react-dom/server');
// const PropTypes = require('prop-types');
// const serialize = require('serialize-javascript');
// const Helmet = require('react-helmet'); // Изучить получше

const App = require('./App');

// module.exports = ({ assets, component, store, css }) => {
module.exports = ({ context }: { context: any }) => {
    // console.log('assets: ', assets);
    // console.log('component: ', component);
    // console.log('store: ', store);

    // let data = '';

    // if (store) {
    //     data = `
    //         window.__data=${serialize(store.getState())};
    //         window._env=${serialize(_env)}
    //     `;
    // }

    return (

        <html lang='ru-RU'>
            <head>

                <link rel='shortcut icon' href='/favicon.ico' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                {/* <link
                    href={assets.styles.client}
                    media='screen, projection'
                    rel='stylesheet'
                    type='text/css'
                    charSet='UTF-8'
                /> */}
                {/* <style type="text/css">${[...css].join('')}</style> */}

                {/* __PRODUCTION__ && Object.keys(assets.styles).map((style, key) => {
                    return (
                        <link
                            href={assets.styles[style]}
                            key={key}
                            media='screen, projection'
                            rel='stylesheet'
                            type='text/css'
                            charSet='UTF-8'
                        />
                    );
                }) */}
            </head>
            <body>
                <div id='app'
                    dangerouslySetInnerHTML={{ __html: App ? renderToString(App) : '' }}
                />

                <script src='/public/assets/client.js' charSet='UTF-8' />
            </body>

        </html>
    );
};

// html.PropTypes = {
//     assets: PropTypes.object.isRequired,
//     component: PropTypes.node.isRequired,
//     store: PropTypes.object,
//     css: PropTypes.array
// };
