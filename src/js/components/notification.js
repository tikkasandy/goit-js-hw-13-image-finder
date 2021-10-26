import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert } from '@pnotify/core';

export default function onAlert(message) {
    alert({
        text: `${message}`,
        delay: 2500,
    });
}