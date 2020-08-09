import React from 'react';
import ReactDOM from 'react-dom';
import {
    Stack,
    ThemeProvider,
    ColorModeProvider,
    CSSReset,
} from '@chakra-ui/core';
import App from './App';
import { Footer } from './features';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider>
            <ColorModeProvider>
                <CSSReset />
                <Stack minHeight="100vh" justify="space-between">
                    <App />
                    <Footer />
                </Stack>
            </ColorModeProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
