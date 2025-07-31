import { createFactory } from '@withease/factories';
import {
    type Effect,
    type EventCallable,
    type Store,
    attach,
    createEffect,
    createEvent,
    createStore,
    restore,
    sample,
} from 'effector';

declare global {
    interface Navigator {
        virtualKeyboard?: {
            boundingRect: DOMRect;
            overlaysContent: boolean;
            show(): void;
            hide(): void;
            addEventListener(type: 'geometrychange', listener: EventListener): void;
            removeEventListener(type: 'geometrychange', listener: EventListener): void;
        };
    }
}

interface VirtualKeyboard {
    $opened: Store<boolean>;
    show: EventCallable<void>;
    hide: EventCallable<void>;
    changeOverlaysContent: EventCallable<boolean>;
    $supported: Store<boolean>;
    setupEffectFx: Effect<void, void>;
    clearEffectFx: Effect<void, void>;
}

export const virtualKeyboardFactory = createFactory(
    ({ initialValue = false }: { initialValue: boolean }): VirtualKeyboard => {
        const $supported = createStore(
            (typeof window !== 'undefined' && 'visualViewport' in window) ||
                (typeof navigator !== 'undefined' && 'virtualKeyboard' in navigator),
        );

        const hideVirtualKeyboardFx = createEffect(() => {
            if (!navigator.virtualKeyboard) return;
            navigator.virtualKeyboard.hide();
        });
        const showVirtualKeyboardFx = createEffect(() => {
            if (!navigator.virtualKeyboard) return;
            navigator.virtualKeyboard.show();
        });
        const changeOverlaysContentFx = createEffect((overlaysContent: boolean) => {
            if (!navigator.virtualKeyboard) return;
            navigator.virtualKeyboard.overlaysContent = overlaysContent;
        });

        const setOpened = createEvent<boolean>();
        const $opened = restore(setOpened, initialValue);

        const hide = createEvent();
        sample({
            clock: hide,
            fn: () => false,
            target: [setOpened, hideVirtualKeyboardFx],
        });

        const show = createEvent();
        sample({
            clock: show,
            fn: () => true,
            target: [setOpened, showVirtualKeyboardFx],
        });

        const changeOverlaysContent = createEvent<boolean>();
        sample({
            clock: changeOverlaysContent,
            target: changeOverlaysContentFx,
        });

        const onResizeFx = createEffect((event: Event) => {
            if (navigator.virtualKeyboard) {
                const rect = (event.target as Navigator['virtualKeyboard'] | null)?.boundingRect;
                return !!(rect?.height && rect?.height > 0);
            }
            if (window.visualViewport) {
                return window.screen.height - 300 > window.visualViewport!.height;
            }
        });

        const setupEffectFx = attach({
            source: $supported,
            effect: (supported) => {
                if (!supported) return;
                navigator.virtualKeyboard?.addEventListener('geometrychange', onResizeFx);
                window.visualViewport?.addEventListener('resize', onResizeFx);
            },
        });

        const clearEffectFx = createEffect(() => {
            navigator.virtualKeyboard?.removeEventListener('geometrychange', onResizeFx);
            window.visualViewport?.removeEventListener('resize', onResizeFx);
        });

        sample({
            clock: onResizeFx.doneData,
            fn: (data) => !!data,
            target: setOpened,
        });

        return {
            $opened,
            setupEffectFx,
            clearEffectFx,
            show,
            changeOverlaysContent,
            hide,
            $supported,
        };
    },
);
