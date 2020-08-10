export const loadState = (): object | undefined => {
        try {
            const serializedState = localStorage.getItem('appState');
            if (serializedState) {
                return JSON.parse(serializedState);
            } else {
                return undefined;
            }
        } catch (error) {
            return undefined;
        }
    },
    saveState = (state: object) => {
        try {
            localStorage.setItem('appState', JSON.stringify(state));
        } catch (error) {}
    };
